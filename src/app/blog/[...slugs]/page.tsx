import PostContents from '@/components/post-detail/post-contents'
import PostHeader from '@/components/post-detail/post-header'
import { getPostDetails } from '@/libs/post'

interface PostDetailPageProps {
  params: { slugs: string[] }
}

const PostDetailPage = ({ params: { slugs } }: PostDetailPageProps) => {
  const post = getPostDetails(slugs)

  return (
    <>
      <PostHeader post={post} />
      <PostContents content={post.content} />
    </>
  )
}

export default PostDetailPage
