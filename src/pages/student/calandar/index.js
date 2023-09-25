import StudentCalandar from "../../../components/student/calendar/student-calendar";

//important imports for protections starts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
//important imports for protections ends

const CalendarPage = () => {

  return (
    <div>
      <StudentCalandar/>
    </div>
  )
};

export default CalendarPage;