# Contributing to pillwhen API Server

The following is a set of guidelines for contributing to the pillwhen API Server project.

## About
### External services

#### MySQL database

The project uses [Sequelize](https://github.com/sequelize/sequelize) as an ORM to connect to a MySQL database.

All configuration (database connection and Sequelize initialization) are defined in `src/config`.

All the models are defined in `src/models`.

### Project structure

The project is structured as follows:

- `src/`: holds all the server/API source files
  - `config/`: application configuration files
  - `controllers/`: API routes controllers (request handlers)
  - `doc/`: API documentation
  - `routes/`: API routes definitions
  - `services/`: business logic files
  - `utils/`: utility functions and helpers used throughout the server files
  - `index.js`: entry point of the application that holds all the Express server configuration (middlewares, routes, error handling...)


### Routing

#### How to

- All routes should be defined in the `routes/` folder.
- New route files should be added to the `routes/index.js` file.
- Each file should represent a main route endpoint and its filename should match this endpoint: for example, `routes/articles.js` should define all routes from the `/articles` endpoint.
- Request handlers associated to these routes should be defined in the `controllers/` folder.
- The folder should mirror the `routes/` folder: one controller file per route file with a filename matching the associated route endpoint (ex: `controllers/articles.js`).
- Each controller should define and export one request handler function per route.
- Finally, all the business logic (retrieving, creating or updating data, etc) should be defined in the `services/` folder.

#### Example

To define a new endpoint `/articles` and two routes `GET /articles` and `GET /articles/:id`, follow the steps below.

- Create the service with the business logic to retrieve the articles:

  - Create a new file called `article.js` in the `services/` folder
  - In this new file, define and export two methods `getAllArticles` and `getArticleById`:

    ```javascript
    module.exports = {
      getAllArticles: async () => {
        // Fetch all articles from a database (using Sequelize for example)
        const articles = await Article.findAll();

        return articles;
      },

      getArticleById: async id => {
        // Fetch one article from a database (using Sequelize for example)
        const article = await Article.findByPk(id);

        return article;
      },
    };
    ```

- Create the route request handler:

  - Create a new file called `articles.js` in the `controllers/` folder
  - In this new file, define and export the request handlers associated to these routes:

    ```javascript
    const ArticleService = require('../services/article');

    module.exports = {
      getArticles: async (req, res, next) => {
        const articles = await ArticleService.getAllArticles();

        return articles;
      },

      getArticle: async (req, res, next) => {
        const { id } = req.params;
        const article = await ArticleService.getArticleById(id);

        return article;
      },
    };
    ```

- Create the endpoint and routes:

  - Create a new file called `articles.js` in the `routes/` folder
  - In this new file, initialize a router object, import the controller and the new routes with its associated request handlers:

    ```javascript
    const Router = require('express-promise-router').default;

    const articlesController = require('../controllers/articles');

    const router = Router();

    router.get('/', articlesController.getArticles);
    router.get('/:id', articlesController.getArticle);

    module.exports = router;
    ```

  - Finally, import the endpoint router in the `routes/index.js` file and declare the `/articles` route:

    ```javascript
    const articlesRouter = require('./articles');

    //
    // ─── API ROUTES ──────────────────────────────────────────────────────
    //
    router.use('/api/articles', articlesRouter);
    ```


### Error handling

HTTP error responses are handled by the `httpErrorHandler` middleware from [@kazaar/express-error-handler](https://www.npmjs.com/package/@kazaar/express-error-handler).

```javascript
//
// ─── GLOBAL ERROR HANDLING ──────────────────────────────────────────────────────
//
app.use(httpErrorHandler);
```

When an error is thrown inside of a controller with `next()` or `throw`, this middleware will eventually parse the error as an HTTP error to retrieve the error details, log the error and send back the error to the client.

To throw custom HTTP errors, use the `http-errors` module:

```javascript
const { BadRequest } = require('http-errors');

// ...

if (!filename) {
  throw new BadRequest('Invalid or missing filename.');
}
```

In addition, the routes defined in `src/routes/` should use the `Router` from the `express-promise-router` package instead of the `express` package. It provides a convenient way to write async controller methods without `try/catch` blocks and `next()` (see [express-promise-router](https://github.com/express-promise-router/express-promise-router)).



### Version update

When updating the project's version number, do not forget to update:

- The `version` field in `package.json`
- The `info > version` field in `src/doc/openapi.yaml`

## Style Guide

### ES6

All the JavaScript source files located in `src/` are written in ES6 syntax (see [ECMAScript 6](https://www.w3schools.com/js/js_es6.asp)).

Most of the ES6 features are supported by the latest versions of Node (`async/await`, `let`, `const`...). However, some features like ES6's `import/export` require to be "transpiled" first for Node.js to understand them.

If you want to use ES6's `import/export` syntax instead of the CommonJS `require/module.exports` syntax, use [Babel](https://babeljs.io/).

### Filenames

All filenames should use `kebab-case` (ex: `well-known.js`).

### Formatting

Formatting rules are defined in `.editorconfig`.

General formatting rules are:

- Indentation of **2 spaces**
- Max line length of **120 characters**
- **Single quotes** instead of double quotes

The rules defined in `.editorconfig` ensure that the coding style guide will stay consistent between different editors (see [EditorConfig](https://editorconfig.org/) for more info).

### Linting

#### ESLint
This project uses:

- [ESLint](https://eslint.org/) for JavaScript errors linting and best practices

Two npm commands are available:

- `npm run lint`
- `npm run lint:fix`

The first one will check for linting errors and the second one will try to automatically fix these errors. Under the hood, these two commands run ESlint on `*.js` files. All files and folders defined in `.gitignore` will be ignored.

Configuration for these tools are defined in `.eslintrc`. This project essentially uses Airbnb's [JavaScript Style Guide](https://github.com/airbnb/javascript) along with some eslint plugins to ensure coding best practices.

#### Pre-commit hook

In addition to these commands, a git pre-commit hook runs before each commit to ensure that linting and formatting are ok. All staged files run through the same linting process as the `lint:fix` npm command.

The hook was created with `husky` and configured to run `lint-staged`. It is defined in `package.json`.

More info:

- [Git hooks](https://git-scm.com/book/uz/v2/Customizing-Git-Git-Hooks)
- [husky](https://github.com/typicode/husky)
- [lint-staged](https://github.com/okonet/lint-staged)

### JSDoc

JavaScript functions should be annotated with [JSDoc](https://devhints.io/jsdoc). This allows to:

- Check the type of JavaScript code during code time
- Facilitate code readability
- Produce code documentation
