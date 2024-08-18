export interface PostMetadata {
  title: string
  description: string
  date: Date
  tags: string[]
}

export interface Post extends PostMetadata {
  url: string
  content: string
  dateString: string
  readingMinutes: number
}
