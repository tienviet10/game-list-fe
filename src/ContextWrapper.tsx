import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { store } from './app/store';

function ContextWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'rgb(63, 114, 175)',
          },
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}

export default ContextWrapper;
