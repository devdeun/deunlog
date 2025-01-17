import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE } from '../consts'
import { resolveSlug } from '@/lib/mdx'

export async function GET(context) {
  const posts = await getCollection('post')
  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/post/${resolveSlug(post.slug)}/`,
      pubDate: new Date(post.data.date),
      description: post.data.description || SITE.DESCRIPTION,
    })),
    customData: `<language>ko-KR</language>`,
  })
}
