import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

interface PostContentsProps {
  content: string
}

const PostContents = ({ content }: PostContentsProps) => {
  return (
    <div className="prose prose-neutral dark:prose-dark">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkA11yEmoji, remarkBreaks],
            rehypePlugins: [
              [
                rehypeAutolinkHeadings,
                {
                  properties: {
                    className: ['anchor'],
                  },
                },
              ],
              [
                rehypePrettyCode,
                {
                  theme: 'github-dark',
                  defaultLang: {
                    block: 'plaintext',
                    inline: 'bash',
                  },
                },
              ],
              rehypeSlug,
            ],
          },
        }}
      />
    </div>
  )
}

export default PostContents
