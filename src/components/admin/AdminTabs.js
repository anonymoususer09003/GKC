import Link from 'next/link';
import { useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminTabs({ tabs, handleTabSelection }) {
  return (
    <div className="tw-mb-4 tw-cursor-pointer">
      <div className="sm:tw-hidden ">
        <label htmlFor="tw-tabs" className="tw-sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="tw-block tw-w-full tw-cst-pf tw-rounded-md tw-border-gray-300 focus:tw-border-indigo-500 focus:tw-ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="tw-hidden  sm:tw-block">
        <nav
          className="tw-isolate  tw-flex tw-divide-x tw-divide-gray-200 tw-rounded-lg tw-shadow-sm "
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <a
              key={tab.name}
              // href={tab?.href}
              onClick={() => handleTabSelection(tab)}
              className={classNames(
                tabIdx === 0 ? 'tw-rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'tw-rounded-r-lg' : '',
                tab.current ? 'tw-bg-white' : 'tw-bg-orange-300',
                'tw-group tw-relative tw-min-w-0 tw-cst-pf tw-flex-1 tw-overflow-hidden  tw-text-gray-900 hover:tw-text-gray-700 tw-py-2 tw-px-2 tw-text-center tw-text-sm tw-font-medium hover:tw-bg-gray-50 focus:tw-z-10'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? 'tw-bg-black' : 'tw-bg-transparent',
                  'tw-absolute tw-inset-x-0 tw-bottom-0 tw-h-0.5'
                )}
              />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
