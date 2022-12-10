import React, { useEffect } from 'react';

import { useProducts } from './hooks/useProducts';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  const { getProducts } = useProducts();
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
