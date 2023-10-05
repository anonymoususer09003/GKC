import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { apiClient } from '@/api/client';
import { base_url } from '@/api/client';

const checkboxes = [
  'CONTACT_US',
  'VISITORS',
  'INSTRUCTORS',
  'STUDENTS',
  'COURSES',
  'COMPLAINTS',
  'REFUND_REQUESTS',
  'FINANCIALS',
  'ROLES',
  'VARIABLES',
];

export default function RolesEditModal({ setOpen, open, getAllAdmins, admin }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [authorities, setAuthorities] = useState([]);
  const [status, setStatus] = useState('Select Status');

  useEffect(() => {
    setFirstName(admin.firstName);
    setLastName(admin.lastName);
    setEmail(admin.email);
    setAuthorities(admin.authorities);
    setStatus(admin.adminStatus === 'ACTIVE' ? 'Active' : 'In Active');
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setAuthorities((prevAuthorities) => [...prevAuthorities, name]);
    } else {
      setAuthorities((prevAuthorities) =>
        prevAuthorities.filter((role) => role !== name)
      );
    }
  };

  const editAdmin = async (admin) => {
    try {
      const updatedAdminData = {
        adminId: admin.id,
        firstName,
        lastName,
        email,
        status: status === 'Active' ? 'ACTIVE' : 'SUSPENDED',
        authorities,
      };
      const response = await apiClient.put(
        `${base_url}/admin/roles/update-admin/${admin.id}`,
        updatedAdminData
      );
      getAllAdmins();
      setOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = (e) => {
    let { value } = e.target;
    setAuthorities(value === 'Active' ? admin.authorities : []);
    setStatus(value);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="tw-relative tw-z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="tw-ease-out tw-duration-300"
          enterFrom="tw-opacity-0"
          enterTo="tw-opacity-100"
          leave="tw-ease-in tw-duration-200"
          leaveFrom="tw-opacity-100"
          leaveTo="tw-opacity-0"
        >
          <div className="tw-fixed tw-inset-0 tw-bg-gray-500 tw-bg-opacity-75 tw-transition-opacity" />
        </Transition.Child>

        <div className="tw-fixed tw-inset-0 tw-z-10 tw-overflow-y-auto">
          <div className="tw-flex tw-min-h-full tw-items-end tw-justify-center tw-p-4 tw-text-center sm:tw-items-center sm:tw-p-0">
            <Transition.Child
              as={Fragment}
              enter="tw-ease-out tw-duration-300"
              enterFrom="tw-opacity-0 tw-translate-y-4 tw-sm:translate-y-0 tw-sm:scale-95"
              enterTo="tw-opacity-100 tw-translate-y-0 tw-sm:scale-100"
              leave="tw-ease-in tw-duration-200"
              leaveFrom="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
              leaveTo="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
            >
              <Dialog.Panel className="tw-relative tw-transform tw-overflow-hidden tw-rounded-lg tw-bg-white tw-px-4 tw-pb-4 tw-pt-5 tw-text-left tw-shadow-xl tw-transition-all sm:tw-my-8 sm:tw-w-full sm:tw-max-w-lg sm:tw-p-6">
                <div className="tw-px-4">
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <label className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
                      First Name
                    </label>
                    <div className="tw-mt-2 tw-w-60">
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="Text"
                        name="First Name"
                        id="First Name"
                        className="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm sm:tw-leading-6"
                        placeholder="First Name"
                      />
                    </div>
                  </div>

                  <div className="tw-flex tw-items-center tw-justify-between">
                    <label className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
                      Last Name
                    </label>
                    <div className="tw-mt-2 tw-w-60">
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        name="Last Name"
                        id="Last Name"
                        className="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm sm:tw-leading-6"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <label
                      htmlFor="email"
                      className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                    >
                      Email
                    </label>
                    <div className="tw-mt-2 tw-w-60">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="Email"
                        id="Email"
                        className="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm sm:tw-leading-6"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div className="tw-flex tw-items-center tw-justify-between">
                    <label
                      htmlFor="email"
                      className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                    >
                      Status
                    </label>
                    <div className="tw-mt-2 tw-w-60">
                      <select
                        style={{ width: '240px' }}
                        value={status}
                        onChange={handleStatus}
                      >
                        <option>Select Status</option>
                        {['Active', 'In Active'].map((status, index) => (
                          <option key={index}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="tw-flex tw-mt-3 tw-justify-between">
                    <label className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
                      Access
                    </label>
                    <fieldset>
                      <div className="tw-space-y-2">
                        {checkboxes.map((role, index) => (
                          <div
                            key={index}
                            className="!tw-relative tw-cst-pf !tw-flex !tw-items-start"
                          >
                            <div className="tw-flex tw-h-6 tw-items-center">
                              <input
                                onChange={handleCheckboxChange}
                                id={role}
                                name={role}
                                checked={authorities.includes(role)}
                                type="checkbox"
                                className="tw-h-4 tw-cst-pf !tw-border-2 tw-w-4 tw-rounded !tw-border-gray-300 tw-text-indigo-600 focus:tw-ring-indigo-600"
                              />
                            </div>
                            <div className="tw-ml-3 tw-text-sm tw-leading-6">
                              <label
                                htmlFor="comments"
                                className="tw-font-medium tw-text-gray-900"
                              >
                                {role}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className="tw-mt-5 tw-w-[70%] tw-mx-auto sm:tw-mt-6 sm:tw-grid sm:tw-grid-flow-row-dense sm:tw-grid-cols-2 sm:tw-gap-3">
                  <button
                    onClick={setOpen}
                    type="button"
                    className="tw-block !tw-bg-[#f48342] tw-rounded-md tw-px-3 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => editAdmin(admin)}
                    type="button"
                    className="tw-block !tw-bg-[#f48342] tw-rounded-md tw-px-3 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
