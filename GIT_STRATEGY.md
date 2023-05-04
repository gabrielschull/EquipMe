# Development branch

All pull requests are ONLY made to `development` branch. If you want to start working on a new issue you should take the following steps (let's imagine our issue is `fix-login-form`):

1. `gco development` or `git checkout development` (switching to `development` branch)
2. `gl` or `git pull` (pull the latest version of all files)
3. `gco -b fix-login-form` or `git checkout -b fix-login-form` (creating a new branch for the issue we want to work on, change `fix-login-form` for the name of your issue)
4. `ga .` or `git add .` (add files to be committed, change `.` to a specific file or folder if needed)
5. `gc -m "YOUR_COMMENT"` doing commits every time we make a significant change, try to stick to the convention, e.g. `init auth` when you start working on a new func or just create a new file or install an npm package, `feat auth` when a feature has been added & works, `fix auth` when you fixed a broken issue.
6. `git push --set-upstream origin fix-login-form` (push your branch)
7. Here you can go visual, open: https://github.com/gabrielschull/GearHub
You should see at the top: `fix-login-form had recent pushes 1 minutes ago`
Click "Compare & pull request", and follow the commands.
8. Ask a team member to add a review, to approve the request and merge into the `development` branch.