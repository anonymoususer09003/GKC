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

export const bar1 = {
  // maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'No of Students by Age Group',
    },
  },
};
export const bar2 = {
  // maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'No of Daily Classes',
    },
  },
};
export const bar3 = {
  // maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'No of Instructors',
    },
  },
};
export const bar4 = {
  // maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'No of Complaints',
    },
  },
};

export function VisitorsCharts({
  studentsCountData,
  instructorsCountData,
  classesCountData,
  complaintsCountData,
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

  const studentsCount = generateData(studentsCountData);
  const instructorsCount = generateData(instructorsCountData);
  const classesCount = generateData(classesCountData);
  const complaintsCount = generateData(complaintsCountData);

  return (
    <div className="tw-cst-pf tw-flex tw-space-x-4 tw-p-2">
      <div className="tw-max-h-[40vh]">
        <Line options={bar1} data={studentsCount} />
        <Line options={bar2} data={classesCount} />
      </div>
      <div className="tw-cst-pf tw-h-full tw-max-h-[40vh]">
        <Line options={bar3} data={instructorsCount} />
        <Line options={bar4} data={complaintsCount} />
      </div>
    </div>
  );
}
