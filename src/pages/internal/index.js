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
import { useState, useEffect } from 'react';
import TutorNavbar from '@/components/admin/tutornavbar';

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
  { name: 'Profile', href: '/internal/profile', current: false },
];

export default function AdminHomePage() {
  const [currentTab, setCurrentTab] = useState('Contact Us');
  const [tabs, setTabs] = useState(intialTabs);

  useEffect(() => {
    console.log(tabs);
  }, [tabs]);

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
