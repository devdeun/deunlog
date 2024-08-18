interface PostDetailPageProps {
  params: { slugs: string[] }
}

const PostDetailPage = ({ params: { slugs } }: PostDetailPageProps) => {
  return <div>{slugs[1]}</div>
}

export default PostDetailPage
