'use client';
import { Spinner } from "@/components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError('')
    if(!username) {
      setError('Username must be a valid email address')    
    } else if(!password) {
      setError('Password cannot be empty')
    } else {
      setBusy(true)
    const result = await signIn("signup", { username, password, redirect: false, callbackUrl: '/' });
    if(result) {
      const { error, status, ok, url } = result
      if( !error && ok ) {
        setBusy(false)
        return router.replace("/")
      } else if(error) {
        setError( error.toString() )
      } else {
        setError( 'Unable to login. Please check your email and password' )
      }
    }}
    setBusy(false)
  };

  return(
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="lurker"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Signup to Lurk
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {loginError && 
          <div className="bg-rose-500 text-sm text-white p-3 mb-4 rounded-md">
            {loginError}
          </div>
        }
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="prose my-4 text-sm text-rose-500 border rounded-md p-4">
              <p>Please note - this is not your reddit account. An account here will let you choose the subreddits you want to lurk in and bookmark posts.</p>
              <p>The account is only used to store a list of subreddits - should you choose to add them, or a list of bookmarks should you choose to add them. No other information is tracked.</p>
            </div>            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="hidden font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={busy}
                className="items-center flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-700"
              >
                Register
                <div className="w-5 h-5 ml-2">
                  {busy? <Spinner /> : null}
                </div>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Signin
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
