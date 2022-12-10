export interface IPrivPublicRoutes {
  isAuthenticated: boolean;
  render: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}
