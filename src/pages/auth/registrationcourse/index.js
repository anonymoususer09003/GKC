import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../../../components';
import { BsCheck2Circle } from 'react-icons/bs';
import { useRouter } from 'next/router';
import axios from 'axios';
import { MultiSelect } from 'react-multi-select-component';
import styles from '../../../styles/Home.module.css';
import { apiClient } from '@/api/client';
export default function StudentRegistrationCourse() {
  const navigation = useRouter();
  const [courses, setCourses] = useState([]);
  const [coursesWithProficiency, setCoursesWithProficiency] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedLang, setSelectedLang] = useState([]);
  const [lang, setLang] = useState([]);
  const [proficiency, setProficiency] = useState([]);

  const onContinue = () => {
    var stored = JSON.parse(window.localStorage.getItem('registrationForm'));
    var languageId = [];
    var courseWithId = [];
    selectedLang.map((v) => {
      languageId.push(Number(v.value));
    });
    coursesWithProficiency.map((v) => {
      courseWithId.push({
        courseId: v.courseId,
        proficiencyId: v.proficiencyId,
      });
    });
    stored.courseOfInterestAndProficiency = courseWithId;
    stored.languagePreferencesId = languageId;

    let token = JSON.parse(window.localStorage.getItem("gkcAuth"));
    apiClient.patch(
      "/auth/complete-student-registration",
      {
        studentEmail: stored.email,
        languagePreferencesId: languageId,
        coursesId: courseWithId,
      }
    );

    window.localStorage.setItem('registrationForm', JSON.stringify(stored));
    navigation.push('/auth/registrationccinfo');
  };

  const getCourses = async () => {
    try {
      const response = await apiClient.get(`/public/course/get-all-courses`);

      var technologyList = [];

      response.data.map((v) => {
        technologyList.push({ value: v.id, label: v.name });
      });
      setCourses(technologyList);
    } catch (error) {
      console.error(error);
    }
  };

  const getLang = async () => {
    try {
      const response = await apiClient.get(
        `/public/register/get-all-languages`
      );
      var arr = [];
      response.data.map((v) => {
        arr.push({ value: v.id, label: v.name });
      });
      setLang(arr);
    } catch (error) {
      console.error(error);
    }
  };

  const getProficiency = async () => {
    try {
      const response = await apiClient.get(
        `/public/course/get-all-proficiencies`
      );
      var arr = [];
      response.data.map((v) => {
        arr.push({ value: v.id, label: v.name });
      });
      setProficiency(arr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourses();
    getLang();
    getProficiency();
  }, []);

  const handleAddOrUpdate = (id, newData) => {
    // Check if the ID exists in the data array
    const dataIndex = coursesWithProficiency.findIndex(
      (item) => item.courseId === id
    );

    if (dataIndex === -1) {
      // ID not found, add the new data to the array
      setCoursesWithProficiency([
        ...coursesWithProficiency,
        { id, ...newData },
      ]);
    } else {
      // ID found, update the data at the specified index
      const updatedData = [...coursesWithProficiency];
      updatedData[dataIndex] = { ...updatedData[dataIndex], ...newData };
      setCoursesWithProficiency(updatedData);
    }
  };
  return (
    <>
      <Head>
        <title>Auth | Registration Course</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <Navbar isLogin={true} />
        <div className="row">
          <div
            className="col-12 col-lg-5 position-relative d-none d-lg-block"
            style={{
              backgroundImage: 'url("/assets/register_group.png")',
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}
          ></div>
          <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center ">
            <div className={`w-100 w-md-50 p-5 ${styles.courseWrapper}`}>
              <div>
                <h4 className="text-dark fw-bold">
                  Which courses are you interested in?
                </h4>

                <div className="py-4">
                  <div className={`w-50 mb-3 ${styles.courseDropdowns}`}>
                    <MultiSelect
                      options={courses}
                      value={selected}
                      onChange={setSelected}
                      labelledBy={'Select Course'}
                      isCreatable={true}
                      hasSelectAll={false}
                      overrideStrings={{
                        // selectSomeItems: "Select Some items...",
                        allItemsAreSelected: 'All proficiencies selected',
                        // selectAll: "Select All",
                        // search: "Search",
                      }}
                    />
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {selected.length < 1 ? (
                      <div style={{ padding: '20px 0' }}>
                        <h5 className="text-dark fw-bold">
                          No Course Selected Yet.
                        </h5>
                      </div>
                    ) : (
                      selected.map((v) => {
                        return (
                          <p className="bg_secondary text-white p-2 rounded d-flex align-items-center gap-2 fw-bold">
                            <BsCheck2Circle style={{ fontSize: '22px' }} />
                            {v.label}
                          </p>
                        );
                      })
                    )}
                  </div>
                </div>

                <h4 className="text-dark fw-bold pb-2">Proficiency</h4>

                {selected.length < 1 ? (
                  <div style={{ padding: '50px 0' }}>
                    <h5 className="text-dark fw-bold">
                      No Course Selected Yet.
                    </h5>
                  </div>
                ) : (
                  selected.map((v) => {
                    return (
                      <div className="d-flex  flex-wrap align-items-center gap-2 ">
                        <p style={{ width: 120 }}>{v.label}</p>
                        <select
                          className="w-25 p-2 rounded outline-0 border border_gray  mb-3 "
                          onChange={(e) => {
                            handleAddOrUpdate(v.value, {
                              courseId: v.value,
                              proficiencyId: Number(e.target.value),
                            });
                          }}
                        >
                          <option>Select</option>
                          {proficiency.map((v, i) => {
                            return (
                              <option value={v.value} key={i}>
                                {v.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    );
                  })
                )}

                <div>
                  <h4 className="text-dark fw-bold">
                    Spoken Language Preference?
                  </h4>

                  <div className="py-2">
                    <div className={`w-50 mb-3 ${styles.courseDropdowns}`}>
                      <MultiSelect
                        options={lang}
                        value={selectedLang}
                        onChange={setSelectedLang}
                        labelledBy={'Select Language'}
                        isCreatable={true}
                        hasSelectAll={false}
                        overrideStrings={{
                          // selectSomeItems: "Select Some items...",
                          allItemsAreSelected: 'All proficiencies selected',
                          // selectAll: "Select All",
                          // search: "Search",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className={`d-flex gap-2 mt-3 ${styles.courseBtnWrapper}`}
                  >
                    <button
                      onClick={onContinue}
                      className={`text-light p-2 px-5 rounded fw-bold  ${
                        selected.length == 0 || selectedLang.length == 0
                          ? 'btn_disabled'
                          : 'btn_primary'
                      }`}
                      disabled={
                        selected.length == 0 || selectedLang.length == 0
                          ? true
                          : false
                      }
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
