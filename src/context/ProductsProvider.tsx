/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable n/no-callback-literal */
import { child, onValue, push, ref, set, update } from 'firebase/database';
import React, { useReducer } from 'react';

import { fileReducer } from '../api/reducers/filesReducer';
import { types } from '../api/types/types';
import { useAuthContext } from '../hooks/useAuthContext';
import {
  ICreateProduc,
  IProducts,
  IProductstate,
} from '../interface/products.interface';
import { firebaseDB } from '../libs/firebase-config';
import { ProductsContext } from './ProductsContext';

const INITIAL_STATE: IProductstate = {
  products: [],
};

export const ProductProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [state, dispatch] = useReducer(fileReducer, INITIAL_STATE);
  const { uid } = useAuthContext();

  const getProducts = () => {
    const db = firebaseDB;
    let products: IProducts[] = [];
    const productsOnDb = ref(db, '/products');
    onValue(productsOnDb, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        products = data;
        dispatch({ type: types.getFiles, payload: Object.values(data) });
      }
    });

    console.log(products);
  };

  const findOneProduct = (id: string) => {
    const product = state.products.find((product) => product.productId === id);
    if (product !== undefined) {
      return product;
    }
  };

  const createProduct = async (
    product: ICreateProduc,
    cb: (message: any) => void,
  ) => {
    try {
      const db = firebaseDB;
      const newPostKey = push(child(ref(db), 'products')).key;
      set(ref(db, `products/${newPostKey}`), {
        userId: uid,
        ...product,
        productId: newPostKey,
        state: product.state.new ?? product.state.semiNew ?? product.state.used,
      });
      // dispatch({ type: types.addNewProduct, payload });
    } catch (error) {
      console.log(error);
      cb('No se pudo crear el producto');
    }
  };

  const resetProducs = () => {
    dispatch({ type: types.resetFiles, payload: '' });
  };

  const editProduct = (product: IProducts) => {
    const db = firebaseDB;

    update(ref(db, `products/${product.productId}`), product);
  };
  return (
    <ProductsContext.Provider
      value={{
        ...state,
        getProducts,
        resetProducs,
        findOneProduct,
        createProduct,
        editProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
