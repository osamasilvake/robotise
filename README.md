## Roc
[Link to Wiki Documentation](https://gitlab.robotise.eu/robotise/roc/frontend/roc/-/wikis/home)


## Releasing
A summary of development workflow involving multiple git branches.

* Fetch latest changes to you local master branch: `git fetch origin`. Merge it with your `<feature-branch>`
* Stage modified files: `git add .`
* Push _feature branch_ to remote: `git push origin <feature-branch>`
* Create a `merge request` from Gitlab to have all changes merge on the `master` branch if no conflicts occurs
* Do `git checkout master`
* Do `git pull`
* Release command: `yarn release:[major|minor|patch]`
* Create Tag: `git push --follow-tags origin master`
* Create a `merge request` from Gitlab to have all changes on the `pre-production` or `production` branch
* Move to _feature branch_ and continue with the new _features_ or _bugfixes_.


## Libraries and Frameworks

### Quality, Lint, Commit & Release
##### Quality: `*.{js,jsx,ts,tsx,json}`
- [X] [prettier](https://prettier.io/)

##### Lint: Eslint
- [X] [eslint](https://github.com/eslint/eslint)
- [X] [TypeScript](https://www.typescriptlang.org/)
- [X] [@typescript-eslint/parser](https://github.com/eslint/typescript-eslint-parser)
- [X] [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)
- [X] [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
- [X] [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks)
- [X] [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [X] [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- [X] [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [X] [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)

##### Precommit Hooks and Linting of Staged Files with Conventional Commits Standards
- [X] [husky](https://github.com/typicode/husky)
- [X] [lint-staged](https://github.com/okonet/lint-staged)
- [X] [@commitlint/cli](https://github.com/conventional-changelog/commitlint)
- [X] [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint)

##### Release
- [X] [standard-version](https://github.com/conventional-changelog/standard-version)


### Client Packages
- [X] [Create React App](https://github.com/facebook/create-react-app)
- [X] [Redux Toolkit](https://redux-toolkit.js.org/)
- [X] [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [X] [Redux Logger](https://github.com/zalmoxisus/redux-devtools-extension)
- [X] [TypeScript](https://www.typescriptlang.org/)
- [X] [Material-UI](https://material-ui.com/)
- [X] [Emotion](https://github.com/emotion-js/emotion/)
- [X] [clsx](https://github.com/lukeed/clsx/)
- [X] [Axios](https://github.com/axios/axios/)
- [X] [JSON-API Serializer](https://github.com/jsonapi-serializer/jsonapi-serializer/)
- [X] [loglevel](https://github.com/pimterry/loglevel)
- [X] [i18n](https://www.i18next.com/)
- [X] [DayJs](https://github.com/iamkun/dayjs/)
- [X] [React Helmet Async](https://github.com/staylor/react-helmet-async)
- [X] [React CSV](https://github.com/react-csv/react-csv)
- [X] [DOM Purify](https://github.com/cure53/DOMPurify)


#### MUI: Speedup Startup Times (Development)
- [X] [Babel Plugin Import](https://github.com/umijs/babel-plugin-import/)
- [X] [Customize CRA](https://github.com/arackaf/customize-cra/)
- [X] [React App Rewired](https://github.com/timarney/react-app-rewired/)


#### Analyze Project
- [X] [Source Map Explorer](https://github.com/danvk/source-map-explorer#readme)


## ENV (Environment)
* `.env`                  = common environment variables
* `.env.development`      = development environment variables (use with `yarn start`)
* `.env.production`       = production environment variables (use with `yarn build`)

##### Gitlab and Docker Process:
* Create development and production environments on Gitlab ROC repository.
* Add variables for development and production environment on Gitlab ROC repository. 
* Add environment property on development and production CI/CD Jobs.
```
environment:
  name: development/production
```
* Set the following variables on CI/CD build jobs:
```
--build-arg REACT_APP_AUTH_BASE_URL \
--build-arg REACT_APP_AUTH_REALM \
--build-arg REACT_APP_API_BASE_URL \
--build-arg REACT_APP_API_VERSION
```
* Set Dockerfile with ARG (arguments).
