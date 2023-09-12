export default function ValueInput({ paymentMethod, setTransferAmount }) {
  return (
    <div>
      <div className="tw-relative tw-rounded-md tw-shadow-sm">
        <div className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-3">
          <span className="tw-text-gray-500 sm:tw-text-sm">$</span>
        </div>
        <input
          type="text"
          name="price"
          disabled={paymentMethod ? false : true}
          onChange={(e) => setTransferAmount(e.target.value)}
          id="price"
          className="tw-block tw-w-32 tw-rounded-md tw-border-0 tw-py-1.5 tw-pl-7 tw-text-gray-900 tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm tw-leading-6"
          placeholder="0.00"
          aria-describedby="price-currency"
        />
      </div>
    </div>
  );
}
