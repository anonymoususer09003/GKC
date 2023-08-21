import ContactUs from '@/components/contactUs';
import { withRole } from '../../../utils/withAuthorization';

function InstructorContactUs() {
  return <ContactUs />;
}

export default withRole(InstructorContactUs, ['Instructor']);
