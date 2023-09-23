import { useState, useEffect } from "react";
import { Navbar, Footer } from "../../../components";
import Head from "next/head";
import { withRole } from '../../../utils/withAuthorization';
import styles from "../../../styles/Home.module.css"
import { useRouter } from 'next/router';
import GetInstructorForParents from "@/services/Review/GetInstructorForParents";
import GetInstructorByStudent from "@/services/Review/GetInstructorByStudent";
 

function ReportInstructor() {
  //protection starts
  const nav = useRouter()
  // checking if user logged in starts
  if(typeof window !== 'undefined'){ // here we check if global object successfully loaded
    console.log('lol')
    useEffect(()=>{

      if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) { //here we check if user signed in
        nav.push('/') 
      } else{
        if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Student') { //here we check if user has role Student
          nav.push('/')
        }
      }

    },[])
  }
  // checking if user logged in ends

  //protection ends
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [comment, setComment] = useState('')
  const [reasonOfReporting, setreasonOfReporting] = useState('')

  function removeDuplicates(arr, key) {
    const uniqueKeys = new Set();
    return arr.filter((obj) => {
      const value = obj[key];
      if (!uniqueKeys.has(value)) {
        uniqueKeys.add(value);
        return true;
      }
      return false;
    });
  }

  const getReviewInstructors = async () => {
    try {
      let res = null;
      if (window.localStorage.getItem('userType') === "parent") {
        let instructors = [];
        res = await GetInstructorForParents();
        res?.data?.studentAndInstructorList?.map((item) => {
          instructors = [...instructors, ...item?.instructorList];
        });

        const uniqueArray = removeDuplicates(instructors, "id");
        setInstructors(uniqueArray);
      } else {
        res = await GetInstructorByStudent();
        setInstructors(res.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const onSubmit = async () => {
    try{
      let body = {
        comment: comment,
        reasonOfReporting: reasonOfReporting,
        reportedUserId: selectedInstructor?.id
      }
      const res = await report(body)
    } catch (err) {
      console.log("err", err)
    }

  }
  useEffect(()=>{
    getReviewInstructors()
  },[])

  return (
    <>
      <Head>
        <title>Reported Instructor</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gkc-images.s3.amazonaws.com/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      <main className="container-fluid">
        <div className={` container pt-5`} style={{ minHeight: "90vh" }}>
          <div className="row">
          <div className="col">
              <h5 className="py-3">Your Instructors</h5>
              {instructors.map((item, key) => (
                <p role="button"
                 onClick={() => setSelectedInstructor(e)}
                 key={key}
                 >
                  {item}
                </p>
              ))}
            </div>
            <div className="col col-9">
              <h5 className="mb-5">
                Tell us your reason for reporting {`${selectedInstructor}`}
              </h5>
              <div className="form-check my-3"
                onClick={()=>{setreasonOfReporting('Unprofessional Conduct')}}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option"
                />
                <label className="form-check-label" htmlFor="option">
                Unprofessional Conduct
                </label>
              </div>
              <div className="form-check my-3"
              onClick={()=>{setreasonOfReporting('Not skilled in subject area')}}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option2"
                />
                <label className="form-check-label" htmlFor="option2">
                Not skilled in subject area
                </label>
              </div>
              <div className="form-check my-3"
              onClick={()=>{setreasonOfReporting('Does not give clear explanation of subject')}}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option3"
                />
                <label className="form-check-label" htmlFor="option3">
                Does not give clear explanation of subject
                </label>
              </div>
              <div className="form-check my-3"
              onClick={()=>{setreasonOfReporting('Inadequate teaching experience')}}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option4"
                />
                <label className="form-check-label" htmlFor="option4">
                Inadequate teaching experience
                </label>
              </div>
              <div className="form-check my-3"
              onClick={()=>{setreasonOfReporting('Violation of policies')}}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option5"
                />
                <label className="form-check-label" htmlFor="option5">
                Violation of policies
                </label>
              </div>
              <div className="form-check my-3"
              onClick={()=>{setreasonOfReporting('Lateness to class')}}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option6"
                />
                <label className="form-check-label" htmlFor="option6">
                Lateness to class
                </label>
              </div>
              <div className="form-check my-3"
              onClick={()=>{setreasonOfReporting('Does not teach for the hours paid')}}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option7"
                />
                <label className="form-check-label" htmlFor="option7">
                Does not teach for the hours paid
                </label>
              </div>
              <div className="form-check my-3"
              onClick={()=>{setreasonOfReporting('Other')}}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="reason"
                  id="option8"
                />
                <label className="form-check-label" htmlFor="option8">
                Other...
                </label>
              </div>
              <textarea
                className={`form-control ${styles.reviewDropdown}`}
                id="exampleFormControlTextarea1"
                rows="5"
                onChange={(e)=>{setComment(e.target.value)}}
              ></textarea>
              <div className="mt-3 text-end d-md-flex justify-content-lg-between">
              <p className="opacity-50 mt-2 ms-3">
              {comment.length}/500 (min. 100 characters)
              </p>
                <button
                  className={`py-2 px-4 fw-bold text-white rounded text-end`}
                  style={{background: comment.length >= 100 && comment.length <= 500 && reasonOfReporting.length >= 3 ? '#f48343' : 'gray' }}
                  disabled={comment.length >= 100 && comment.length <= 500 && reasonOfReporting.length >= 3 ? false : true}
                  type="submit"
                  onClick={onSubmit}

                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


export default withRole(ReportInstructor, ['Student']);
