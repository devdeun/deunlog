import { input, select } from '@inquirer/prompts'
import fs from 'fs/promises'
import path from 'path'

const createPost = async () => {
  try {
    const type = await select({
      message: '📁 포스트 타입을 선택하세요:',
      choices: [
        { value: 'blog', name: 'blog' },
        { value: 'notes', name: 'note' },
      ],
    })

    const filename = await input({
      message: '📄 파일명을 입력하세요:',
      validate: (value) => (value ? true : '파일명은 필수입니다'),
    })

    const title = await input({
      message: '✏️ 제목을 입력하세요:',
      validate: (value) => (value ? true : '제목은 필수입니다'),
    })

    const description = await input({ message: '📝 설명을 입력하세요 (선택사항):' })
    const tags = await input({ message: '🏷️ 태그를 입력하세요 (쉼표로 구분, 선택사항):' })
    const category = await input({ message: '📑 카테고리를 입력하세요 (선택사항):' })

    const parsedTags = tags ? tags.split(',').map((tag) => tag.trim()) : []
    const date = new Date().toISOString().split('T')[0]
    const dir = path.join('src/content/post', type)

    const content = `---
title: ${title}
${description && `description: ${description}\n`}date: ${date}
updatedDate: ${date}
tags: [${parsedTags.length ? `${parsedTags.join(', ')}` : ''}]
${category && `category: ${category}\n`}image: ''
---

${title}
`

    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, `${filename}.mdx`), content)
    console.log(`✅ 파일이 생성되었습니다: ${path.join(dir, `${filename}.mdx`)}`)
  } catch (error) {
    console.error('❌ 오류가 발생했습니다:', error)
  }
}

createPost()
