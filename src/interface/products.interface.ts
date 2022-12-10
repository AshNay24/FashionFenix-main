export interface IProducts {
  productId: string;
  title: string;
  description: string;
  price: number;
  state: string;
  urlImage: string;
  userId: string;
}
export interface ICreateProduc extends IFormInputProduct {
  image?: string;
}
export interface IProductstate {
  products: IProducts[];
}

export interface IFormInputProduct {
  title: string;
  description: string;
  price: number;
  state: IstateProduct;
}

interface IstateProduct {
  new: boolean;
  semiNew: boolean;
  used: boolean;
}
