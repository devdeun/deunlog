import { readFile, unlink, writeFile } from 'node:fs/promises'
import fs from 'node:fs/promises'
import path from 'node:path'

import glob from 'fast-glob'
import sharp from 'sharp'

export const SHARP_OPTIONS: {
  png: sharp.PngOptions
  jpeg: sharp.JpegOptions
  webp: sharp.WebpOptions
  avif: sharp.AvifOptions
  gif: sharp.GifOptions
} = {
  png: {},
  jpeg: {},
  webp: {},
  avif: {
    quality: 65,
  },
  gif: {},
}
export type SharpOptionType = keyof typeof SHARP_OPTIONS

export const SHARP_OPTIONS_TYPE_MAPPER = {
  png: 'png',
  jpg: 'jpeg',
  jpeg: 'jpeg',
  webp: 'webp',
  avif: 'avif',
  gif: 'webp',
} as const satisfies { [key: string]: SharpOptionType }
export type SharpFileType = keyof typeof SHARP_OPTIONS_TYPE_MAPPER

const CONFIG = {
  imageGlobPattern: 'public/images/**/*.{png,jpg,jpeg,webp,gif}',
  mdxGlobPattern: 'src/content/post/**/*.mdx',
  ignoreList: ['og.png'],
}

export type ProcessedResult = {
  name: string
  path: string
  beforeSize: number
  afterSize: number
  percentChange: number
  convertedToAvif?: boolean
  avifPath?: string
}

const updateMdxReferences = async (oldName: string, newName: string) => {
  const mdxFiles = await glob(CONFIG.mdxGlobPattern)
  let updatedFiles = 0

  for (const mdxPath of mdxFiles) {
    try {
      const content = await readFile(mdxPath, 'utf-8')
      const updatedContent = content.replaceAll(oldName, newName)

      if (content !== updatedContent) {
        await writeFile(mdxPath, updatedContent, 'utf-8')
        console.log(`::✧:: Updated references in ${mdxPath}`)
        updatedFiles++
      }
    } catch (error) {
      console.log('::error:: Error updating MDX file:', mdxPath, error)
    }
  }

  return updatedFiles
}

export const sharpImages = async () => {
  console.log('::✧:: start sharp images')

  const sharpedImageList: ProcessedResult[] = []
  const unSharpedImageList: ProcessedResult[] = []
  let mdxUpdates = 0

  const files = await glob(CONFIG.imageGlobPattern)

  for (const filePath of files) {
    try {
      const filename = path.basename(filePath)

      if (CONFIG.ignoreList.includes(filename)) {
        console.log(`::✧:: Skipping ignored file ${filename}`)
        continue
      }

      console.log('::✧:: Processing', filePath)
      const fileType = path.extname(filePath).slice(1) as SharpFileType
      const sharpOptionType = SHARP_OPTIONS_TYPE_MAPPER[fileType]
      const sharpOption = SHARP_OPTIONS[sharpOptionType]

      const metadata = await sharp(filePath).metadata()
      const isAnimatedWebp = fileType === 'webp' && metadata.pages && metadata.pages > 1

      if (isAnimatedWebp) {
        console.log(`::✧:: Skipping animated WebP file ${filename}`)
        continue
      }

      const sharpedFilePath = filePath.replace(`.${fileType}`, `.sharp.${sharpOptionType}`)

      await sharp(filePath, fileType === 'gif' ? { animated: true } : {})
        [sharpOptionType](sharpOption)
        .toFile(sharpedFilePath)

      const beforeStats = await fs.stat(filePath)
      const afterStats = await fs.stat(sharpedFilePath)

      const processedResult: ProcessedResult = {
        name: filename,
        path: filePath,
        beforeSize: beforeStats.size,
        afterSize: afterStats.size,
        percentChange: +((1 - afterStats.size / beforeStats.size) * 100).toFixed(2),
      }

      if (processedResult.percentChange > 0) {
        if (fileType !== 'gif') {
          await fs.writeFile(filePath, await fs.readFile(sharpedFilePath))
          const avifPath = filePath.replace(`.${fileType}`, '.avif')
          await sharp(filePath).avif(SHARP_OPTIONS.avif).toFile(avifPath)
          const avifStats = await fs.stat(avifPath)

          if (avifStats.size < afterStats.size) {
            processedResult.convertedToAvif = true
            processedResult.avifPath = avifPath

            const avifFilename = path.basename(avifPath)
            mdxUpdates += await updateMdxReferences(filename, avifFilename)

            await unlink(filePath)
          } else {
            await unlink(avifPath)
          }
        }

        if (fileType === 'gif') {
          const webpPath = filePath.replace('.gif', '.webp')
          await fs.rename(sharpedFilePath, webpPath)
          const webpFilename = path.basename(webpPath)
          mdxUpdates += await updateMdxReferences(filename, webpFilename)
          await unlink(filePath)
        }

        sharpedImageList.push(processedResult)
      } else {
        unSharpedImageList.push(processedResult)
      }

      if (fileType !== 'gif') {
        await unlink(sharpedFilePath)
      }
    } catch (error) {
      console.log('::error::', error)
    }
  }

  const sharpBeforeSize = sharpedImageList.reduce((acc, image) => acc + image.beforeSize, 0)
  const sharpAfterSize = sharpedImageList.reduce((acc, image) => acc + image.afterSize, 0)
  const metrics = {
    totalFiles: sharpedImageList.length + unSharpedImageList.length,
    sharpFiles: sharpedImageList.length,
    sharpBeforeSize,
    sharpAfterSize,
    savedBytes: sharpBeforeSize - sharpAfterSize,
    savedPercent:
      sharpBeforeSize > 0 ? +((1 - sharpAfterSize / sharpBeforeSize) * 100).toFixed(2) : 0,
    mdxUpdates,
    avifConverted: sharpedImageList.filter((img) => img.convertedToAvif).length,
  }

  console.log('✧ sharp metrics')
  console.log(metrics)

  return {
    sharpedImageList,
    unSharpedImageList,
    metrics,
  }
}
