import ContactUs from '@/components/contactUs';

function InstructorContactUs() {
  return <ContactUs />;
}

export default withRole(InstructorContactUs, ['Instructor']);
