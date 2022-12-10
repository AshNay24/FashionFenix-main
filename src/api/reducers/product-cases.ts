import { IAction } from '../../interface/actions';
import { IProductstate } from '../../interface/products.interface';

const getProducts = (state: IProductstate, action: IAction): IProductstate => ({
  ...state,
  products: action.payload,
});

const addNewProduct = (state: IProductstate, action: IAction) => ({
  ...state,
  products: [...state.products, action.payload],
});
export const productCases = {
  getProducts,
  addNewProduct,
};
