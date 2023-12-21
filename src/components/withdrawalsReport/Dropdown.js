import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function WithdrawDropdown({
  setPaymentMethod,
  availableBalance,
}) {
  const [selectedOption, setSelectedOption] = useState('Select one');
  return (
    <Menu as="div" className="tw-relative tw-inline-block tw-text-left">
      <div>
        <Menu.Button
          disabled={availableBalance <= 0 ? true : false}
          className="tw-inline-flex tw-w-full tw-justify-center tw-gap-x-1.5 tw-rounded-md tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-font-semibold tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 hover:tw-bg-gray-50"
        >
          {selectedOption}
          <ChevronDownIcon
            className="tw--mr-1 tw-h-5 tw-w-5 tw-text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="tw-transition tw-ease-out tw-duration-100"
        enterFrom="tw-transform tw-opacity-0 tw-scale-95"
        enterTo="tw-transform tw-opacity-100 tw-scale-100"
        leave="tw-transition tw-ease-in tw-duration-75"
        leaveFrom="tw-transform tw-opacity-100 tw-scale-100"
        leaveTo="tw-transform tw-opacity-0 tw-scale-95"
      >
        <Menu.Items className="tw-absolute tw-right-0 tw-z-10 tw-mt-2 tw-w-56 tw-origin-top-right tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none">
          <div className="tw-py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={() => {
                    setPaymentMethod('ACHFunds');
                    setSelectedOption('ACHFunds');
                  }}
                  className={classNames(
                    active
                      ? 'tw-bg-gray-100 tw-text-gray-900'
                      : 'tw-text-gray-700',
                    'tw-block tw-px-4 tw-py-2 tw-text-sm'
                  )}
                >
                  ACH Funds Transfer
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={() => {
                    setPaymentMethod('PayPal');
                    setSelectedOption('PayPal');
                  }}
                  className={classNames(
                    active
                      ? 'tw-bg-gray-100 tw-text-gray-900'
                      : 'tw-text-gray-700',
                    'tw-block tw-px-4 tw-py-2 tw-text-sm'
                  )}
                >
                  PayPal
                </a>
              )}
            </Menu.Item>
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={() => {
                    setPaymentMethod('Payoneer');
                    setSelectedOption('Payoneer');
                  }}
                  className={classNames(
                    active
                      ? 'tw-bg-gray-100 tw-text-gray-900'
                      : 'tw-text-gray-700',
                    'tw-block tw-px-4 tw-py-2 tw-text-sm'
                  )}
                >
                  Payoneer
                </a>
              )}
            </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
