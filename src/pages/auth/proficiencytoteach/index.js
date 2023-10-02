import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../../../components';
import { BsCheck2Circle } from 'react-icons/bs';
import { useRouter } from 'next/router';
import axios from 'axios';
import { MultiSelect } from 'react-multi-select-component';
import { RiArrowGoBackLine } from 'react-icons/ri';
import Select from 'react-select';
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

  const handleSelectChange = (selected) => {
    setSelected(
      selected &&
        selected.map((option) => ({
          label: option.label,
          value: option.value,
          proficienciesId: [],
        }))
    );
  };

  const onContinue = () => {
    var stored = JSON.parse(window.localStorage.getItem('registrationForm'));
    var languageId = [];
    var courseWithId = [];
    selectedLang.map((v) => {
      languageId.push(Number(v.value));
    });

    selected.map((v) => {
      courseWithId.push({
        courseId: v.value,
        proficienciesId: v.proficienciesId.map((val) => {
          return val.value;
        }),
      });
    });

    stored.courseToTeachAndProficiency = courseWithId;
    stored.languagesIdPreference = languageId;
    window.localStorage.setItem('registrationForm', JSON.stringify(stored));
    navigation.push('/auth/instructorbankinfo');
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
      arr.sort((a, b) => {
        const proficiencyOrder = {
          Beginner: 0,
          Intermediate: 1,
          'Semi-expert': 2,
        };
        return proficiencyOrder[a.label] - proficiencyOrder[b.label];
      });

      console.log('arr', arr);
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

  const handleSelection = (selectedOptions, optionIndex) => {
    console.log('selected option', selectedOptions);
    setSelected((prevData) => {
      const newData = [...prevData];
      newData[optionIndex].proficienciesId = selectedOptions;
      return newData;
    });

    console.log(selected);
  };

  return (
    <>
      <Head>
        <title>Auth | Proficiency Course</title>
        <meta name="description" content="Where kids learn to code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://gkc-images.s3.amazonaws.com/favicon.ico"
        />
      </Head>
      <main className="container-fluid d-flex flex-column justify-content-between  min-vh-100">
        <div
          className="text-decoration-none p-4 d-flex gap-2 align-items-center text-dark"
          onClick={() => navigation.back()}
          style={{ cursor: 'pointer' }}
        >
          <RiArrowGoBackLine />
          <p className="fw-bold m-0 p-0 ">Back</p>
        </div>
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
            <div className="w-100 w-md-50 p-5">
              <div>
                <h4 className="text-dark fw-bold">
                  Which courses do you teach?
                </h4>

                <div className="py-4">
                  <div className={`w-50 mb-3 ${styles.courseDropdowns}`}>
                    <Select
                      isMulti
                      options={courses}
                      value={selected}
                      onChange={handleSelectChange}
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

                <h4 className="text-dark fw-bold pb-2">
                  What proficiency do you teach?
                </h4>

                {selected.length < 1 ? (
                  <div style={{ padding: '50px 0' }}>
                    <h5 className="text-dark fw-bold">
                      No Course Selected Yet.
                    </h5>
                  </div>
                ) : (
                  selected.map((v, index) => {
                    console.log('v', v);
                    return (
                      <div className="d-flex align-items-center gap-2 ">
                        <div style={{ width: '120px' }}>
                          <p>{v.label}</p>
                        </div>
                        <div className="w-25 mb-3">
                          <MultiSelect
                            options={proficiency}
                            value={v.proficienciesId}
                            onChange={(selectedOptions) =>
                              handleSelection(selectedOptions, index)
                            }
                            labelledBy={'Select Proficiency'}
                            overrideStrings={{
                              // selectSomeItems: "Select Some items...",
                              allItemsAreSelected: 'All proficiencies selected',
                              // selectAll: "Select All",
                              // search: "Search",
                            }}
                            isCreatable={true}
                            hasSelectAll={true}
                          />
                        </div>
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
                        hasSelectAll={false}
                        options={lang}
                        value={selectedLang}
                        onChange={setSelectedLang}
                        labelledBy={'Select Language'}
                        isCreatable={true}
                        overrideStrings={{
                          // selectSomeItems: "Select Some items...",
                          allItemsAreSelected: 'All proficiencies selected',
                          // selectAll: "Select All",
                          // search: "Search",
                        }}
                      />
                    </div>
                  </div>

                  <div className="d-flex gap-2 justify-content-between mt-3">
                    <button
                      // className="w-25 btn_primary text-light p-2 rounded fw-bold "
                      className={`w-50 btn_primary text-light p-2 rounded fw-bold ${
                        selected.length === 0 || selectedLang.length === 0
                          ? 'btn_disabled'
                          : 'btn_primary'
                      }`}
                      disabled={
                        selected.length === 0 || selectedLang.length === 0
                      }
                      onClick={onContinue}
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
