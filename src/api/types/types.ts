interface ITypes {
  authFinishChecking: string;
  authStartLogin: string;
  authLogin: string;
  authStartregister: string;
  authStartTokenRenew: string;
  authLogout: string;
  getFiles: string;
  resetFiles: string;
  addNewProduct: string;
}

export const types: ITypes = {
  authFinishChecking: '[AUTH] Finish Checking Login State',
  authStartLogin: '[AUTH] Start Login',
  authLogin: '[AUTH] Logged',
  authStartregister: '[AUTH] Start Register',
  authStartTokenRenew: '[AUTH] Start Token Renew',
  authLogout: '[AUTH] Auth Logout',

  getFiles: '[FILES] get files',
  resetFiles: '[FILES]reset files',
  addNewProduct: '[product] add new product',
};
