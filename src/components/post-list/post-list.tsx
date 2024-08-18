import PostItem from '@/components/post-list/post-item'
import { getPostList } from '@/libs/post'

const PostList = () => {
  const postList = getPostList()
  const sortedPostList = postList.sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <ul className="flex flex-col gap-5">
      {sortedPostList.map((post) => (
        <PostItem key={post.url} post={post} />
      ))}
    </ul>
  )
}
export default PostList
