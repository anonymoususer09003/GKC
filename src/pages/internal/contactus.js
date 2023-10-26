import React, { useEffect, useState, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import format from 'date-fns/format';
import { apiClient } from '@/api/client';
import { base_url } from '@/api/client';
import { useRouter } from 'next/router';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';
import useDebounce from '@/hooks/use-debounce';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ContactUs = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState();
  const [selectedUserData, setSelectedUserData] = useState();
  const [sentMessages, setSentMessages] = useState([]);
  const [messageToReplyID, setMessageToReplyID] = useState(null);
  const [adminResponseMessage, setAdminResponseMessage] = useState();
  const adminResponseMessageRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const size = 20;
  const debouncedInputValue = useDebounce(search, 300); // Adjust the delay as needed

  const handleReplyCheckboxChange = (event, message) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setMessageToReplyID(message.id);
      adminResponseMessageRef.current.focus();
    } else {
      setMessageToReplyID(null);
    }
  };

  const handleSelectedUser = (user) => {
    setSelectedUserId(user.id);
  };

  useEffect(() => {
    selectedUserId ? getSentMessages() : null;
  }, [selectedUserId]);

  const getSentMessages = async () => {
    try {
      const response = await apiClient.get(
        `${base_url}/contactus/admin/contact-us-from-user/${selectedUserId}`
      );
      setSentMessages(response.data);
      setSelectedUserData(response.data[0].requester);
    } catch (error) {
      console.log(error);
    }
  };

  const sendAdminResponseMessage = async () => {
    try {
      const messageData = {
        id: messageToReplyID,
        response500Chars: adminResponseMessage,
        status: 'CLOSED',
      };
      const response = await apiClient.post(
        `${base_url}/contactus/admin/respond`,
        messageData
      );
      setAdminResponseMessage('');
      getSentMessages();
      setMessageToReplyID(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersWithSentMessages(debouncedInputValue);
  }, [debouncedInputValue, currentPage]);

  const getUsersWithSentMessages = async (debouncedInputValue) => {
    try {
      const body = {
        // name: debouncedInputValue || '',
        page: currentPage - 1,
        size,
        sort: ['ASC'],
      };
      const queryString = new URLSearchParams(body);
      debouncedInputValue && queryString.append('name', debouncedInputValue);
      // ?${queryString}?page=${page}&size=${size}
      const url = `${base_url}/contactus/admin/users-list-with-contact-us/?${queryString.toString()}`;

      const response = await apiClient.get(url);
      setPage((prev) => prev + 1);

      const totalRecords = response?.data?.totalElements; // Replace with the actual total number of records
      const recordsPerPage = size; // Replace with the number of records shown on each page

      const totalPages = Math.ceil(totalRecords / recordsPerPage);

      setTotalCount(totalPages);
      console.log(response.data);

      setUsers(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tw-divide-y tw-p-3 tw-w-full tw-h-full tw-divide-gray-200 tw-overflow-hidden tw-rounded-lg  tw-shadow sm:tw-grid sm:tw-grid-cols-5 tw-gap-x-5 sm:tw-divide-y-0">
      <div className="tw-relative tw-space-y-5">
        <div className="tw-relative tw-cst-pf !tw-border-2 !tw-border-black tw-h-12 tw-w-full">
          <label htmlFor="search-field" className="tw-sr-only">
            Search
          </label>
          {!search && (
            <MagnifyingGlassIcon
              className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-1 tw-h-full tw-w-5 tw-text-gray-400"
              aria-hidden="true"
            />
          )}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="tw-search-field"
            className="tw-block tw-h-full tw-w-full tw-border-0 tw-py-0 tw-pr-0 tw-text-gray-900 placeholder:tw-text-gray-400 focus:tw-ring-0 sm:tw-text-sm"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </div>
        <div className="!tw-border-2 tw-relative tw-cst-pf tw-overflow-y-auto tw-h-[80vh] tw-w-full !tw-border-gray-500">
          {users?.map((user) => (
            <ul className="!tw-flex tw-text-lg tw-mt-2 !tw-list-disc tw-mb-0">
              <li
                onClick={() => handleSelectedUser(user)}
                className={classNames(
                  user.id === selectedUserId
                    ? '!tw-text-orange-600 tw-rounded-xl tw-ml-1'
                    : '',
                  '!tw-cst-pf mt-1 tw-w-[50%] tw-cursor-pointer'
                )}
              >
                {user.firstName} {user.lastName}
              </li>
            </ul>
          ))}
          <nav className="tw-absolute tw-bottom-4 tw-w-full tw-border-t tw-border-gray-200 tw-px-4 sm:tw-px-0">
            <div className="tw-hidden md:tw--mt-px md:tw-flex">
              {totalCount > 1 && (
                <div className="tw--mt-px tw-flex tw-w-0 tw-flex-1">
                  <a className="tw-inline-flex tw-cursor-pointer tw-items-center tw-cst-pf !tw-border-t-2 !tw-border-transparent tw-pr-1 tw-pt-4 tw-text-sm tw-font-medium tw-text-gray-500 hover:tw-border-gray-300 hover:tw-text-gray-700">
                    <ArrowLongLeftIcon
                      className="tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400"
                      aria-hidden="true"
                      onClick={() =>
                        currentPage >= 2
                          ? setCurrentPage((prevCurr) => prevCurr - 1)
                          : null
                      }
                    />
                    {/* Previous */}
                  </a>
                </div>
              )}
              {Array.from({ length: totalCount }, (_, index) => (
                <a
                  onClick={() => setCurrentPage(index + 1)}
                  className={classNames(
                    currentPage === index + 1
                      ? '!tw-text-indigo-600'
                      : 'tw-text-gray-500 hover:tw-border-gray-300 hover:tw-text-gray-700',
                    'tw-inline-flex tw-cursor-pointer tw-justify-center tw-items-center tw-cst-pf !tw-border-t-2 !tw-border-transparent tw-px-4 tw-pt-4 tw-text-sm tw-font-medium'
                  )}
                >
                  {index + 1}
                </a>
              ))}

              {totalCount > 1 && (
                <div className="tw--mt-px tw-flex tw-w-0 tw-flex-1 tw-justify-end">
                  <a className="tw-inline-flex tw-cursor-pointer tw-items-center tw-cst-pf !tw-border-t-2 !tw-border-transparent tw-pl-1 tw-pt-4 tw-text-sm tw-font-medium tw-text-gray-500 hover:tw-border-gray-300 hover:tw-text-gray-700">
                    {/* Next */}
                    <ArrowLongRightIcon
                      className="tw-ml-3 tw-h-5 tw-w-5 tw-text-gray-400"
                      aria-hidden="true"
                      onClick={() =>
                        currentPage <= 4
                          ? setCurrentPage((prevCurr) => prevCurr + 1)
                          : null
                      }
                    />
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      <div className="tw-col-span-4 tw-cst-pf tw-p-4 tw-rounded-3xl tw-cst-pf  !tw-border-2 !tw-border-black">
        <div className="tw-grid tw-cst-pf tw-grid-cols-5 tw-grid-rows-5">
          <div className="tw-col-span-1 tw-mt-3 tw-cst-pf !tw-border-2 !tw-border-black p-2 tw-rounded-xl tw-row-span-3 tw-overflow-y-auto tw-h-[50vh] tw-space-y-8 tw-text-lg tw-font-semibold">
            {selectedUserData && (
              <>
                <div className="tw-space-y-2">
                  <div>
                    <label className="tw-cst-pf">Email</label>
                    <h1 className="tw-ml-2 tw-text-lg tw-font-normal">
                      {selectedUserData.email}
                    </h1>
                  </div>
                  <div>
                    <label className="tw-cst-pf">User Type</label>
                    <h1 className="tw-ml-2 tw-text-lg tw-font-normal">
                      {selectedUserData.userType}
                    </h1>
                  </div>
                  {/* 
                  {selectedUserData.userType !== 'Instructor' ? (
                    <>
                      <h1 className="tw-cst-pf">Parent 1</h1>
                      <h1 className="tw-cst-pf">Email Parent 1</h1>
                      <h1 className="tw-cst-pf">Parent 2</h1>
                      <h1 className="tw-cst-pf">Email Parent 2</h1>
                    </>
                  ) : (
                    ''
                  )} */}
                  <div>
                    <label className="tw-cst-pf">Grade</label>
                    {selectedUserData.gradesToTutor?.map((grade) => (
                      <p className="tw-ml-2 tw-mt-1 tw-m-0 tw-text-lg tw-font-normal">
                        {grade.name}
                      </p>
                    ))}
                  </div>
                  <div>
                    <label className="tw-cst-pf">Delivery Mode</label>
                    {selectedUserData.deliveryModes?.map((mode, index) => (
                      <div className="tw-ml-2 tw-mt-1 tw-m-0 tw-text-lg tw-font-normal">
                        {mode.name}
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="tw-cst-pf">Language</label>
                    {selectedUserData.languagePreference?.map((language) => (
                      <div className="tw-ml-2 tw-mt-1 tw-m-0 tw-text-lg tw-font-normal">
                        {language.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div>
                    <label className="tw-cst-pf">Country</label>
                    <h1 className="tw-ml-2 tw-text-lg tw-font-normal">
                      {selectedUserData.country}
                    </h1>
                  </div>
                  <div>
                    <label className="tw-cst-pf">State</label>
                    <h1 className="tw-ml-2 tw-text-lg tw-font-normal">
                      {selectedUserData.state}
                    </h1>
                  </div>
                  <div>
                    <label className="tw-cst-pf">City</label>
                    <h1 className="tw-ml-2 tw-text-lg tw-font-normal">
                      {selectedUserData.city}
                    </h1>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="tw-row-span-5 tw-col-span-4 tw-p-3">
            <div className="tw-h-full tw-gap-y-4 tw-grid tw-grid-rows-5 tw-grid-cols-5">
              <div className="tw-row-span-3 !tw-h-[50vh] tw-pt-6 tw-overflow-y-scroll tw-col-span-5 tw-space-y-7 tw-flex tw-flex-col tw-rounded-2xl tw-px-1 tw-justify-start tw-cst-pf !tw-border-2 !tw-border-black">
                {sentMessages.map(
                  (message, index) =>
                    message.message && (
                      <div className="tw-flex" key={index}>
                        <div className="tw-space-y-8 tw-mt-3 tw-px-2">
                          <div className="tw-cst-pf tw-flex tw-flex-col tw-h-10 tw-items-center">
                            <input
                              id={`reply-${index}`}
                              aria-describedby={`comments-description-${index}`}
                              name={`reply-${index}`}
                              onChange={(event) =>
                                handleReplyCheckboxChange(event, message, index)
                              }
                              type="checkbox"
                              disabled={
                                messageToReplyID !== null &&
                                messageToReplyID !== message.id
                              }
                              checked={messageToReplyID === message.id}
                              className="tw-cst-pf !tw-border-2 tw-h-5 tw-w-5 tw-rounded !tw-border-gray-300 tw-text-indigo-600 focus:tw-ring-indigo-600"
                            />
                            <label>Reply</label>
                          </div>
                          {/* <div className="tw-flex tw-flex-col tw-h-6 tw-items-center">
                            <input
                              id="comments"
                              aria-describedby="comments-description"
                              name="close"
                              type="checkbox"
                              className="tw-cst-pf !tw-border-2 tw-h-5 tw-w-5 tw-rounded !tw-border-gray-300 tw-text-indigo-600 focus:tw-ring-indigo-600"
                            />
                            <label>Close</label>
                          </div> */}
                        </div>

                        <div className="tw-w-full tw-relative">
                          <textarea
                            placeholder="Sent message"
                            className="tw-w-full !tw-border-2 !tw-border-black tw-rounded-2xl tw-h-full"
                            rows="5"
                            readOnly
                            value={`Sent message: ${message.message}\n \n \nAdmin response: ${message.adminResponseMessage}`}
                          />
                          {/* <p className="tw-absolute tw--top-6">
                            Status: {message.status}
                          </p> */}
                          <p className="tw-absolute tw--top-6 tw-right-0">
                            {format(new Date(message.createdAt), 'P, p')}
                          </p>
                        </div>
                      </div>
                    )
                )}
              </div>
              <div className="tw-row-span-2 tw-col-start-2 tw-col-end-6 tw-col-span-4">
                <div>
                  <textarea
                    ref={adminResponseMessageRef}
                    placeholder="Send a message"
                    name="message"
                    className="tw-w-full tw-border-2 tw-border-black tw-rounded-2xl tw-h-full"
                    rows="6"
                    value={adminResponseMessage}
                    onChange={(e) => setAdminResponseMessage(e.target.value)}
                  />
                </div>
                <div className="tw-flex tw-justify-end tw-mt-10">
                  <button
                    onClick={sendAdminResponseMessage}
                    className={`${
                      adminResponseMessage && messageToReplyID
                        ? 'tw-bg-orange-500'
                        : 'tw-bg-gray-500'
                    } tw-w-32 tw-p-1 tw-rounded-lg tw-text-white`}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
