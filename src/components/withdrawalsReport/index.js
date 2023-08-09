import { apiClient } from '@/api/client';
import { useEffect, useState } from 'react';
import WithdrawDropdown from './Dropdown';
import ValueInput from './valueInput';
import 'tailwindcss/tailwind.css';

const withdrawalsrReport = [
  {
    date: '05/21/2023 @ 1:50pm',
    withdrawal: '$60.00',
    transferFee: '$6.00',
    receivedPayment: '$54.00',
    availableAfterTransfer: '$40.00',
    status: 'Pending',
  },
  {
    date: '05/21/2023 @ 1:50pm',
    withdrawal: '$60.00',
    transferFee: '$6.00',
    receivedPayment: '$54.00',
    availableAfterTransfer: '$40.00',
    status: 'Pending',
  },
  {
    date: '05/21/2023 @ 1:50pm',
    withdrawal: '$60.00',
    transferFee: '$6.00',
    receivedPayment: '$54.00',
    availableAfterTransfer: '$40.00',
    status: 'Pending',
  },
];

export default function Withdrawals() {
  const [withdrawals, setWithdrawals] = useState();
  const [availableBalance, setavailableBalance] = useState();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transferAmount, setTransferAmount] = useState();

  const getAllwithdrawals = async () => {
    let url = `/financial/logged-instructor-withdrawals`;
    try {
      const response = await apiClient.get(url);
      setWithdrawals(response.data);
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

  useEffect(() => {
    getAllwithdrawals();
    getAvailableBalance();
  }, []);

  return (
    <div className="px-20 sm:px-6 lg:px-16">
      <div className="border relative p-6 my-16 rounded-3xl ">
        <div className="flex space-x-20 mt-4 justify-center items-center mx-auto">
          <p className="text-lg font-medium text-gray-700">
            Amount available for withdrawal
          </p>
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            $100
          </h1>
        </div>
        <div className="flex mt-4 space-x-5 justify-center items-center">
          <WithdrawDropdown setPaymentMethod={setPaymentMethod} />
          <div>
            <ValueInput
              paymentMethod={paymentMethod}
              setTransferAmount={setTransferAmount}
            />
          </div>
          <div className="">
            <button
              disabled={transferAmount > 0 ? false : true}
              type="button"
              onClick={confirmTransfer}
              className="block rounded-md  bg-[#f48342] px-3 py-2 text-center text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Transfer
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Withdrawal
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Transfer fee
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Received Payment
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Available after transfer
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {withdrawalsrReport.map((withdrawal) => (
                    <tr key={withdrawal.status} className="even:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {withdrawal.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {withdrawal.withdrawal}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {withdrawal.transferFee}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {withdrawal.receivedPayment}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {withdrawal.availableAfterTransfer}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {withdrawal.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="absolute right-10 -bottom-12">
          <button
            type="button"
            onClick={downloadWithDrawalsReport}
            className="block rounded-md  bg-[#f48342] px-3 py-2 text-center text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
