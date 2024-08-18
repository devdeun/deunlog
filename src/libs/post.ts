import fs from 'fs'
import path from 'path'

import dayjs from 'dayjs'
import { sync } from 'glob'
import matter from 'gray-matter'
import readingTime from 'reading-time'

import { Post, PostMetadata } from '@/types/post'

const BASE_PATH = 'src/posts'
const POST_PATH = path.join(process.cwd(), BASE_PATH)

const parsePost = (postPath: string): Post => {
  const postHeader = parsePostHeader(postPath)
  const postDetails = parsePostDetails(postPath)

  return { ...postHeader, ...postDetails }
}

export const parsePostHeader = (postPath: string) => {
  const filePath = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, '')
    .replace('.mdx', '')

  const url = `/blog/${filePath}`

  return { url }
}

export const parsePostDetails = (postPath: string) => {
  const file = fs.readFileSync(postPath, 'utf-8')
  const { data, content } = matter(file)
  const metadata = data as PostMetadata
  const dateString = dayjs(metadata.date).format('YY.MM.DD')
  const readingMinutes = Math.ceil(readingTime(content).minutes)

  return { ...metadata, dateString, readingMinutes, content }
}

export const getPostPaths = () => {
  const paths = sync(`${POST_PATH}/**/*.mdx`)
  return paths
}

export const getPostList = () => {
  const paths = getPostPaths()
  const posts = paths.map((path) => parsePost(path))
  return posts
}
