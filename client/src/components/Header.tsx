import React from 'react';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="">
      <div className="text-center font-Barlow text-primary-500 text-4xl">
        Expense Tracker
      </div>
      <div>{/* Tabs */}</div>
    </div>
  );
};

export default Header;
