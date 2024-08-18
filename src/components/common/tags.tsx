interface TagsProps {
  tags: string[]
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <ul className="flex gap-2">
      {tags.map((tag) => (
        <li key={tag} className="bg-slate-100 py-1 px-2 rounded-md text-xs">
          {tag}
        </li>
      ))}
    </ul>
  )
}

export default Tags
