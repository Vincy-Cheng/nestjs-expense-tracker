import clsx from 'clsx';
import { AlertTriangle, Check, CircleX, InfoCircle } from 'tabler-icons-react';

type CustomAlertType = 'warning' | 'success' | 'error' | 'info';

type CustomAlertProps = {
  type: CustomAlertType;
  content: string;
};

const CustomAlert = ({ type, content }: CustomAlertProps) => {
  const icon = (value: CustomAlertType) => {
    switch (value) {
      case 'error':
        return <CircleX />;
      case 'warning':
        return <AlertTriangle />;
      case 'success':
        return <Check />;
      case 'info':
        return <InfoCircle />;
    }
  };

  return (
    <div
      className={clsx(
        'p-2 rounded-sm flex gap-2 text-emerald-500 bg-emerald-100 items-center',
        type === 'error'
          ? 'text-red-500 bg-red-100'
          : type === 'warning'
          ? 'text-amber-500 bg-amber-100'
          : type === 'success'
          ? 'text-emerald-500 bg-emerald-100'
          : 'text-secondary-400 bg-secondary-100',
      )}
    >
      {icon(type)}
      <p className="flex-1">{content}</p>
    </div>
  );
};

export default CustomAlert;
