/**
 * Session settings for the application. Values are set in init.js at time of execution.
 * 
 * This won't work from a library. It will need to be moved to the api endpoint.
 */
 // TODO: move to api endpoint
const session = {
   jurysettings: {
      minimumvotes: -1, // -1 means no minimum, default if not set in MRAA Membership Jury, App Settings, Minimum Votes
      minimumimages: 5,
      maximagesize: 3, // in MB, default if not set in MRAA Membership Jury, App Settings, Maximum Image Size
   },
   applicationsettings: {
      distributionlist: "tech@metrorichmondart.org", // default if not set in MRAA Applicants, Settings, Distribution List
   },
}
