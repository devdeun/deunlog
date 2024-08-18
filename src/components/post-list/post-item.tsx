import Link from 'next/link'
import { HiOutlineClock, HiOutlineCalendar } from 'react-icons/hi2'

import Tags from '@/components/common/tags'
import PostInfo from '@/components/post-list/post-info'
import { Post } from '@/types/post'

interface PostItemProps {
  post: Post
}

const PostItem = ({ post }: PostItemProps) => {
  const { url, title, description, tags, date, dateString, readingMinutes } = post

  return (
    <li key={url}>
      <Link href={url}>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </Link>
      <Tags tags={tags} />
      <div className="flex gap-4">
        <PostInfo Icon={HiOutlineCalendar}>
          <time dateTime={date.toString()}>{dateString}</time>
        </PostInfo>
        <PostInfo Icon={HiOutlineClock}>{readingMinutes}분</PostInfo>
      </div>
    </li>
  )
}

export default PostItem
