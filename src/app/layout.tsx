import './globals.css';
import { videoIcon } from '@/icons';
export const metadata = {
  title: 'MySave',
  description: 'Save YouTube videos and view it.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-full">
          <nav className="navbar bg-neutral text-neutral-content">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <h1 className='text-xl flex items-center gap-5'><span>My Save Videos</span></h1>
              </div>
            </div>
          </nav>
          <div>
            <div>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
