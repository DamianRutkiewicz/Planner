// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
  	apiKey: "AIzaSyCxzsxWDEmZVtnZAYgQ3ojuAQ44x0Q5hGE",
    authDomain: "plannerdb-86284.firebaseapp.com",
    databaseURL: "https://plannerdb-86284.firebaseio.com",
    projectId: "plannerdb-86284",
    storageBucket: "plannerdb-86284.appspot.com",
    messagingSenderId: "1061006930360"
  }
};
