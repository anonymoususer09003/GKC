import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const bar1 = {
  responsive: true,
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
export const bar2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'No of Daily Classes by Course',
    },
  },
};
export const bar3 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Revenue (Daily)',
    },
  },
};
export const bar4 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Payments (Weekly)',
    },
  },
};
export const bar5 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'No. of Complaints',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function InstructorsCharts() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <>
      <div>
        <div className="tw-relative tw-mb-3 tw-mx-auto tw-w-24">
          <DatePicker
            placeholderText="Select start date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <AiOutlineCalendar className="tw-absolute tw--right-24 tw-top-3 tw-h-5 tw-w-5" />
        </div>
        <Bar options={bar1} data={data} />
      </div>
      <div>
        <div className="tw-relative tw-mb-3 tw-w-16">
          <DatePicker
            placeholderText="Select end date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
          <AiOutlineCalendar className="tw-absolute tw--right-32 tw-top-3 tw-h-5 tw-w-5" />
        </div>
        <Bar options={bar2} data={data} />
      </div>
      <div>
        <Bar options={bar3} data={data} />
      </div>
      <div>
        <Bar options={bar4} data={data} />
      </div>
      <div>
        <Bar options={bar5} data={data} />
      </div>
    </>
  );
}
