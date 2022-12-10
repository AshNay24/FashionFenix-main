export interface ILoggin {
  email: string;
  password: string;
}
export interface IRegister extends ILoggin {
  username: string;
}
export interface IReloadUser {
  displayName: string | null;
  email: string | null;
  uid: string | null;
  photoURL: string | null;
}
