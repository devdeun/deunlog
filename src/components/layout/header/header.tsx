import Image from 'next/image'
import Link from 'next/link'

import Navbar from '@/components/layout/header/navbar'

const Header = () => {
  return (
    <header className="flex w-full max-w-3xl mx-auto px-4 py-4 items-center">
      <Link href="/" className="relative mr-12">
        <Image src="/assets/tape.png" width={130} height={39} alt="" priority />
        <b className="absolute top-1.5 left-8 font-medium">deunlog</b>
      </Link>
      <Navbar />
    </header>
  )
}

export default Header
