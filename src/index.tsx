import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationContainer } from 'react-notifications';
import { TeraProvider } from 'tera-dls';
import MediaQueryProvider from '_common/component/MediaQueryProvider';

import 'tera-dls/lib/css/main.css';
import './styles/main.scss';
import './styles/base/_fonts.scss';
// import 'flowbite/dist/flowbite';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

const queryClient = new QueryClient();
root.render(
  <DndProvider backend={HTML5Backend}>
    <QueryClientProvider client={queryClient}>
      <MediaQueryProvider>
        <TeraProvider>
          <App />
          <NotificationContainer />
        </TeraProvider>
      </MediaQueryProvider>
    </QueryClientProvider>
  </DndProvider>,
);
