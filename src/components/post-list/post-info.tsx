import { ComponentType, ReactNode, SVGProps } from 'react'

interface PostInfoProps {
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  children: ReactNode
}

const PostInfo = ({ Icon, children }: PostInfoProps) => {
  return (
    <div className="flex items-center gap-1 text-xs">
      <Icon />
      {children}
    </div>
  )
}

export default PostInfo
