import NavItem from '@/components/layout/header/nav-item'

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-8">
        <NavItem href="/blog">Blog</NavItem>
        <NavItem href="/tags">Tags</NavItem>
      </ul>
    </nav>
  )
}

export default Navbar
