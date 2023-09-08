const roles = ['Visitors', 'Instructors', 'Students', 'Courses'];

export default function Profile() {
  return (
    <div className="tw-w-[70%] tw-p-16 tw-font-medium tw-text-gray-900 tw-mx-auto">
      <div className="tw-px-4 tw-space-y-5">
        <div className="tw-flex tw-w-80 tw-justify-between tw-items-center">
          <label className="tw-block  tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">
            First Name
          </label>
          <p className="tw-w-44 tw-cst-pf">John</p>
        </div>
        <div className="tw-flex tw-w-80 tw-justify-between tw-items-center">
          <label className="tw-block  tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">
            Last Name
          </label>
          <p className="tw-w-44 tw-cst-pf">Doe</p>
        </div>
        <div className="tw-flex tw-w-80 tw-justify-between tw-items-center">
          <label className="tw-block  tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">
            Email
          </label>
          <p className="tw-w-44 tw-cst-pf">Johndoe@abd.com</p>
        </div>

        <div className="tw-flex tw-w-80 tw-justify-between tw-items-center">
          <label className="tw-block tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">
            Status
          </label>
          <p className="tw-w-44 tw-cst-pf">Active</p>
        </div>
        <div className="tw-flex tw-w-80 tw-justify-between">
          <label className="tw-block  tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">
            Access
          </label>
          <div className="tw-w-44 tw-cst-pf">
            <div className="tw-space-y-2">
              {roles.map((role) => (
                <div className="tw-font-medium tw-text-gray-900">{role}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
