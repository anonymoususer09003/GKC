import ContactUs from '@/components/contactUs';
import { withRole } from '../../../utils/withAuthorization';
import { ParentNavbar } from '@/components';

function ParentContactUs() {
  return (
    <>
      <Head>
        <title> Contact us </title>{' '}
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParentNavbar isLogin={true} />
      <ContactUs />
    </>
  );
}

export default withRole(ParentContactUs, ['Parent']);
