import InstructorCalendar from "@/components/instructor/calendar/instructor-calendar"
//important imports for protections starts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
//important imports for protections ends

const InstructorCalendarPage = () => {
    //protection starts
    const nav = useRouter()
    // checking if user logged in starts
      if(typeof window !== 'undefined'){ // here we check if global object successfully loaded
        console.log('lol')
        useEffect(()=>{

          if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) { //here we check if user signed in
            nav.push('/') 
          } else{
            if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Instructor') { //here we check if user has role Instructor
              nav.push('/')
            }
          }

        },[])
      }
    // checking if user logged in ends

    //protection ends
   return (
    <div>
      <InstructorCalendar/>
    </div>
   )
}

export default InstructorCalendarPage;