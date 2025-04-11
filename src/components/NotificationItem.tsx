import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback } from '@/components/ui/avatar';

interface NotificationItemProps {
  name: string;
  message: string;
  date: string;
}

const NotificationItem = ({ name, message, date }: NotificationItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50  bg-white">
      <div className="flex items-center space-x-3">

        <Avatar className="h-10 w-10 bg-gray-200">
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{name}</span>
          <span className="text-sm text-gray-500">{message}</span>
        </div>
      </div>
      <span className="text-sm text-gray-500">{date}</span>
    </div>
  );
};

export default NotificationItem;
