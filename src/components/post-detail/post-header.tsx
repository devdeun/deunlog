import { HiOutlineCalendar, HiOutlineClock } from 'react-icons/hi2'

import PostInfo from '@/components/post-list/post-info'
import { Post } from '@/types/post'

interface PostHeaderProps {
  post: Post
}

const PostHeader = ({ post }: PostHeaderProps) => {
  const { title, date, dateString, readingMinutes } = post

  return (
    <div>
      <h1>{title}</h1>
      <div className="flex gap-4">
        <PostInfo Icon={HiOutlineCalendar}>
          <time dateTime={date.toString()}>{dateString}</time>
        </PostInfo>
        <PostInfo Icon={HiOutlineClock}>{readingMinutes}분</PostInfo>
      </div>
    </div>
  )
}

export default PostHeader
