// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // api_url: 'https://obscure-island-27156.herokuapp.com/v1',
  // api_url: 'http://172.17.19.119:3000/v1',
  api_url: 'http://0.0.0.0:3000/v1',
  current_user: 'CURRENT_USER',

  // System url
  url_home: 'home',

  // System messages success
  login_success: `Login success!`,
  logged: `You already logged!`,

  // System messages errors
  error_load_data: `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`,
  error_connect_to_server: `Can't connect to server!`
};
