import { useLayoutEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import RolesModal from '@/components/admin/RolesModal';

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Roles({}) {
  const [openModal, setOpenModal] = useState(false);
  //   const [checked, setChecked] = useState(false);
  //   const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);

  //   useLayoutEffect(() => {
  //     const isIndeterminate =
  //       selectedPeople.length > 0 && selectedPeople.length < people.length;
  //     setChecked(selectedPeople.length === people.length);
  //     setIndeterminate(isIndeterminate);
  //     checkbox.current.indeterminate = isIndeterminate;
  //   }, [selectedPeople]);

  //   function toggleAll() {
  //     setSelectedPeople(checked || indeterminate ? [] : people);
  //     setChecked(!checked && !indeterminate);
  //     setIndeterminate(false);
  //   }

  return (
    <div className="tw-px-4 sm:tw-px-6 lg:tw-px-8">
      <div className="sm:tw-flex sm:tw-items-center">
        <div className="sm:tw-flex-auto">
          <h1 className="tw-text-base tw-font-semibold tw-leading-6 tw-text-gray-900">
            Users
          </h1>
          <div className="tw-relative !tw-border-2 tw-rounded-sm !tw-border-black tw-w-44 tw-p-2">
            <label htmlFor="search-field" className="tw-sr-only">
              Search
            </label>
            <MagnifyingGlassIcon
              className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-4 tw-h-full tw-w-5 tw-text-gray-400"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="tw-block tw-h-full tw-w-full !tw-border-2 tw-py-0 tw-pr-0 tw-text-gray-900 placeholder:tw-text-gray-400 focus:tw-ring-0 sm:tw-text-sm"
              placeholder="Search..."
              type="search"
              name="search"
            />
          </div>
        </div>
        <div className="tw-mt-4 sm:tw-ml-16 sm:tw-mt-0 sm:tw-flex-none">
          <button
            onClick={() => setOpenModal(true)}
            type="button"
            className="tw-block !tw-bg-[#f48342] tw-rounded-md tw-px-3 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
          >
            Add user
          </button>
          <RolesModal setOpen={setOpenModal} open={openModal} />
        </div>
      </div>
      <div className="tw-mt-8 tw-flow-root">
        <div className="tw--mx-4 tw--my-2 tw-overflow-x-auto sm:tw--mx-6 lg:tw--mx-8">
          <div className="tw-inline-block tw-min-w-full tw-py-2 tw-align-middle sm:tw-px-6 lg:tw-px-8">
            <div className="tw-relative">
              <table className="tw-min-w-full tw-table-fixed tw-divide-y tw-divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="tw-relative tw-px-7 sm:tw-w-12 sm:tw-px-6"
                    ></th>
                    <th
                      scope="col"
                      className="tw-min-w-[12rem] tw-py-3.5 tw-pr-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-900"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="tw-px-3 tw-py-3.5 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-900"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="tw-px-3 tw-py-3.5 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="tw-px-3 tw-py-3.5 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="tw-relative tw-py-3.5 tw-pl-3 tw-pr-4 tw-sm:pr-3"
                    >
                      <span className="tw-sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="tw-divide-y tw-divide-gray-200 tw-bg-white">
                  {people.map((person) => (
                    <tr
                      key={person.email}
                      className={
                        selectedPeople.includes(person)
                          ? 'tw-bg-gray-50'
                          : undefined
                      }
                    >
                      <td className="tw-relative tw-px-7 tw-sm:w-12 tw-sm:px-6">
                        {selectedPeople.includes(person) && (
                          <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-w-0.5 tw-bg-indigo-600" />
                        )}
                        <input
                          type="checkbox"
                          className="!tw-absolute !tw-border-2 tw-cst-pf !tw-left-4 !tw-top-5 !tw-h-4 !tw-w-4 tw-rounded !tw-border-gray-300 tw-text-indigo-600 focus:tw-ring-indigo-600"
                          value={person.email}
                          checked={selectedPeople.includes(person)}
                          onChange={(e) =>
                            setSelectedPeople(
                              e.target.checked
                                ? [...selectedPeople, person]
                                : selectedPeople.filter((p) => p !== person)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          'tw-whitespace-nowrap tw-py-4 tw-pr-3 tw-text-sm tw-font-medium',
                          selectedPeople.includes(person)
                            ? 'tw-text-indigo-600'
                            : 'tw-text-gray-900'
                        )}
                      >
                        {person.name}
                      </td>
                      <td className="tw-whitespace-nowrap tw-px-3 tw-py-4 tw-text-sm tw-text-gray-500">
                        {person.title}
                      </td>
                      <td className="tw-whitespace-nowrap tw-px-3 tw-py-4 tw-text-sm tw-text-gray-500">
                        {person.email}
                      </td>
                      <td className="tw-whitespace-nowrap tw-px-3 tw-py-4 tw-text-sm tw-text-gray-500">
                        <span className="tw-inline-flex tw-items-center tw-rounded-md tw-bg-green-50 tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-text-green-700 tw-ring-1 tw-ring-inset tw-ring-green-600/20">
                          Active
                        </span>
                      </td>
                      <td className="tw-whitespace-nowrap tw-gap-x-2 tw-flex tw-py-4 tw-pl-3 tw-pr-4 tw-text-right tw-text-sm tw-font-medium sm:tw-pr-3">
                        <BiEdit className="tw-h-5 tw-w-5 tw-cursor-pointer" />
                        <RiDeleteBin6Line className="tw-h-5 tw-w-5 tw-cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
