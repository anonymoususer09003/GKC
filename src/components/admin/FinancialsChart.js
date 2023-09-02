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
      text: 'Gross Revenue',
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
      text: 'Total Payout',
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
      text: 'Net Revenue',
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
      text: 'Paypal Payout',
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
      text: 'Payoneer Payout',
    },
  },
};
export const bar6 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Bank Transfer Payout',
    },
  },
};
export const bar7 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Tax Tracking',
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

export function FinancialsChart() {
  return (
    <div className="tw-divide-y tw-w-full tw-h-full tw-divide-gray-200 tw-overflow-hidden tw-rounded-lg tw-py-2  tw-shadow sm:tw-grid sm:tw-grid-cols-3 tw-gap-2 sm:tw-divide-y-0">
      <div>
        <Bar options={bar1} data={data} />
      </div>
      <div>
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
      <div>
        <Bar options={bar6} data={data} />
      </div>
      <div className="tw-col-start-2">
        <Bar options={bar7} data={data} />
      </div>
    </div>
  );
}
