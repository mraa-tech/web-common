function init() {
   // Scopes needed
   // SpreadsheetApp.open(file)

   // TODO: move to api endpoint
   /**
    * This won't work from a library. It will need to be moved to the api endpoint.
    */
   const juryAppSettings = getJuryAppSettings()
   const applicationSettings = getApplicationSettings()

   for (const key in juryAppSettings) {
      if (juryAppSettings.hasOwnProperty(key)) {
         session.jurysettings[key] = juryAppSettings[key]
      }
   }
   for (const key in applicationSettings) {
      if (applicationSettings.hasOwnProperty(key)) {
         session.applicationsettings[key] = applicationSettings[key]
      }
   }

   session.jurysettings.imagetypelist =
      juryAppSettings.imagetypelist.split(", ")

   session.applicationsettings.distributionlist =
      applicationSettings.distributionlist.split(", ")
}
