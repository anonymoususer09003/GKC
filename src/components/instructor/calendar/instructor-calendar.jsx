import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar, TutorNavbar, Footer } from "../../../components";
import Calendar from "react-calendar";
import { BsFillChatFill, BsFillSendFill } from "react-icons/bs";
import { GoDeviceCameraVideo } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";
import moment from "moment";
import FirebaseChat from "../../../hooks/firebase-chat";
import { withRole } from "../../../utils/withAuthorization";
import axios from "axios";
import { parseISO, format } from 'date-fns'
import styles from "../../../styles/Home.module.css"
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';
import { fetchUser } from "@/store/actions/userActions";

function InstructorCalendar() {
  const navigation = useRouter();

  const { sendMessage, messages, setChatInfo, setNewMessage, newMessage } =
    FirebaseChat();
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvent] =useState([])
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [eventTime, setEventTime] = useState("");
  const [eventId, setEventId] = useState(null)
  const dispatch = useDispatch();
  const [instructorId, setInstructorId] = useState(null)
  const [meetingLink, setMeetingLink] = useState(null)
  const [deleteable, setDeleteable] = useState(false);
  const [noEvent, setNoEvent] = useState(false);
  const [student, setStudent] = useState("")
  const loggedInUser = useSelector((state) => state.user.userInfo)


  const onContinue = () => {
    navigation.push("/instructor/video");
  };



  const getEvents = async () => {
    try {
      var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
      const res = await axios.get("http://34.227.65.157/instructor/events-iCal?instructorId=44", {
      headers: {
        Authorization: `Bearer ${typ.accessToken}`,
      },
    });
    console.log(res.data);
    // setProfile(res.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
   // console.log(id, "iddddd")
   //setInstructorId(loggedInUser.id);
  // console.log(loggedInUser.id, "pleaseee")
  }, [dispatch])
  
    //iCal data fetching
/*
    //Logged user events
    useEffect(() => {
        const fetchEventData = async () => {
          try {
            const typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
        
            const response = await axios.get('http://34.227.65.157/event/logged-user-events', {
              headers: {
                Authorization: `Bearer ${typ.accessToken}`,
              },
            });
            
        
            setBookedEvent(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching iCalendar data:', error);
          }
        };
        fetchEventData();
      }, [])
      
        //Calendar Click
   const handleCalendarClick = (clickedDate) => {
     const year = clickedDate.toISOString().slice(0, 4);
     const month = clickedDate.toISOString().slice(5, 7);
     const day = (parseInt(clickedDate.toISOString().slice(8, 10)) + 1).toString().padStart(2, '0');
     const modifiedClickedDate = `${year}${month}${day}`;
   
     const selectedIcalEvent = events.find((singleEvent) => singleEvent['DTSTART'].slice(0, 8) === modifiedClickedDate && singleEvent['EVENT-ID']);
   
     if (selectedIcalEvent) {
       setSingleIcalEvent(selectedIcalEvent);
   
       const matchedBookedEvent = bookedEvents.find((singleBooked) => singleBooked.id == selectedIcalEvent['EVENT-ID']);
   
       if (matchedBookedEvent) {
         setStudent(matchedBookedEvent.studentName);
         setEventTime(matchedBookedEvent.start);
         setDeleteable(matchedBookedEvent.deleteable);
         //HERE WILL BE THE MEETING LINK
         setMeetingLink("meetinglink");
         setInstructorId(matchedBookedEvent.instructorId);
         setNoEvent(false);
         setEventId(matchedBookedEvent.id)
       } else {
         // Clear the states when a matching booked event is not found
         setNoEvent(true)
         setEventTime('');
         setDeleteable(false);
         setMeetingLink('');
         setInstructorId('');
       }
     } else {
       // Clear the states when a matching iCal event is not found
         setNoEvent(true)
         setSingleIcalEvent(null);
         setEventTime('');
         setDeleteable(false);
         setMeetingLink('');
         setInstructorId('');
     }
   };
   */
  /*
    const getUnavailableDays = async () => {
      try {
        var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
        const res = await axios.post(
          "http://34.227.65.157/instructor/unavailable-day",
          {
            date: "2000-12-31",
          },
          {
            headers: {
              Authorization: `Bearer ${typ.accessToken}`,
            },
          }
        );
        console.log(res);
        // setProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };


    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
          const resp = await axios.get("http://34.227.65.157/user/logged-user-details", {
          headers: {
            Authorization: `Bearer ${typ.accessToken}`,
          },
          });
          console.log('=============>', resp.data.userDetails.id);
        try {
          var typ = JSON.parse(window.localStorage.getItem("gkcAuth"));
          const res = await axios.get(`http://34.227.65.157/instructor/schedule-and-unavailable-days-iCal?instructorId=${resp.data.userDetails.id}`, {
          headers: {
            Authorization: `Bearer ${typ.accessToken}`,
          },
        });

      const calendarData = res.data;
  
      const events = [];
      const unavailableDays = [];
  
      const lines = calendarData.split('\n');
  
      let currentEvent = null;
      let currentFreeBusy = null;
  
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
  
        if (line.startsWith('BEGIN:VEVENT')) {
          currentEvent = {};
        } else if (line.startsWith('BEGIN:VFREEBUSY')) {
          currentFreeBusy = {};
        } else if (line.startsWith('UID:') && (currentEvent || currentFreeBusy)) {
          const uid = line.split(':')[1];
          if (currentEvent) {
            currentEvent.uid = uid;
          } else if (currentFreeBusy) {
            currentFreeBusy.uid = uid;
          }
        } else if (line.startsWith('DTSTART:') && currentEvent) {
          const dtStart = line.split(':')[1];
          const dateString = dtStart;
          const year = parseInt(dateString.slice(0, 4));
          const month = parseInt(dateString.slice(4, 6)) - 1; // Month is zero-based in JavaScript's Date object
          const day = parseInt(dateString.slice(6, 8));
          const date = new Date(year, month, day);
          currentEvent.dtStart =  date;

        } else if (line.startsWith('FREEBUSY;FBTYPE=BUSY:') && currentFreeBusy) {
          const [start, end] = line.split(':')[1].split('/');

          const dateString = start;
          const year = parseInt(dateString.slice(0, 4));
          const month = parseInt(dateString.slice(4, 6)) - 1; // Month is zero-based in JavaScript's Date object
          const day = parseInt(dateString.slice(6, 8));
          const date = new Date(year, month, day);
          currentFreeBusy.start = date;
          currentFreeBusy.end = end;
        } else if (line.startsWith('END:VEVENT')) {
          if (currentEvent) {
            events.push(currentEvent);
            currentEvent = null;
          }
        } else if (line.startsWith('END:VFREEBUSY')) {
          if (currentFreeBusy) {
            unavailableDays.push(currentFreeBusy);
            currentFreeBusy = null;
          }
        }
      }
  
      // this.setState({ events, unavailableDays });
      setUnavailableDates(unavailableDays)
      setEvents(events)
      console.log(events, unavailableDays)
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }


        // setProfile(res.data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }


  };

  fetchProfileData()
    }, []);
    */

  // const events = [
  //   { date: new Date(2023, 5, 15), title: 'Event 1' },
  //   { date: new Date(2023, 5, 20), title: 'Event 2' },
  //   { date: new Date(2023, 5, 22), title: 'Event 3' },
  // ];

  /*
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const event = events.find((event) => event.dtStart.getTime() === date.getTime());
      // const event = events.find((event) =>console.log(date.getTime()));
      if (event) {
        return 'event-day';
      }
    }

    return null;
  };

  
  const tileDisabled = ({ date }) => {
    // return unavailableDates.some((disabledDay) => date.start.toDateString() === disabledDay.toDateString());
    return unavailableDates.some((disabledDay) => date.toDateString() === disabledDay.start.toDateString());
  };

  */
  return (
    <>
  
       <Navbar isLogin={true} />
      <main className="container-fluid">
        <div
         
        >
      <div className={`row ${styles.calendarWrapper}`}>
          <div className="col-12 col-lg-6 ">
            <div
              className="d-flex justify-content-end p-2"
              onClick={() => navigation.push("/instructor/editcalandar")}
            >
              <FiEdit style={{ fontSize: "24px" }} />
            </div>
            <Calendar 
              //onChange={onChange} 
              //value={value} 
            //  tileDisabled={tileDisabled}
              //tileClassName={tileContent}
            />
          </div>
          <div className="col-12 col-lg-6">
            <h3 className={`text-center ${styles.scheduleHeader}` } onClick={()=> loogeduserdata()}>Schedule</h3>
            <div
              className={`shadow p-5 bg-white rounded ${styles.scheduleBox}`}
              style={{ minHeight: "400px" }}
            >
              {[1, 2, 3].map((item,i) => {
                return (
                  <div
                    onClick={() => openChat(item)}
                    key={i}
                    className="d-flex align-items-center py-3"
                  >
                    <h5 className="p-0 m-0 flex-fill fw-bold flex-fill">
                      John Doe
                    </h5>
                    <h5 className="p-0 m-0 flex-fill fw-bold flex-fill">
                      11:00AM
                    </h5>
                    <BsFillChatFill
                      className="p-0 m-0 flex-fill h2 flex-fill"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                    />

                    <GoDeviceCameraVideo
                      className="p-0 m-0 flex-fill h2 flex-fill"
                      onClick={() => onContinue()}
                    />

                    <RiDeleteBin6Line className="p-0 m-0 h2 flex-fill" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Footer />
        {/* Chat View Modal */}
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="modal fade"
            id="exampleModal2"
            tabIndex="-1"
            aria-labelledby="exampleModal2Label"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content p-2">
                <div className="d-flex justify-content-between">
                  <h5 className="modal-title" id="exampleModal2Label"></h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className=" p-3" style={{ minHeight: "400px" }}>
                    {messages.map((item, index) => {
                      let date = item.timestamp.seconds * 1000;
                      return (
                        <div
                          key={index}
                          className={`py-1 ${
                            item?.user?.id == instructor?.id ? "text-end" : ""
                          }`}
                        >
                          <p className="p-0 m-0 fw-bold">{item.message}</p>
                          <small className="p-0 m-0">
                            {`${item?.user?.name}  ${moment(date).format(
                              "d/MM/YY"
                            )}`}{" "}
                            {moment(date).format("hh:mm a")}
                          </small>
                        </div>
                      );
                    })}
                  </div>

                  <div className=" d-flex align-items-center px-2 gap-2">
                    <input
                      value={newMessage}
                      //onChange={handleTextChange}
                      type="text"
                      placeholde=""
                      className="border  p-2 rounded flex-fill"
                    />{" "}
                    <BsFillSendFill
                      onClick={() => sendMessage({ type: "instructor" })}
                      className="h3 p-0 m-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </main>
    </>
  );
}

const mapStateToProps = (state) => ({
    userInfo: state.user.userInfo,
    loading: state.user.loading,
    error: state.user.error,
  });

export default withRole(InstructorCalendar, ["Instructor"]);
