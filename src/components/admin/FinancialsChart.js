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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const bar1 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Gross Revenue',
    },
  },
};
const bar2 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Total Payout',
    },
  },
};
const bar3 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Net Revenue',
    },
  },
};
const bar4 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Paypal Payout',
    },
  },
};
const bar5 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Payoneer Payout',
    },
  },
};
const bar6 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Bank Transfer Payout',
    },
  },
};
const bar7 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Tax Tracking',
    },
  },
};

export function FinancialsChart({
  grossRevenue,
  netRevenue,
  totalPayout,
  taxTracking,
}) {
  function generateChartData(dataArr) {
    const chartData = {
      labels: dataArr.map((item) => item.x),
      datasets: [
        {
          data: dataArr.map((item) => item.y),
          borderColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    return chartData;
  }

  function generateData(dataArr) {
    return generateChartData(
      dataArr.map((item) => ({
        x: new Date(item.date).toLocaleDateString(),
        y: item.count,
      }))
    );
  }

  const grossRevenueData = generateData(grossRevenue);
  const netRevenueData = generateData(netRevenue);
  const totalPayoutData = generateData(totalPayout);
  const taxTrackingData = generateData(taxTracking);

  return (
    <div className="tw-divide-y tw-w-full tw-h-full tw-divide-gray-200 tw-overflow-hidden tw-rounded-lg tw-py-2  tw-shadow sm:tw-grid sm:tw-grid-cols-3 tw-gap-2 sm:tw-divide-y-0">
      <div>
        <Line options={bar1} data={grossRevenueData} />
      </div>
      <div>
        <Line options={bar2} data={totalPayoutData} />
      </div>
      <div>
        <Line options={bar3} data={netRevenueData} />
      </div>
      <div>
        <Line options={bar4} data={totalPayoutData} />
      </div>
      <div className="tw-col-start-2">
        <Line options={bar7} data={taxTrackingData} />
      </div>
    </div>
  );
}
