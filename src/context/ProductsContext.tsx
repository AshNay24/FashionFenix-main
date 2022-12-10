/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createContext } from 'react';

import { ICreateProduc, IProducts } from '../interface/products.interface';

interface IProductsState {
  products: IProducts[];
  getProducts: () => void;
  resetProducs: () => void;
  editProduct: (product: IProducts) => void;
  findOneProduct: (id: string) => IProducts | undefined;
  createProduct: (
    product: ICreateProduc,
    cb: (message: any) => void,
  ) => Promise<void> | undefined;
}

export const ProductsContext = createContext({} as IProductsState);
