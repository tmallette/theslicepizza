import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className='px-5percent w-full flex justify-between items-center py-10 md:px-20 md:py-8 bg-neutral text-neutral-content'>
        <div className='w-full flex justify-center md:justify-start'>
            <p>© 2024. All rights reserved.</p>
        </div> 
        <div className='hidden md:flex'>
          <Link href={ '/about' } className='btn btn-ghost mx-2 rounded-sm'>About</Link>
        </div>
    </footer>
  )
}