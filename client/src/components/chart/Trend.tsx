import { useRecord } from '../../provider/RecordDataProvider';
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
import { ECategoryType } from '../../common/category-type';
import { useState } from 'react';
import CategorySelector from '../record/CategorySelector';
import * as _ from 'lodash';

type Props = {};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
const Trend = (props: Props) => {
  const [categoryType, setCategoryType] = useState<ECategoryType>(
    ECategoryType.EXPENSE,
  );
  const { groupByCategoryRecords, test } = useRecord();

  test();
  //  const groupByYear = _.groupBy(groupByCategoryRecords,(value)=>{
  //   return
  //  })
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [20],
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };
  return (
    <div>
      <div>
        <CategorySelector
          categoryType={categoryType}
          toggle={(type) => {
            setCategoryType(type);
          }}
        />
      </div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Trend;
