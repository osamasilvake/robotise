## Roc [Todo]
[Link to Wiki Documentation](https://gitlab.robotise.eu/robotise/roc/frontend/roc/-/wikis/home)


## Releasing
A summary of development workflow with standard-version involving multiple git branches.

<div align="center">
  <img src="development-workflow.png" width="600" />
</div>

* Run `yarn audit` in the _root_ and _client_ (fix and commit)
  
* Stage modified files: `git add .`

* Push _feature branch_ to remote: `git push origin <feature-branch>`

* Create a `merge request` from Gitlab to have all changes on the `master` branch

* `git checkout master`

* `git pull`

* Release command: `npm run release:[major|minor|patch]

* `git push --follow-tags origin master`

* `git checkout -b release-[YOUR_VERSION]`

* `git push -u origin release-[YOUR_VERSION]`

* Move to feature branch and continue with the new _features_ and _bugs_


## Libraries and Frameworks

#### Root
##### Eslint
- [X] [eslint](https://github.com/facebook/create-react-app)
- [X] [TypeScript](https://www.typescriptlang.org/)
- [X] [@typescript-eslint/parser](https://github.com/facebook/create-react-app)
- [X] [@typescript-eslint/eslint-plugin](https://github.com/facebook/create-react-app)
- [X] [eslint-plugin-react](https://github.com/facebook/create-react-app)
- [X] [eslint-plugin-react-hooks](https://github.com/facebook/create-react-app)
- [X] [eslint-config-prettier](https://github.com/facebook/create-react-app)
- [X] [eslint-plugin-prettier](https://github.com/facebook/create-react-app)
- [X] [eslint-plugin-jsx-a11y](https://github.com/facebook/create-react-app)
- [X] [eslint-plugin-simple-import-sort](https://github.com/facebook/create-react-app)

##### Quality
- [X] [prettier](https://github.com/facebook/create-react-app)

##### Lint
- [X] [stylelint](https://github.com/facebook/create-react-app)
- [X] [stylelint-order](https://github.com/facebook/create-react-app)

##### Precommit Hook
- [X] [husky](https://github.com/facebook/create-react-app)
- [X] [lint-staged](https://github.com/facebook/create-react-app)

##### Commit Format and Release
- [X] [@commitlint/cli](https://github.com/facebook/create-react-app)
- [X] [@commitlint/config-conventional](https://github.com/facebook/create-react-app)
- [X] [standard-version](https://github.com/facebook/create-react-app)

#### Client 
- [X] [Create React App](https://github.com/facebook/create-react-app)
- [X] [Redux Toolkit](https://redux-toolkit.js.org/)
- [X] [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [X] [Redux Logger](https://github.com/zalmoxisus/redux-devtools-extension)
- [X] [TypeScript](https://www.typescriptlang.org/)
- [X] [Material-UI](https://material-ui.com/)
