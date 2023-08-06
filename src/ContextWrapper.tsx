import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './app/store';

const queryClient = new QueryClient();

function ContextWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'rgb(63, 114, 175)',
            },
          }}
        >
          <BrowserRouter>{children}</BrowserRouter>
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default ContextWrapper;
