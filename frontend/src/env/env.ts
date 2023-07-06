export const environment = {
	production: false,
	auth0: {
	  domain: 'dev-mklwxkr2dddffknh.us.auth0.com',
	  clientId: 'jhIOlWQCKWSwTzdPICAxjooQ2OkJLmXB',
	  authorizationParams: {
		audience: 'http://express.api',
		redirect_uri: 'http://localhost:4200',
	  },
	},
	 api:{
		serverUrl: 'http://localhost:3000'
	}
};
  