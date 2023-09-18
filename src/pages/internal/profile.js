import { apiClient } from '@/api/client';
import { base_url } from '@/api/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
  const loggedUserEmail = typeof window === 'undefined' ? null : window?.localStorage.getItem('email');
  const [loggedUserInfo, setLoggedUserInfo] = useState();

  const getProfileInfo = async () => {
    //protection starts
  const nav = useRouter()
    // checking if user logged in starts
      if(typeof window !== 'undefined' && nav.isReady){
        useEffect(()=>{

          if(JSON.parse(window.localStorage.getItem('gkcAuth')).role === undefined) {
            nav.push('/')
          }

          // if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Student') {
          //   setIfSignedUser(true)
          // } else {
          //   //redirect
          // }
          // if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Parent') {
          //   setIfSignedUser(true)
          // }
          // if(JSON.parse(window.localStorage.getItem('gkcAuth')).role !== 'Instructor') {
          //   setIfSignedUser(true)
          // }

        },[])
      }
    // checking if user logged in ends

    // checking if user is admin starts

    const isAdmin = async () =>{
      try {
        const res = await apiClient('/admin/roles/all-admins')
      } catch (err) {
        console.log(err.response.status)
          nav.push('/')
      }
    }

    useEffect(()=>{
      isAdmin()
    }, [])
    // checking if user is admin ends

  //protection ends

    if(
      loggedUserEmail === null
    ){
      console.log('waiting till global object window will load, so we can parse email item.')
    }else{
      try {
        const response = await apiClient.get(
          `${base_url}/admin/${loggedUserEmail}`
        );
        setLoggedUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <div className="tw-w-[70%] tw-p-16 tw-font-medium tw-text-gray-900 tw-mx-auto">
      {loggedUserInfo && (
        <div className="tw-px-4 tw-space-y-5">
          <div className="tw-flex tw-w-80 tw-justify-between tw-items-center">
            <label className="tw-block  tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">
              First Name
            </label>
            <p className="tw-w-44 tw-cst-pf">{loggedUserInfo.firstName}</p>
          </div>
          <div className="tw-flex tw-w-80 tw-justify-between tw-items-center">
            <label className="tw-block  tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">
              Last Name
            </label>
            <p className="tw-w-44 tw-cst-pf">{loggedUserInfo.lastName}</p>
          </div>
          <div className="tw-flex tw-w-80 tw-justify-between tw-items-center">
            <label className="tw-block  tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">
              Email
            </label>
            <p className="tw-w-44 tw-cst-pf">{loggedUserInfo.email}</p>
          </div>

          <div className="tw-flex tw-w-80 tw-justify-between tw-items-center">
            <label className="tw-block tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">
              Status
            </label>
            <p className="tw-w-44 tw-cst-pf">{loggedUserInfo.adminStatus}</p>
          </div>
          <div className="tw-flex tw-w-80 tw-justify-between">
            <label className="tw-block  tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">
              Access
            </label>
            <div className="tw-w-44 tw-cst-pf">
              <div className="tw-space-y-2">
                {loggedUserInfo.authorities.map((role) => (
                  <div className="tw-font-medium tw-text-gray-900">{role}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
