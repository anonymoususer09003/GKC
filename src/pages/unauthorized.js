import React, {useState, useEffect} from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const router = useRouter();
const [isLogoin, setIsLogin] = useState(null)
  useEffect(()=>{
    const value = JSON.parse(window.localStorage.getItem("gkcAuth"));
    setIsLogin(value)
    // Check if the user's role is allowed for this route
            const userRole = value?.role; // Fetc
  },[])

  const onContinue = () => {
    if(isLogoin?.role === "Student"){
      router.push("/")
    }
    if(isLogoin?.role === "Parent"){
      router.push("/parent")
    }
    if(isLogoin?.role === "Instructor"){
      router.push("/instructor")
    }
  };
  return (
    <>
      <Head>
        <title>Unauthorized</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section class="bg-white dark:bg-gray-900 ">
       <div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div>
            <p class="text-sm font-medium text-blue-500 dark:text-blue-400">404 error</p>
            <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">We can�t find that page</h1>
            <p class="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesn't exist or has been moved.</p>

            <div class="flex items-center mt-6 gap-x-3">
                <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700" onClick={() => router.back()}>
                    <span>Go back</span>
                </button>
                {
                  isLogoin ?
                <button class="bg-primary w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600" onClick={()=> onContinue()}>
                    Take me home
                </button>
                : 
                <button class="bg-primary w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600" onClick={()=> router.push('/auth/sigin')}>
                    Login
                </button>
                }
            </div>
        </div>
    </div>
</section>
    </>
  );
}
