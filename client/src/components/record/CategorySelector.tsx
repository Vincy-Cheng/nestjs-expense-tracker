import { ECategoryType } from '../../common/category-type';
import clsx from 'clsx';

type CategorySelectorProps = {
  categoryType: ECategoryType;
  toggle: (type: ECategoryType) => void;
};

const CategorySelector = ({ categoryType, toggle }: CategorySelectorProps) => {
  return (
    <div className="grid grid-cols-2 text-center w-full bg-primary-100 rounded-md p-2 relative shadow">
      <div
        className={clsx(
          'absolute bg-primary-200 w-1/2 h-full rounded-md shadow transition-all',
          { 'translate-x-full': categoryType === ECategoryType.INCOME },
        )}
      ></div>
      <div
        className="z-10 cursor-pointer"
        onClick={() => {
          toggle(ECategoryType.EXPENSE);
        }}
      >
        {ECategoryType.EXPENSE}
      </div>
      <div
        className="z-10 cursor-pointer"
        onClick={() => {
          toggle(ECategoryType.INCOME);
        }}
      >
        {ECategoryType.INCOME}
      </div>
    </div>
  );
};

export default CategorySelector;
