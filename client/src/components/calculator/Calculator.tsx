import clsx from 'clsx';

type CalculatorProps = {
  callback: (value: string) => void;
};

const Calculator = ({ callback }: CalculatorProps) => {
  const keyboardKey = [
    ['AC', 'DE', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-2  rounded-md p-2">
        {keyboardKey.flat().map((key, index) => (
          <button
            key={index}
            className={clsx('bg-info-100 rounded-md py-2', {
              'col-span-2': key === 'AC' || key === '=',
            })}
            onClick={() => {
              callback(key);
            }}
            type="button"
          >
            {key === '*' ? 'x' : key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
