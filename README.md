## Roc [Todo]
[Link to Wiki Documentation](https://gitlab.robotise.eu/robotise/roc/frontend/roc/-/wikis/home)


## Releasing
A summary of development workflow with standard-version involving multiple git branches.

<p align="center">
  <img src="development-workflow.png" width="600" />
</p>

* Stage modified files: `git add .`
  
* Run `yarn audit` in the _root_ and _client_ (fix and commit)

* Commit the files using git-cz package: `yarn commit`

* Push to remote: `git push origin <feature-branch>`

* Create a `merge request` from Gitlab to have all changes on the `master` branch

* `git checkout master`

* `git pull`

* Run the command npm run release (which will bump versions based on commit types, add commit descriptions to CHANGELOG.md, and create git tags according to the current version). `git push --follow-tags origin master`

* `git checkout -b release-[YOUR_VERSION]`

* `git push -u origin release-[YOUR_VERSION]`


## Libraries and Frameworks

#### Root 

#### Client 
- [X] [Create React App](https://github.com/facebook/create-react-app)
- [X] [Redux Toolkit](https://redux-toolkit.js.org/)
- [X] [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [X] [TypeScript](https://www.typescriptlang.org/)
- [X] [Material-UI](https://material-ui.com/)
