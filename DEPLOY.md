# Deployment

To deploy, do the following

1.  Make sure you are satisfied with the `dev` branch deployment
2.  ```bash
    git checkout dev
    git pull
    git checkout -b pre-deploy
    git merge master # resolving merge conflicts as you go, you can use '--strategy-options'
    git push origin pre-deploy
    git tag -a vX.X # to tag a specific version
    ```
3.  Make a PR from `pre-deploy` branch to `dev`
4.  Merge PR using `Create a merge commit` option.
5.  Make another PR from `dev` branch to `master`. There won't be any conflict at this point.
6.  Merge PR using `Squash and merge` option.
7.  Delete up `pre-deploy` branch in github and local
