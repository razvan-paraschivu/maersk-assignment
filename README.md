# MaerskAssignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

This application was created with Angular X and TypeScript. SASS was used as the CSS preprocessor and for the UI Angular Material was used and made to be responsive.

To run the application firstly run the `npm install` command followed by `ng serve -o` which will open a new browser window or tab with the application running.

The application is structured in one module and a landing page component. This was mostly done for future scalability, as it
wasn't exactly necessary for the task at hand but will definitely be helpful when the application grows and multiple modules and
components will be added. This will also allow for further optimization with lazyloading, for example.

In order to save user data such as search term and sorting option, I've used the local storage which persists upon refresh, did not have time to implemnet state management such as Redux.

I first get all the pokemon through the provided API endpoint and then retrieve the details for the pokemon in order to display all requested data in the card.

I've created a basic service to handle all the API calls with a simple error handling functionality. Also implemented a loading handler for slower connections.

The cards are responsive and display all of the requested information.

There was no specification on how to display all the pokemon information when clicking the card so I just diplayed all the data with no formatting.

Did not have time to implement unit testing.