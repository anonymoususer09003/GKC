import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StarRatings from "react-star-ratings";
import { Navbar, Footer } from "../../../components";
import Head from "next/head";
import { withRole } from "../../../utils/withAuthorization";
import styles from "../../../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { fetchUser } from "@/store/actions/userActions";
import Review from "@/components/review/review";

function ReviewInstructor() {
  const [showActivation, setShowActivation] = useState(false);
  const instructors = ["John Doe", "Jone Rich", "Katy Long"];
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.userData);

  //const { id, firstName} = loggedInUser;

  useEffect(() => {
    dispatch(fetchUser());
    // console.log(id, "iddddd")
  }, [dispatch]);

  return (
    <>
      <Navbar isLogin={true} /> <Review role="student" />
      <Footer />
    </>
  );
}

export default withRole(ReviewInstructor, ["Student"]);
