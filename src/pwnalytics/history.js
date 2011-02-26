/** URL information. */

/**
 * Loads the current and previous visited URLs into the session.
 */
Pwnalytics.readHistory = function () {
  this.session.url = '' + document.location;
  this.session.ref = '' + document.referrer;
};
