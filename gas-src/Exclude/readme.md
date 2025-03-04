# Exclude From Upload

These are files not uploaded to Google. They are not needed in production deployment. To reduce the size of the final deployment they are placed in this folder during the final push.

Testing is also easier if only the necessary files are uploaded. Less files in the list makes it quicker to select the needed file after the project has been refreshed.

## Workflow

1. Move unnecessary files to this folder.
2. Push files to Google Apps Script project for testing.
3. Once testing is complete, move the files back to their original location.
4. Add **/TestLab** to the .claspignore file.
5. Push files to Google Apps Script project.
6. From the Google Apps Script project, Deploy, Manage Deployments, edit configuration by clicking the pencil icon, change the version to the new version, type in description for this deployment and click Deploy.
7. Discard changes to the .claspignore file before committing branch.
