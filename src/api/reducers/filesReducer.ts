// const initialState = {
//   files:[{
//   id: '',
// userId: '',
// public_id: '',
// secure_url: '',
// title: '',
// createdAt: new Date(),
// updatedAt: new Date(),
// }]
// };

import { IAction } from '../../interface/actions';
import { IProductstate } from '../../interface/products.interface';
import { types } from '../types/types';
import { productCases } from './product-cases';

export const fileReducer = (
  state: IProductstate,
  action: IAction,
): IProductstate => {
  switch (action.type) {
    case types.getFiles:
      return productCases.getProducts(state, action);

    case types.addNewProduct:
      return productCases.addNewProduct(state, action);
    default:
      return state;
  }
};
