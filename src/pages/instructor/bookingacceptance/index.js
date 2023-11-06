"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ParentNavbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { useRouter } from "next/router";
import { withRole } from "../../../utils/withAuthorization";
import axios from "axios";
import { fetchUser } from "@/store/actions/userActions";
import Link from "next/link";
import { base_url } from "@/api/client";
import { connect } from "react-redux";
import { apiClient } from "@/api/client";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import getBookingAcceptance from "@/services/Booking/get-booking-acceptance";
import TutorNavbar from "@/components/admin/tutornavbar";
import Modal from "@/components/parent/modal/Modal";
import { useScreenSize } from "@/hooks/mobile-devices";
import acceptBooking from "@/services/Booking/accept-booking";
import rejectBooking from "@/services/Booking/reject-booking";
import { BASE_URL } from "../../../utils/withAuthorization";
function ParentScheduleClass({ loading, error }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(router);
  console.log("uuuser", userInfo);
  const { isLargeScreen } = useScreenSize();
  const { instructorId } = router.query;
  const loggedInUser = useSelector((state) => state.user.userInfo);
  const [instructorData, setInstructorData] = useState({});
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedMode, setSelectedMode] = useState("");
  const [courseId, setCourseId] = useState("");
  const [classFrequency, setClassFrequency] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [availableTime, setAvailableTime] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [time, setTime] = useState();
  const [studentId, setStudentId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [err, setErr] = useState("");
  const [ifSignedUser, setIfSignedUser] = useState(false);
  const [eventslotsexists, setEventslotsexists] = useState(false);
  const [paymentSubmit, setPaymentSubmit] = useState(true);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [slectedValues, setSelectedValues] = useState([]);
  const [bookingInfo, setBookingInfo] = useState({});
  const eventId = router?.query?.eventId;

  let dur = null;
  let eventStartTimeslot = undefined;
  let ca = [];
  let sid = null;
  const [dependent, setDependent] = useState(null);

  //Get Courses
  const getCourses = async () => {
    try {
      const response = await apiClient.get(`/public/course/with-instructors`);

      var coursesArray = [];

      response.data.map((v) => {
        coursesArray.push({ value: v.id, label: v.name });
      });
      ca = coursesArray;
      console.log(response);
      setInstructorCourses(coursesArray);
      return ca;
    } catch (error) {
      console.log(error);
    }
  };

  const getEventDetail = async () => {
    try {
      let res = await getBookingAcceptance(eventId);
      setSelectedMode(res?.data?.eventInPerson ? "In-Person" : "Online");
      setBookingInfo(res.data);
      let coursesArr = await getCourses();
      console.log(ca);
      console.log("res", res);
      const { data } = res;
      eventStartTimeslot = data.start;
      console.log(moment(data?.start).format("YYYY-MM-DD HH:mm"));
      // console.log(instructorCourses)
      // console.log(ca.find(el => el.value === data.courseId).label)
      dur = data?.durationInHours;
      sid = data?.studentId;
      // console.log("dependent", loggedInUser.dependents.find(el=>el.id === sid));
      // setDependent(loggedInUser.dependents.find(el=>el.id === sid))
      setStudentId(data?.studentId);
      const date = new Date(data?.start);
      const formattedDateStr = date
        .toISOString()
        .slice(0, 16)
        .replace("T", " ");
      setTime(formattedDateStr);
      setDuration(data.durationInHours);
      setDate(data.start.slice(0, 10));
      setClassFrequency(data.classFrequency);
      setCourseId(coursesArr.find((el) => el.value === data.courseId).label);

      setPaymentSubmit(true);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    getCourses();
    if (eventId) {
      setPaymentSubmit(true);
      getEventDetail();
    } else {
      setPaymentSubmit(false);
    }
  }, [eventId]);

  //apply styles for unavailableDate

  console.log("instructor data", instructorData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("loggedin user", loggedInUser);

      const value = JSON.parse(window.localStorage.getItem("gkcAuth"));
      const userRole = value?.role?.toLowerCase();

      if (!JSON.parse(window.localStorage.getItem("gkcAuth"))?.role) {
        setIfSignedUser(true);
      }
      console.log("userrole", userRole);

      if (loggedInUser) {
        if (loggedInUser?.userType != "Instructor") {
          if (loggedInUser?.userType === "Student") {
            window.location.assign(BASE_URL);
          }
          if (loggedInUser?.userType === "Parent") {
            window.location.assign(`${BASE_URL}/parent`);
          }
        }
      }
    }
  }, [loggedInUser?.userType]);

  console.log("logged in user", loggedInUser);
  const handleRejectBooking = async () => {
    try {
      let res = await rejectBooking(eventId);
      router.push("/");
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleAcceptBooking = async () => {
    try {
      let res = await acceptBooking(eventId);
      console.log("res accept", res);
      router.push("/");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <Head>
        <title>Instructor Booking Accept</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        /> */}
      </Head>
      <div
        style={{ position: "relative" }}
        className={`${router.asPath.includes("eventId") ? "tw-z-30" : ""}`}
      >
        <TutorNavbar isLogin={true} />
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {paymentSubmit ? (
        <div
          style={{
            position: "fixed",
            zIndex: 1,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            background: "white",
            fontSize: 20,
          }}
        >
          <div
            style={{
              background: "white",
              margin: "200px auto",
              padding: 20,
              // width: "500px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
            <p
              style={{
                width: "auto",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {" "}
              {bookingInfo?.bookingUser?.firstName +
                " " +
                bookingInfo?.bookingUser?.lastName +
                " "}
              has requested that you review, approve or decline class:
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "60px 0",
              }}
            >
              <ul
                style={{
                  listStyleType: "none",
                  width: 200,
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <li>Course</li>

                <li># of hours</li>
                <li>Date</li>
                <li>Mode</li>
              </ul>
              <ul
                style={{
                  listStyleType: "none",
                  width: 200,
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <li>
                  {
                    instructorCourses?.find(
                      (item) => bookingInfo?.courseId === item?.value
                    )?.label
                  }
                </li>

                <li>{bookingInfo?.durationInHours}</li>
                <li>
                  {moment(bookingInfo?.startAtInstructorTimeZone).format(
                    "YYYY-MM-DD"
                  )}
                </li>
                <li>{selectedMode}</li>
              </ul>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="btn_primary text-light p-2 rounded fw-bold mt-3"
                style={{ width: "300px", position: "relative" }}
                onClick={() => {
                  handleAcceptBooking();
                }}
              >
                Accept
              </button>

              <button
                className=" text-light p-2 rounded fw-bold mt-3"
                style={{
                  width: "300px",
                  position: "relative",
                  marginLeft: "20px",
                  backgroundColor: "red",
                }}
                onClick={() => {
                  handleRejectBooking();
                }}
              >
                Decline
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="fw-bold mt-3"
                style={{
                  width: "180px",
                  position: "relative",
                  border: "none",
                  background: "none",
                }}
                onClick={() => {
                  setPaymentSubmit(false);
                }}
              >
                <u>Go to main page</u>
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {ifSignedUser ? (
        <div
          style={{
            position: "fixed",
            zIndex: 1,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "auto",
            background: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            style={{
              background: "white",
              margin: "500px auto",
              padding: 20,
              width: "22%",
            }}
          >
            <p style={{ width: 300, margin: "auto" }}>
              Please sign in before scheduling a class.
            </p>

            <button
              onClick={() => {
                window.localStorage.setItem(
                  "instructor-booking",
                  JSON.stringify({
                    eventId,
                    instructorId,
                  })
                );
                window.localStorage.setItem(
                  "goInstructorBackSchedule",
                  JSON.stringify({ event: eventId, id: instructorId })
                );
                window.localStorage.setItem(
                  "instructorScheduler",
                  JSON.stringify({ event: eventId, id: instructorId })
                );
                router.push("/auth/signin");
              }}
              className="btn_primary text-light p-2 rounded fw-bold mt-3"
              style={{ width: 50, position: "relative", margin: "0 42%" }}
            >
              Ok
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  loading: state.user.loading,
  error: state.user.error,
});

// export default withRole(ParentScheduleClass, ["Instructor"]);
export default ParentScheduleClass;
