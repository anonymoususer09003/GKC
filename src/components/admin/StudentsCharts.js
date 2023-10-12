import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      display: false,
    },
    title: {
      display: true,
      text: 'Expense (Daily)',
    },
  },
};
export const bar4 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Expense (Weekly)',
    },
  },
};
export const bar5 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'No. of Complaints',
    },
  },
};

function dailyClassesChartData(dataArr) {
  const uniqueDates = new Set();
  const groupedData = dataArr.reduce((result, item) => {
    const existingData = result.find((group) => group.label === item.label);
    if (existingData) {
      existingData.data.push({ x: item.x, y: item.y });
    } else {
      result.push({
        label: item.label,
        data: [{ x: item.x, y: item.y }],
        borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        }, 0.5)`,
      });
    }
    uniqueDates.add(item.x);
    return result;
  }, []);
  const sortedUniqueDates = Array.from(uniqueDates).sort();
  const chartData = {
    labels: sortedUniqueDates,
    datasets: groupedData,
  };
  return chartData;
}

function generateDailyClassesData(dataArr) {
  return dailyClassesChartData(
    dataArr.flatMap((item) =>
      item.classData.map((data) => ({
        x: new Date(data.date).toLocaleDateString(),
        y: data.count,
        label: item.className,
      }))
    )
  );
}

export function StudentsCharts({
  classesByCourses,
  dailyExpenses,
  weekyExpenses,
  complaintsCount,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  const filteredDataTest1 = [
    {
      className: 'Course 1',
      classData: [
        {
          date: '2021-12-28T20:16:07.692Z',
          count: 10,
        },
        {
          date: '2023-09-25T20:16:07.692Z',
          count: 5,
        },
        {
          date: '2023-08-13T20:16:07.692Z',
          count: 5,
        },
      ],
    },
    {
      className: 'Course 2',
      classData: [
        {
          date: '2023-12-15T20:16:07.692Z',
          count: 22,
        },
        {
          date: '2023-08-13T20:16:07.692Z',
          count: 5,
        },
      ],
    },
    {
      className: 'Course 2',
      classData: [
        {
          date: '2023-09-10T20:16:07.692Z',
          count: 10,
        },
      ],
    },
    {
      className: 'Course 3',
      classData: [
        {
          date: '2023-09-22T20:16:07.692Z',
          count: 15,
        },
      ],
    },
    {
      className: 'Course 3',
      classData: [
        {
          date: '2023-09-10T20:16:07.692Z',
          count: 20,
        },
      ],
    },
  ];
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

  const classesByCoursesData = generateDailyClassesData(classesByCourses);
  const dailyExpensesData = generateData(dailyExpenses);
  const weekyExpensesData = generateData(weekyExpenses);
  const complaintsCountData = generateData(complaintsCount);

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
        {/* <Bar options={bar1} data={data} /> */}
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
        <Line options={bar2} data={classesByCoursesData} />
      </div>
      <div>
        <Line options={bar3} data={dailyExpensesData} />
      </div>
      <div>
        <Line options={bar4} data={weekyExpensesData} />
      </div>
      <div>
        <Line options={bar5} data={complaintsCountData} />
      </div>
    </>
  );
}
