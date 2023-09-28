import InstructorCalendar from "@/components/instructor/calendar/instructor-calendar"
import { withRole } from "@/utils/withAuthorization";


const InstructorCalendarPage = () => {

   return (
    <div>
      <InstructorCalendar/>
    </div>
   )
}
export default withRole(InstructorCalendarPage, ['Instructor']);