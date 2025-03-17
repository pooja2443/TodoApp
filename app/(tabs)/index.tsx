import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/Redux/Store/store';
import AppNavigator  from '@/Navigation/AppNavigator' 


export default function Navigator() {
  return (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
  );
}