export const generateDescription = (content: string) => {
  const parsedContent = content
    .replace(/(?<=\])\((.*?)\)/g, '')
    .replace(/(?<!\S)((http)(s?):\/\/|www\.).+?(?=\s)/g, '')
    .replace(/[#*|[\]]|(-{3,})|(`{3})(\S*)(?=\s)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 157)

  return `${parsedContent}...`
}

// Table of content
export type TOCSectionModel = TOCSubSectionModel & {
  subSections: TOCSubSectionModel[]
}

export type TOCSubSectionModel = {
  slug: string
  text: string
}

export const parseToc = (source: string) => {
  return source
    .split('\n')
    .filter((line) => line.match(/(^#{1,3})\s/))
    .reduce<TOCSectionModel[]>((acc, rawHeading) => {
      const newAcc = [...acc]
      const removeMdx = rawHeading
        .replace(/^##*\s/, '')
        .replace(/[*,~]{2,}/g, '')
        .replace(/(?<=\])\((.*?)\)/g, '')
        .replace(/(?<!\S)((http)(s?):\/\/|www\.).+?(?=\s)/g, '')

      const section = {
        slug: removeMdx
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣 -]/g, '')
          .replace(/\s/g, '-'),
        text: removeMdx,
      }

      const isSubTitle = rawHeading.split('#').length - 1 === 3 // h3

      if (acc.length && isSubTitle) {
        newAcc.at(-1)?.subSections.push(section)
      } else {
        newAcc.push({ ...section, subSections: [] })
      }

      return newAcc
    }, [])
}
