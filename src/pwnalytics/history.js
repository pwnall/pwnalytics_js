/** URL information. */

/**
 * Loads the current and previous visited URLs into the session.
 */
Pwnalytics.readHistory = function () {
  this.session.url = Pwnalytics.normalizeUrl(document.location);
  this.session.ref = Pwnalytics.normalizeUrl(document.referrer);
};

/** Removes bits of an URL that wouldn't be stored on the server anyway. */
Pwnalytics.normalizeUrl = function (url) {
  url = url.toString();
  var queryStart = url.indexOf('?');
  if (queryStart === -1) {
    return url;
  } else {
    return url.substr(0, queryStart + 1);
  }
};
