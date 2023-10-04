import { apiClient } from '@/api/client';
import { useEffect, useState, useRef } from 'react';
import WithdrawDropdown from './Dropdown';
import ValueInput from './valueInput';
import format from 'date-fns/format';
import 'tailwindcss/tailwind.css';

export default function Withdrawals() {
  const tbodyRef = useRef(null);
  const prevScrollTopRef = useRef(0);
  const [withdrawals, setWithdrawals] = useState([]);
  const [availableBalance, setavailableBalance] = useState();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalRecords, setTotalRecods] = useState(0);
  const getAllwithdrawals = async () => {
    let url = `/financial/logged-instructor-withdrawals?${page}&size=${size}`;
    try {
      const response = await apiClient.get(url);
      setWithdrawals(response?.data?.content);
      setTotalRecods(res?.data?.totalElements);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreAllwithdrawals = async () => {
    let url = `/financial/logged-instructor-withdrawals?${page}&size=${size}`;
    try {
      const response = await apiClient.get(url);
      setWithdrawals((prev) => [...prev, ...response?.data?.content]);
      setTotalRecods(res?.data?.totalElements);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const getAvailableBalance = async () => {
    let url = `/instructor/logged-instructor-balance`;
    try {
      const response = await apiClient.get(url);
      setavailableBalance(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmTransfer = async () => {
    let url;
    paymentMethod === 'PayPal'
      ? (url = '/paypal/pay-logged-instructor')
      : (url = '/?/pay-logged-instructor');
    try {
      const response = await apiClient.post(url, transferAmount);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadWithDrawalsReport = async () => {
    let url = `/financial/logged-instructor-withdrawals-pdf-report`;
    try {
      const response = await apiClient.post(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = () => {
    const tbody = tbodyRef.current;
    if (tbody) {
      const scrollableHeight = tbody.scrollHeight - tbody.clientHeight;
      const scrollPosition = tbody.scrollTop;

      if (!reachedEnd && scrollPosition >= prevScrollTopRef.current) {
        // You have reached the end of the scroll and haven't triggered the action yet
        // Call your function or perform any desired action
        // Example: YourFunctionToLoadMoreData();

        if (financialData.length < totalRecords) getMoreAllwithdrawals();
        setReachedEnd(true); // Set the flag to true to prevent multiple triggers
      } else if (scrollPosition < prevScrollTopRef.current) {
        // Reset the flag when scrolling back up to allow the action to trigger again
        setReachedEnd(false);
      }

      // Update the previous scroll position
      prevScrollTopRef.current = scrollPosition;
    }
  };
  useEffect(() => {
    // Attach the scroll event listener to the tbody element
    tbodyRef?.current?.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      tbodyRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [reachedEnd]);

  useEffect(() => {
    getAllwithdrawals();
    getAvailableBalance();
  }, []);

  return (
    <div className="tw-px-20 tw-cst-pf tw-h-screen sm:tw-px-6 lg:tw-px-16">
      <div className="tw-border tw-cst-pf tw-relative tw-p-10 tw-mt-8 tw-rounded-3xl ">
        <div className="tw-flex tw-space-x-20 tw-mt-4 tw-justify-center tw-items-center tw-mx-auto">
          <p className="tw-text-lg tw-font-medium tw-text-gray-700">
            Amount available for withdrawal
          </p>
          <h1 className="tw-text-base tw-font-semibold tw-leading-6 tw-text-gray-900">
            ${availableBalance}
          </h1>
        </div>
        <div className="sm:tw-flex tw-mt-4 tw-space-x-5 tw-justify-center tw-items-center">
          <WithdrawDropdown
            availableBalance={availableBalance}
            setPaymentMethod={setPaymentMethod}
          />
          <div>
            <ValueInput
              paymentMethod={paymentMethod}
              setTransferAmount={setTransferAmount}
            />
          </div>
          <div>
            <button
              disabled={transferAmount > 0 ? false : true}
              type="button"
              onClick={confirmTransfer}
              className="tw-block tw-rounded-md  tw-bg-[#f48342] tw-px-3 tw-py-2 tw-text-center tw-text-sm tw-font-semibold tw-text-black tw-shadow-sm  focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
            >
              Transfer
            </button>
          </div>
        </div>
        <div className="tw-mt-8 tw-flow-root">
          <div className="tw--mx-4 tw--my-2 tw-overflow-x-auto sm:tw--mx-6 lg:tw--mx-8">
            <div className="tw-inline-block tw-min-w-full tw-py-2 tw-align-middle sm:tw-px-6 lg:tw-px-8">
              {withdrawals.length > 0 ? (
                <table className="tw-min-w-full tw-divide-y tw-divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="tw-py-3.5 tw-pl-4 tw-pr-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-900 sm:tw-pl-3"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="tw-px-3 tw-py-3.5 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-900"
                      >
                        Withdrawal
                      </th>
                      <th
                        scope="col"
                        className="tw-px-3 tw-py-3.5 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-900"
                      >
                        Transfer fee
                      </th>
                      <th
                        scope="col"
                        className="tw-px-3 tw-py-3.5 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-900"
                      >
                        Received Payment
                      </th>
                      {/* <th
                        scope="col"
                        className="tw-px-3 tw-py-3.5 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-900"
                      >
                        Available after transfer
                      </th> */}
                      <th
                        scope="col"
                        className="tw-px-3 tw-py-3.5 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-900"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="tw-bg-white">
                    {withdrawalsrReport.map((withdrawal) => (
                      <tr
                        key={withdrawal.status}
                        className="even:tw-bg-gray-50"
                      >
                        <td className="tw-whitespace-nowrap tw-py-4 tw-pl-4 tw-pr-3 tw-text-sm tw-font-medium tw-text-gray-900 sm:tw-pl-3">
                          {format(new Date(withdrawal.createdAt), 'P, p')}
                        </td>
                        <td className="tw-whitespace-nowrap tw-px-3 tw-py-4 tw-text-sm tw-text-gray-500">
                          {withdrawal.withdrawalAmount}
                        </td>
                        <td className="tw-whitespace-nowrap tw-px-3 tw-py-4 tw-text-sm tw-text-gray-500">
                          {withdrawal.transferFee}
                        </td>
                        <td className="tw-whitespace-nowrap tw-px-3 tw-py-4 tw-text-sm tw-text-gray-500">
                          {withdrawal.netAmount}
                        </td>
                        {/* <td className="tw-whitespace-nowrap tw-px-3 tw-py-4 tw-text-sm tw-text-gray-500">
                          {withdrawal.netAmount}
                        </td> */}
                        <td className="tw-whitespace-nowrap tw-px-3 tw-py-4 tw-text-sm tw-text-gray-500">
                          {withdrawal.withdrawalStatus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="tw-text-center tw-mt-16 tw-mb-24 tw-font-medium tw-text-2xl">
                  No withdrawals found
                </p>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${
            withdrawals.length > 0 ? 'tw-block' : 'tw-hidden'
          } tw-absolute tw-right-10 tw--bottom-12`}
        >
          <button
            type="button"
            onClick={downloadWithDrawalsReport}
            className="tw-block tw-rounded-md tw-bg-[#f48342] tw-px-3 tw-py-2 tw-text-center tw-text-sm tw-font-semibold tw-text-black tw-shadow-sm  focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
