import React from 'react';
import { RouterProvider } from "react-router-dom";
import { Routes } from './Routes';
import { Provider } from 'react-redux'; // Import Provider for Redux
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import store, { persistor } from './Redux/store';

function App() {
  return (
<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={Routes} />
      </PersistGate>
    </Provider>  );
}

export default App;
