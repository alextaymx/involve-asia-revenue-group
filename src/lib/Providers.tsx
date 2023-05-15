'use client';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<div></div>} persistor={persistor}>
        {children}
      </PersistGate>

      <Toaster />
    </ReduxProvider>
  );
}
