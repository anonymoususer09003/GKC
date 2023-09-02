const checkboxes = [
  'Contact Us',
  'Visitors',
  'Instructors',
  'Students',
  'Courses',
  'Complaints',
  'Refund Request',
  'Financials',
  'Variables',
  'Roles',
];

export default function ModalCheckbox() {
  return (
    <fieldset>
      <div className="tw-space-y-2">
        {checkboxes.map((role) => (
          <div className="!tw-relative tw-cst-pf !tw-flex !tw-items-start">
            <div className="tw-flex tw-h-6 tw-items-center">
              <input
                id={role}
                name={role}
                type="checkbox"
                className="tw-h-4 tw-cst-pf !tw-border-2 tw-w-4 tw-rounded !tw-border-gray-300 tw-text-indigo-600 focus:tw-ring-indigo-600"
              />
            </div>
            <div className="tw-ml-3 tw-text-sm tw-leading-6">
              <label htmlFor="comments" className="tw-font-medium tw-text-gray-900">
                {role}
              </label>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
