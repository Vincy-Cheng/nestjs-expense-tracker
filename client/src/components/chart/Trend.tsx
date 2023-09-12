import { useRecord } from '../../provider/RecordDataProvider';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useState } from 'react';
import CategorySelector from '../record/CategorySelector';
import * as _ from 'lodash';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { DateTime } from 'luxon';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Annotation from 'chartjs-plugin-annotation';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../apis/category';
import { ICategory } from '../../types';
import CustomSelector from '../Custom/CustomSelector';

type Props = {};

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  Annotation,
);
const Trend = (props: Props) => {
  const [categoryType, setCategoryType] = useState<
    'expense' | 'income' | 'all'
  >('expense');

  const [category, setCategory] = useState<ICategory>();

  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const [currentYear, setCurrentYear] = useState<number>(0);

  const { data: categories } = useQuery<ICategory[]>(
    ['categories'],
    fetchCategories,
  );

  const { filterForTrend } = useRecord();

  const value = filterForTrend(currentYear, category);

  const total = value.reduce((year, cur) => {
    const v =
      categoryType === 'all'
        ? Number(cur.expense + cur.income)
        : Number(cur[categoryType]);
    return year + v;
  }, 0);

  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      datalabels: {
        color: 'white',
        display: chartType === 'bar',
      },
      annotation: {
        annotations: {
          avgLine: {
            type: 'line',
            scaleID: 'y',
            value: total / value.length,
            borderColor: '#60B6C3',
            borderDash: [10, 5], // length, gap
            borderWidth: 2,
            label: {
              display: false,
              drawTime: 'afterDatasetsDraw',
              content: `Average: ${(total / value.length).toFixed(2)}`,
            },
            enter({ element }, event) {
              element.label!.options.display = true;
              return true; // force update
            },
            leave({ element }, event) {
              element.label!.options.display = false;
              return true;
            },
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          sampleSize: 2,
        },
        beginAtZero: true,
      },
    },
  };

  const labels = value.map((year) => year.date);
  const data: ChartData = {
    labels,
    datasets: [
      {
        data: value.map((year) =>
          categoryType === 'all'
            ? Number((year.expense + year.income).toFixed(2))
            : Number(year[categoryType].toFixed(2)),
        ),
        borderColor:
          categoryType === 'expense'
            ? '#fecdd3'
            : categoryType === 'income'
            ? '#DEF0F2'
            : '#b9e1c2',
        backgroundColor:
          categoryType === 'expense'
            ? '#fecdd3'
            : categoryType === 'income'
            ? '#DEF0F2'
            : '#b9e1c2',
        hoverBackgroundColor:
          categoryType === 'expense'
            ? '#fb7185'
            : categoryType === 'income'
            ? '#9FD3DB'
            : '#8acb9b',
      },
    ],
  };
  return (
    <div>
      <div className="flex justify-between py-2">
        <div
          className=" text-white bg-info-300 rounded-full p-1 hover:bg-info-200 active:bg-info-100 cursor-pointer"
          onClick={() => {
            setCurrentYear((prev) => prev - 1);
          }}
        >
          <FiChevronLeft className="" />
        </div>
        <div>{DateTime.now().plus({ year: currentYear }).year}</div>
        <div
          className=" right-0 text-white bg-info-300 rounded-full p-1 hover:bg-info-200 active:bg-info-100 cursor-pointer"
          onClick={() => {
            setCurrentYear((prev) => prev + 1);
          }}
        >
          <FiChevronRight className="" />
        </div>
      </div>

      <div>
        <CategorySelector
          options={['income', 'expense', 'all']}
          value={categoryType}
          toggle={(type) => {
            setCategoryType(type as 'expense' | 'income' | 'all');
          }}
        />
      </div>

      <div className="py-2 flex gap-2 items-end">
        <CategorySelector
          color={{ selected: '#C0E2E7', background: '#DEF0F2' }}
          options={['bar', 'line']}
          value={chartType}
          toggle={(type) => {
            setChartType(type as 'bar' | 'line');
          }}
        />

        <CustomSelector
          title={'Category'}
          options={
            categories
              ?.filter((cat) => cat.type === categoryType)
              .map((cat) => cat.name) ?? []
          }
          value={category?.name}
          callbackAction={(value: string) => {
            const targetCategory = categories?.find(
              (cat) => cat.name === value,
            );

            if (targetCategory) {
              setCategory(targetCategory);
            }
          }}
        />
      </div>

      {chartType === 'bar' ? (
        <Bar
          options={options as ChartOptions<'bar'>}
          data={data as ChartData<'bar'>}
        />
      ) : (
        <Line
          options={options as ChartOptions<'line'>}
          data={data as ChartData<'line'>}
        />
      )}
    </div>
  );
};

export default Trend;
