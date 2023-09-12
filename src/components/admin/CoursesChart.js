import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 5,
      },
    },
    x: {
      ticks: {
        maxRotation: 90,
        minRotation: 90,
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'No of Daily Classes',
    },
  },
};

export function CourseChart({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  getFilterData,
  filteredData,
}) {
  const filteredDataTest = [
    {
      date: '2023-09-08T16:57:58.019Z',
      count: 10,
    },
    {
      date: '2023-09-08T16:57:58.019Z',
      count: 5,
    },
    {
      date: '2023-09-08T16:57:58.019Z',
      count: 30,
    },
    {
      date: '2023-09-08T16:57:58.019Z',
      count: 20,
    },
    {
      date: '2023-09-08T16:57:58.019Z',
      count: 70,
    },
  ];

  const chartData = filteredDataTest.map((item) => ({
    x: new Date(item.date).toLocaleDateString(),
    y: item.count,
  }));

  const labels = chartData.map((item) => item.x);
  const data = {
    labels,
    datasets: [
      {
        label: 'Count',
        data: chartData.map((item) => item.y),
        borderColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <>
      <div className="tw-flex tw-w-[50%] tw-mx-auto tw-justify-around">
        <div className="tw-relative ">
          <DatePicker
            placeholderText="Select start date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <AiOutlineCalendar className="tw-absolute tw-right-1 tw-top-3 tw-h-5 tw-w-5" />
        </div>
        <div className="tw-relative ">
          <DatePicker
            placeholderText="Select end date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
          <AiOutlineCalendar className="tw-absolute tw-right-1 tw-top-3 tw-h-5 tw-w-5" />
        </div>
        <button
          onClick={getFilterData}
          type="button"
          className="tw-block tw-w-28  !tw-bg-[#f48342] tw-rounded-md  tw-px-3 tw-py-1.5 tw-text-center tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
        >
          Search
        </button>
      </div>
      <Line options={options} data={data} />
    </>
  );
}
