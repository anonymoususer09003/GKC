import ContactUs from '@/components/contactUs';
import { withRole } from '../../../utils/withAuthorization';

function ParentContactUs() {
  return <ContactUs />;
}

export default withRole(ParentContactUs, ['Parent']);
