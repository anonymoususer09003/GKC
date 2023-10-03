import AdminTabs from '@/components/admin/AdminTabs';
import ContactUs from './contactus';
import Roles from './roles';
import Courses from './courses';
import Financials from './financials';
import Students from './students';
import Visitors from './visitors';
import Instructors from './instructors';
import Complaints from './complaints';
import Variables from './variables';
import Profile from './profile';
import { useState } from 'react';
import TutorNavbar from '@/components/admin/tutornavbar';
import { apiClient } from '@/api/client';
import Link from 'next/link';

//important for protection
import { useRouter } from 'next/router';
import { useEffect } from 'react';
//important for protection

const intialTabs = [
  { name: 'Contact Us', href: '/internal/contactus', current: true },
  { name: 'Visitors', href: '/internal/visitors', current: false },
  { name: 'Instructors', href: '/internal/instructors', current: false },
  { name: 'Students', href: '/internal/students', current: false },
  { name: 'Courses', href: '/internal/courses', current: false },
  { name: 'Complaints', href: '/internal/complaints', current: false },
  { name: 'Financials', href: '/internal/financials', current: false },
  { name: 'Variables', href: '/internal/variables', current: false },
  { name: 'Roles', href: '/internal/roles', current: false },
];

export default function AdminHomePage() {
  const [currentTab, setCurrentTab] = useState('Contact Us');
  const [tabs, setTabs] = useState(intialTabs);

  const handleTabSelection = (selectedTab) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      current: tab.name === selectedTab.name,
    }));
    setCurrentTab(selectedTab.name);
    setTabs(updatedTabs);
  };

  return (
    <>
      {/* {ifSignedUser ? (
        <div style={{position:'fixed', zIndex: 1, left:0,top:0, width:'100%', height:'100%',overflow:'auto', background: 'rgba(0, 0, 0, 0.4)'}}>
          <div style={{background: 'white', margin: '500px auto', padding:20,width:'35%'}}>
            <p style={{width: 300, margin: 'auto'}}>Please sign in before schedule class.</p>
            <Link
              href="/auth/signin"
            >
            <button className="btn_primary text-light p-2 rounded fw-bold mt-3" style={{width: 50, position: 'relative', margin: '0 42%'}}>Ok</button>
            </Link>
          </div>
        </div>
        ) : null}
        {!doesAdmin ? (
        <div style={{position:'fixed', zIndex: 1, left:0,top:0, width:'100%', height:'100%',overflow:'auto', background: 'rgba(0, 0, 0, 0.4)'}}>
          <div style={{background: 'white', margin: '500px auto', padding:20,width:'35%'}}>
            <p style={{width: 300, margin: 'auto'}}>You are not admin, please get out.</p>
            <Link
              href="/"
            >
            <button className="btn_primary text-light p-2 rounded fw-bold mt-3" style={{width: 50, position: 'relative', margin: '0 42%'}}>Ok</button>
            </Link>
          </div>
        </div>
        ) : null} */}
      <TutorNavbar />
      <div className="p-10 max-w-full min-h-screen mx-auto">
        <div>
          <AdminTabs tabs={tabs} handleTabSelection={handleTabSelection} />
          {currentTab === 'Contact Us' ? (
            <ContactUs />
          ) : currentTab === 'Visitors' ? (
            <Visitors />
          ) : currentTab === 'Instructors' ? (
            <Instructors />
          ) : currentTab === 'Students' ? (
            <Students />
          ) : currentTab === 'Courses' ? (
            <Courses />
          ) : currentTab === 'Complaints' ? (
            <Complaints />
          ) : currentTab === 'Financials' ? (
            <Financials />
          ) : currentTab === 'Roles' ? (
            <Roles />
          ) : currentTab === 'Variables' ? (
            <Variables />
          ) : currentTab === 'Profile' ? (
            <Profile />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}
