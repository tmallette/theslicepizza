import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from './components/Nav';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The slice',
  description: 'It\'s za time.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' data-theme='dim'>
      <head>
        <link rel='shortcut icon' href='/images/favicon.ico' />
      </head>
      <body className={inter.className}>
        <Nav />
        <div className='page-container'>
          <main className='mx-5percent w-90percent lg:mx-auto xl:w-postcontent'>
            {children} 
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
