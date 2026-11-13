export const environment = {
  production: false,
  apis: {
    security: 'http://172.17.2.53:8084/', // Uso para login
    administrative:
      'http://172.17.2.55:8080/backend-activo-fijo-version.2.0.0/', // Uso para backend Java
    core: 'http://172.17.2.53:8084/', // Uso para backend .NET
  },
  endpoints: {
    login: 'api/Sistemas/Login/login/anonymous',
  },
};
