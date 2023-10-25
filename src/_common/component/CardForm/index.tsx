import classNames from 'classnames';
import React from 'react';

interface CardFormProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

function CardForm({ children, title, className }: CardFormProps) {
  const classContainer = classNames('w-full', className);
  return (
    <div className={classContainer}>
      <h3 className="p-2.5 rounded-[3px] border-l-2 border-[#1C64F2] bg-gray-200 text-sm text-gray-900 font-bold mb-5 uppercase">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default CardForm;
