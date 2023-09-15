import ParentCalendar from "@/components/parent/calendar/parent-calendar";

//important imports for protections starts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
//important imports for protections ends


const ParentCalendarPage = () => {
      //protection starts
      const nav = useRouter()
      // checking if user logged in starts
        if(typeof window !== 'undefined'){ // here we check if global object successfully loaded
          console.log('lol')
          useEffect(()=>{
  
            if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) { //here we check if user signed in
              nav.push('/') 
            } else{
              if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Parent') { //here we check if user has role Parent
                nav.push('/')
              }
            }
  
          },[])
        }
      // checking if user logged in ends
  
      //protection ends
  return (
    <div>
      <ParentCalendar/>
    </div>
  )
}

export default ParentCalendarPage;