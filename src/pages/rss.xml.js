import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE } from '../consts'
import { resolveSlug } from '@/lib/mdx'

export async function GET(context) {
  const posts = await getCollection('blog')
  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/post/${resolveSlug(post.slug)}/`,
    })),
  })
}
