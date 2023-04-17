## Roc
[Link to Wiki Documentation](https://gitlab.robotise.eu/robotise/roc/frontend/roc/-/wikis/home)


## Releasing
A summary of development workflow involving multiple git branches.

* Fetch latest changes to you local master branch: `git fetch origin`
* Stage modified files: `git add .`
* Push master to remote: `git push`
* Release command: `yarn release:[major|minor|patch]`
* Create Tag: `git push --follow-tags origin master`
* Create a `merge request` in Gitlab: `master -> development|pre-production|production`


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
* Set Dockerfile with ARG (arguments): `docker/Dockerfile`
