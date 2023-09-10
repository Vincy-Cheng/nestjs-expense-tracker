import { useQuery } from '@tanstack/react-query';
import React, { useContext, useMemo, useState } from 'react';
import { fetchWallets } from '../apis/wallet';
import {
  IGroupByCategoryRecord,
  IRecordWithCategory,
  IWalletRecordWithCategory,
} from '../types';
import { useAppSelector } from '../hooks';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { GroupByScale } from '../common/group-scale.enum';
import { displayDate, formatDate } from '../common/format-date';

interface ProviderValue {
  wallets: IWalletRecordWithCategory[];
  favWallet: IWalletRecordWithCategory;
  income: number;
  expense: number;
  total: number;
  dateRecords: {
    date: string;
    records: IRecordWithCategory[];
  }[];
  groupByCategoryRecords: {
    date: string;
    records: IGroupByCategoryRecord | undefined;
  };
  incomeByDate: number;
  expenseByDate: number;
  groupBy: GroupByScale;
  updateGroupingScale: (value: GroupByScale, reset?: boolean) => void;
  updateCurrentDate: (type: 'plus' | 'minus') => void;
  test: () => void;
}

const RecordDataContext = React.createContext<any>({});

export const useRecord = () => {
  return useContext<ProviderValue>(RecordDataContext);
};

export const RecordDateProvider = ({ children }: any) => {
  const [groupBy, setGroupBy] = useState<GroupByScale>(GroupByScale.ALL);

  const [currentDate, setCurrentDate] = useState<number>(0);

  const { data: wallets } = useQuery<IWalletRecordWithCategory[]>(
    ['wallets'],
    fetchWallets,
  );

  const { id } = useAppSelector((state) => state.wallet);

  const dateGrouping = (scale: GroupByScale, value: IRecordWithCategory[]) => {
    let res;
    switch (scale) {
      case GroupByScale.ALL:
        res = _.toPairs({ ALL: value });
        break;
      case GroupByScale.MONTH:
        res = _.toPairs(
          _.groupBy(value, (r) => {
            return formatDate(r.date, GroupByScale.MONTH);
          }),
        );
        break;
      case GroupByScale.QUARTER:
        res = _.toPairs(
          _.groupBy(value, (r) => {
            return formatDate(r.date, GroupByScale.QUARTER);
          }),
        );
        break;
      case GroupByScale.WEEK:
        res = _.toPairs(
          _.groupBy(value, (r) => {
            return formatDate(r.date, GroupByScale.WEEK);
          }),
        );
        break;
      case GroupByScale.YEAR:
        res = _.toPairs(
          _.groupBy(value, (r) => {
            return formatDate(r.date, GroupByScale.YEAR);
          }),
        );
        break;
      default:
        res = _.toPairs(_.groupBy(value, 'date'));
        break;
    }

    return res;
  };

  const categoryGrouping = (value: [string, IRecordWithCategory[]][]) => {
    return value.map((groupRecord) => {
      const tmpGrouping = groupRecord[1]?.reduce(
        (acc: IGroupByCategoryRecord, cur) => {
          if (acc[cur.category.type][cur.category.name]) {
            acc[cur.category.type][cur.category.name].push(cur);
          } else {
            acc[cur.category.type][cur.category.name] = [cur];
          }

          return acc;
        },
        { expense: {}, income: {} } as IGroupByCategoryRecord,
      );

      return { date: groupRecord[0], records: tmpGrouping };
    });
  };

  const filterByScale = (
    value: {
      date: string;
      records: IGroupByCategoryRecord;
    }[],
    scale: GroupByScale,
    now: DateTime,
  ) => {
    let incomeByDate = 0;
    let expenseByDate = 0;
    const tmpFilter = value
      .filter(
        (gbcr) => gbcr.date === formatDate(now.toFormat('yyyy-LL-dd'), scale),
      )
      .map((t) => {
        Object.values(t.records?.expense ?? {}).forEach((exp) => {
          exp.forEach((e) => {
            expenseByDate += Number(e.price);
          });
        });

        Object.values(t.records?.income ?? {}).forEach((inc) => {
          inc.forEach((i) => {
            incomeByDate += Number(i.price);
          });
        });
        return { ...t, date: displayDate(t.date, scale) };
      });

    return { incomeByDate, expenseByDate, filteredResult: tmpFilter };
  };
  const { favWallet, income, expense, total, dateRecords } = useMemo(() => {
    let tmpWallet;
    if (wallets) {
      if (id === 0) {
        tmpWallet = wallets[0];
      } else {
        tmpWallet = wallets.find((w) => w.id === id);
      }
    }
    const walletExpense =
      tmpWallet?.records?.reduce((i, w) => {
        if (w.category.type === 'expense') {
          i -= Number(w.price);
        }
        return i;
      }, 0) ?? 0;
    const walletIncome =
      tmpWallet?.records?.reduce((i, w) => {
        if (w.category.type === 'income') {
          i += Number(w.price);
        }
        return i;
      }, 0) ?? 0;

    const groupedDates = _.groupBy(tmpWallet?.records, 'date');

    const dateRecords = _.sortBy(Object.keys(groupedDates)).map((date) => ({
      date,
      records: groupedDates[date],
    }));

    return {
      favWallet: tmpWallet,
      income: walletIncome,
      expense: walletExpense,
      total: walletExpense + walletIncome,
      dateRecords,
    };
  }, [id, wallets]);

  const groupByCategoryAndDateRecords = useMemo(() => {
    return dateGrouping(groupBy, favWallet?.records ?? []);
  }, [groupBy, favWallet]);

  const { groupByCategoryRecords, incomeByDate, expenseByDate } =
    useMemo(() => {
      const tmpGroupingByCategory = categoryGrouping(
        groupByCategoryAndDateRecords,
      );

      const now = DateTime.now().plus({
        year: groupBy === GroupByScale.YEAR ? currentDate : 0,
        quarter: groupBy === GroupByScale.QUARTER ? currentDate : 0,
        month: groupBy === GroupByScale.MONTH ? currentDate : 0,
        week: groupBy === GroupByScale.WEEK ? currentDate : 0,
        day: groupBy === GroupByScale.DATE ? currentDate : 0,
      });

      if (groupBy === GroupByScale.ALL) {
        return {
          incomeByDate: income,
          expenseByDate: expense,
          groupByCategoryRecords: tmpGroupingByCategory[0],
        };
      }
      const { incomeByDate, expenseByDate, filteredResult } = filterByScale(
        tmpGroupingByCategory,
        groupBy,
        now,
      );

      return {
        incomeByDate,
        expenseByDate,
        groupByCategoryRecords:
          filteredResult.length > 0
            ? filteredResult[0]
            : {
                date: displayDate(
                  formatDate(now.toFormat('yyyy-LL-dd'), groupBy),
                  groupBy,
                ),
                records: [],
              },
      };
    }, [groupByCategoryAndDateRecords, groupBy, currentDate]);

  const updateGroupingScale = (value: GroupByScale, reset?: boolean) => {
    if (reset) {
      setCurrentDate(0);
    }
    setGroupBy(value);
  };

  const updateCurrentDate = (type: 'plus' | 'minus') => {
    setCurrentDate((prev) => (type === 'plus' ? prev + 1 : prev - 1));
  };

  const test = () => {
    const now = DateTime.now();
    const a = dateGrouping(GroupByScale.MONTH, favWallet?.records ?? []);

    const b = categoryGrouping(a);

    let incomeByDate = 0;
    let expenseByDate = 0;
    const tmpFilter = b
      .filter(
        // date = 202309
        (gbcr) => DateTime.fromFormat(gbcr.date, 'yyyyLL').year === now.year,
      )
      .map((t) => {
        Object.values(t.records?.expense ?? {}).forEach((exp) => {
          exp.forEach((e) => {
            expenseByDate += Number(e.price);
          });
        });

        Object.values(t.records?.income ?? {}).forEach((inc) => {
          inc.forEach((i) => {
            incomeByDate += Number(i.price);
          });
        });
        return t;
        // return { ...t, date: displayDate(t.date, scale) };
      });

    console.log(tmpFilter);
  };

  return (
    <RecordDataContext.Provider
      value={{
        wallets,
        favWallet,
        income,
        expense,
        total,
        dateRecords,
        groupByCategoryRecords,
        groupBy,
        incomeByDate,
        expenseByDate,
        updateGroupingScale,
        updateCurrentDate,
        test,
      }}
    >
      {children}
    </RecordDataContext.Provider>
  );
};
