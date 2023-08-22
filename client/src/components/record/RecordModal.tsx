import React, { useEffect, useState } from 'react';
import CustomModal from '../Custom/CustomModal';
import { IRecord, IWallet } from '../../types';
import Calculator from '../calculator/Calculator';
import { evaluate } from 'mathjs';

type RecordModalProps = {
  wallet: IWallet | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editRecord: IRecord;
  setEditRecord: React.Dispatch<React.SetStateAction<IRecord>>;
};

const RecordModal = ({
  wallet,
  setOpen,
  editRecord,
  setEditRecord,
}: RecordModalProps) => {
  const [value, setValue] = useState<string>('');
  const updateCalc = (key: string) => {
    console.log(key);
    if (key === '=') {
      return setValue((prev) => {
        try {
          return evaluate(prev).toString();
        } catch (error) {
          return prev;
        }
      });
    }
    if (key === 'AC') {
      return setValue('');
    }

    if (key === 'DE') {
      try {
        return setValue((prev) => prev.slice(0, -1));
      } catch (error) {
        return setValue('Error');
      }
    }

    setValue((prev) => prev.concat(key));
  };

  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      const reg = /\d|\/|\*|-\+|\./g;

      if (event.key === 'Backspace') {
        return updateCalc('DE');
      }

      if (event.key === 'Enter') {
        return updateCalc('=');
      }
      if (reg.test(event.key)) {
        return updateCalc(event.key);
      }
    };

    window.addEventListener('keydown', keyListener);
    if (!isNaN(Number(value))) {
      setEditRecord((prev) => {
        return { ...prev, price: Number(value) };
      });
    }

    return () => {
      window.removeEventListener('keydown', keyListener);
    };
  }, [value]);

  return (
    <CustomModal setOpen={setOpen} size="Medium">
      <form>
        New Expense
        <div>Remarks</div>
        <div className="bg-zinc-50 rounded-md p-2">
          <div className="border border-info-300 text-lg rounded-md p-1 text-right truncate overflow-auto mb-2">
            {/* <span>{wallet && wallet.currency}</span> */}
            <span>{value.length > 0 ? value : 0}</span>
          </div>
          {/* Calculator */}
          <Calculator
            callback={(key) => {
              updateCalc(key);
            }}
          />
        </div>
        <div>{/* Submit button and choose continue or close */}</div>
      </form>
    </CustomModal>
  );
};

export default RecordModal;
