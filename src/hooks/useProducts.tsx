import { useContext } from 'react';

import { ProductsContext } from '../context/ProductsContext';

export const useProducts = () => {
  const {
    products,
    findOneProduct,
    getProducts,
    resetProducs,
    createProduct,
    editProduct,
  } = useContext(ProductsContext);

  return {
    editProduct,
    createProduct,
    products,
    findOneProduct,
    getProducts,
    resetProducs,
  };
};
