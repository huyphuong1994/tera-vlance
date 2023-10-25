import React from 'react';
import { Button, Drawer } from 'tera-dls';

interface FilterProps {
  open: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onFilter?: () => void;
  children?: React.ReactNode;
  title?: string;
}

function Filter({
  open,
  onClose,
  onCancel,
  onFilter,
  children,
  title = 'Lọc',
}: FilterProps) {
  return (
    <Drawer open={open} onClose={onClose}>
      <div className="flex flex-col gap-y-2.5 h-full max-h-screen">
        <p className="text-xl font-medium pb-2.5 border-b border-gray-300">
          {title}
        </p>
        <div className="flex-1">{children}</div>
        <div className="flex justify-end gap-x-2 pt-2.5 border-t border-gray-300">
          <Button type="alternative" onClick={onCancel}>
            Hủy
          </Button>
          <Button onClick={onFilter}>Lọc</Button>
        </div>
      </div>
    </Drawer>
  );
}

export default Filter;
