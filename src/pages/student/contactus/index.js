import ContactUs from '@/components/contactUs';
import { ParentNavbar } from '@/components';
import Navbar from '@/components/navbar/navbar';
//important imports for protections starts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
//important imports for protections ends

export default function StudentContactUs() {
  //protection starts
  const nav = useRouter()
  // checking if user logged in starts
  if(typeof window !== 'undefined'){ // here we check if global object successfully loaded
    console.log('lol')
    useEffect(()=>{

      if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) { //here we check if user signed in
        nav.push('/') 
      } else{
        if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Student') { //here we check if user has role Student
          nav.push('/')
        }
      }

    },[])
  }
  // checking if user logged in ends

  //protection ends
  return (
    <>
    <Navbar />
    <ContactUs />
    </>
  );
}
