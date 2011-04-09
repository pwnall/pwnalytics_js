/** Properties for the current user session. */
Pwnalytics.session = { };

/** Drops all the per-user data from the session. */
Pwnalytics.dropSession = function () {
  this.dropUid();
  this.session = {pid: Pwnalytics.session.pid};
};

/** Initializes the session properties. */
Pwnalytics.initSession = function () {
  this.session.uid = Pwnalytics.uid();
  this.readHistory();
};

/** Sets up a new session, as if a new user would visit the site. */
Pwnalytics.resetSession = function () {
  Pwnalytics.dropSession();
  Pwnalytics.initSession();
};

/** Merges the properties of the given object into the session object. */
Pwnalytics.ammendSession = function (data) {
  for (var property in data) {
    if (typeof property !== 'string' || property.substring(0, 2) !== '__') {
      this.session[property] = data[property];
    }
  }
};
