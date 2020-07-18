# Deployment

To deploy, do the following

1.  Make sure you are satisfied with the `dev` branch deployment
2.  ```bash
    git checkout dev
    git pull
    git checkout -b pre-deploy
    git merge master # resolving merge conflicts as you go
    git push origin pre-deploy
    git tag -a vX.X # to tag a specific version
    ```
3.  Make a PR from `pre-deploy` branch to `master`
4.  Squash and merge PR.
5.  Delete up branch in github and local
