'use client'

import { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItemProps {
  href: string
  children: ReactNode
}

const NavItem = ({ href, children }: NavItemProps) => {
  const pathname = usePathname()
  const isActive = pathname.startsWith(href)

  return (
    <li className={`${isActive ? 'font-semibold' : 'font-normal'}`}>
      <Link href={href}>{children}</Link>
    </li>
  )
}

export default NavItem
