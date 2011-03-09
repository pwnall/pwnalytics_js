/** Logic for communicating events to the Pwnalytics server. */

/** The root of the post URL. */
Pwnalytics.postUrl = 'bin/p.gif';

/**
 * Posts an event to a Pwnalytics server.
 * 
 * @param eventName a String containing the event name
 * @param eventData an object with event-specific properties
 */
Pwnalytics.post = function (eventName, eventData) {
  this.session.time = (new Date()).getTime();
  this.session.px = this.screenInfoString();
  this.image(this.eventUrl(this.session, eventName, eventData));
};

/**
 * Computes the image post URL for an event.
 * 
 * @param session an object with session properties
 * @param name a String containing the event name
 * @param data an object with event-specific properties
 * @return a String with a fully-qualified URL
 */
Pwnalytics.eventUrl = function (session, eventName, eventData) {
  var fragments = [this.postUrl + '?__=' + eventName];
  // Collect session data.
  for (var property in session) {
    if (typeof property === 'string' && property.substring(0, 2) !== '__') {
      fragments.push('__' + property + '=' + escape(session[property]));
    }
  }
  // Collect event data.
  for (var eventProperty in eventData) {
    if (typeof eventProperty === 'string' &&
        eventProperty.substring(0, 2) !== '__') {
      fragments.push(eventProperty + '=' + escape(eventData[eventProperty]));
    }
  }
  return fragments.join('&');
};

/** Loads an URL by creating an Image pointing at it. */
Pwnalytics.image = function (url) {
  var img = new Image();
  img.src = url;
  var errorHandler = function () {
    setTimeout(function () {
      Pwnalytics.image(url);
    }, 60000);
  };
  img.onerror = errorHandler;
  img.onabort = errorHandler;
};
