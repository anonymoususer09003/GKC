import Review from "@/components/review/review";
import { ParentNavbar, Footer } from "../../../components";
import Head from "next/head";
import { withRole } from "../../../utils/withAuthorization";


function ParentInstructorReview() {

  return (
    <>
      <Head>
        <title> Parent Review Instructor </title>{" "}
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>{" "}
      <ParentNavbar isLogin={true} /> 
      <Review role="parent" />
      <Footer />
    </>
  );
}

export default withRole(ParentInstructorReview, ["Parent"]);
