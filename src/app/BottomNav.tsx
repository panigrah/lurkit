'use client'
import { BookmarkIcon, HomeIcon, ListBulletIcon, MoonIcon, SunIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function BottomNav() {
  const { theme, setTheme } = useTheme()
  const { data: session, status } = useSession();
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className={"grid h-full max-w-lg mx-auto " + (status === 'authenticated'? 'grid-cols-5': 'grid-cols-3')}>
        <Link 
          href='/home' 
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <HomeIcon className='w-6 h6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Home</span>
        </Link>
        { status === 'authenticated' ?
          <>
          <button
            onClick={() => router.push('/s')}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <ListBulletIcon 
              className='w-6 h6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' 
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Communities
            </span>
          </button>
          <button
            onClick={() => router.push('/bookmarks')}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <BookmarkIcon 
              className='w-6 h6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' 
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Bookmarks
            </span>
          </button>
          </>
          :
          null
        }
        <button 
          type="button" 
          onClick={() => setTheme(theme === 'dark'? 'light' : 'dark')}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          { theme === 'dark'? 
            <SunIcon className='w-6 h6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
            :
            <MoonIcon className='w-6 h6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
          }
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            { theme === 'dark'? 'Light' : 'Dark' }
          </span>
        </button>
        <Link
          href={status === 'authenticated'? '/api/auth/signout' : '/api/auth/signin'}
          type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <UserCircleIcon className='w-6 h6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            {status === 'authenticated'? 'Logout': 'Login'}
          </span>
        </Link>
      </div>
    </div>
  );
}
