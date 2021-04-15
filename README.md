## Roc
[Link to Wiki Documentation](https://gitlab.robotise.eu/robotise/roc/frontend/roc/-/wikis/home)


## Releasing
A summary of development workflow involving multiple git branches.

* Run `yarn audit` in the _root_ and _client_ (fix and commit)
  
* Stage modified files: `git add .`

* Push _feature branch_ to remote: `git push origin <feature-branch>`

* Create a `merge request` from Gitlab to have all changes on the `master` branch

* `git checkout master`

* `git pull`

* Release command: `yarn release:[major|minor|patch]`

* Create Tag: `git push --follow-tags origin master`

* Create a `merge request` from Gitlab to have all changes on the `production` branch

* Move to _feature branch_ and continue with the new _features_ and _bugfixes_.


## Libraries and Frameworks

### Root
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

##### Projects Manager
- [X] [Lerna](https://github.com/lerna/lerna)

##### Precommit Hooks and Linting of Staged Files with Conventional Commits Standards
- [X] [husky](https://github.com/typicode/husky)
- [X] [lint-staged](https://github.com/okonet/lint-staged)
- [X] [@commitlint/cli](https://github.com/conventional-changelog/commitlint)
- [X] [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint)

### Client 
- [X] [Create React App](https://github.com/facebook/create-react-app)
- [X] [CRACO](https://github.com/gsoft-inc/craco)
- [X] [Redux Toolkit](https://redux-toolkit.js.org/)
- [X] [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [X] [Redux Logger](https://github.com/zalmoxisus/redux-devtools-extension)
- [X] [TypeScript](https://www.typescriptlang.org/)
- [X] [Material-UI](https://material-ui.com/)
- [X] [Emotion](https://github.com/emotion-js/emotion/)
- [X] [clsx](https://github.com/lukeed/clsx/)
- [X] [Axios](https://github.com/axios/axios/)
- [X] [JSON-API Serializer](https://github.com/jsonapi-serializer/jsonapi-serializer/)
- [X] [JWT Decode](https://jwt.io/)
- [X] [loglevel](https://github.com/pimterry/loglevel)
- [X] [i18n](https://www.i18next.com/)
- [X] [Moment](https://momentjs.com/)
- [X] [React Helmet Async](https://github.com/staylor/react-helmet-async)
- [X] [Markdown](https://github.com/remarkjs/react-markdown)
