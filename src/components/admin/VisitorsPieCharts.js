import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const pie1 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Age Group',
    },
  },
};
export const pie2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Skill Level',
    },
  },
};
export const pie3 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Delivery Mode',
    },
  },
};
export const pie4 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Languages',
    },
  },
};

export function VisitorsPieCharts({
  ageGroupData,
  skillLevelData,
  deliveryModeData,
  languageData,
}) {
  function generateChartData(dataArr) {
    const chartData = {
      labels: dataArr.map((item) => item.groupingFilterName),
      datasets: [
        {
          data: dataArr.map((item) => item.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return chartData;
  }

  const studentsCount = generateChartData(ageGroupData);
  const skillLevelCount = generateChartData(skillLevelData);
  const deliveryModeDataCount = generateChartData(deliveryModeData);
  const languageCount = generateChartData(languageData);

  return (
    <div className="tw-cst-pf tw-flex">
      <div>
        <Pie options={pie1} data={studentsCount} />
        <Pie options={pie3} data={deliveryModeDataCount} />
      </div>
      <div>
        <Pie options={pie2} data={skillLevelCount} />
        <Pie options={pie4} data={languageCount} />
      </div>
    </div>
  );
}