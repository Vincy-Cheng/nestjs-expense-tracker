import { useState } from 'react';
import PieChart from '../components/chart/PieChart';
import clsx from 'clsx';

type Props = {};

const Chart = (props: Props) => {
  const [chartType, setChartType] = useState<'Pie Chart' | 'Trend'>(
    'Pie Chart',
  );
  return (
    <div>
      <div className="flex pb-2">
        <div
          className={clsx(
            'px-2 hover:bg-info-100 cursor-pointer rounded-t-md active:bg-info-50',
            { 'bg-info-200': chartType === 'Pie Chart' },
          )}
          onClick={() => {
            setChartType('Pie Chart');
          }}
        >
          Pie Chart
        </div>
        <div
          className={clsx(
            'px-2 hover:bg-info-100 cursor-pointer rounded-t-md active:bg-info-50',
            { 'bg-info-200': chartType === 'Trend' },
          )}
          onClick={() => {
            setChartType('Trend');
          }}
        >
          Trend
        </div>
      </div>
      {chartType === 'Pie Chart' ? <PieChart /> : <div>Trend</div>}
    </div>
  );
};

export default Chart;
