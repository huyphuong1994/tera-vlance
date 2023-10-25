import React from 'react';

export interface IRouteProps {
  key: string;
  path: string;
  component?: React.ReactNode | null;
}

export interface IMiddleRouterProps {
  children: any;
}
