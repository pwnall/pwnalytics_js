/** Properties for the current user session. */
Pwnalytics.session = { };

/** Drops all the per-user data from the session. */
Pwnalytics.dropSession = function () {
  Pwnalytics.dropUid();
  Pwnalytics.session = {pid: Pwnalytics.session.pid};
};

/** Initializes the session properties. */
Pwnalytics.initSession = function () {
  Pwnalytics.session.uid = Pwnalytics.uid();
};

/** Merges the properties of the given object into the session object. */
Pwnalytics.ammendSession = function (data) {
  for (var property in data) {
    if (typeof property !== 'string' || property.substring(0, 2) !== '__') {
      Pwnalytics.session[property] = data[property];
    }
  }
};
