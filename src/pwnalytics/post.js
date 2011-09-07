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
  this.changePendingEvents(1);
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
  var escapeFn = window.encodeURIComponent || window.escape;
  // Collect session data.
  for (var property in session) {
    if (typeof property === 'string' && property.substring(0, 2) !== '__') {
      fragments.push('__' + property + '=' + escapeFn(session[property]));
    }
  }
  // Collect event data.
  for (var eventProperty in eventData) {
    if (typeof eventProperty === 'string' &&
        eventProperty.substring(0, 2) !== '__') {
      fragments.push(eventProperty + '=' + escapeFn(eventData[eventProperty]));
    }
  }
  return fragments.join('&');
};

/** Loads an URL by creating an Image pointing at it. */
Pwnalytics.image = function (url) {
  var img = new Image();
  img.src = url;
  img.onload = Pwnalytics.onImageLoad;
  var errorHandler = function () {
    setTimeout(function () {
      Pwnalytics.image(url);
    }, 60000);
  };
  img.onerror = errorHandler;
  img.onabort = errorHandler;
};

/** Assigned to event-posting images' onload event handler. */
Pwnalytics.onImageLoad = function (event) {
  Pwnalytics.changePendingEvents(-1);
};

/**
 * Changes the number of events that have not yet been posted to the server.
 * 
 * @param delta the number to change the events by (+1 to add a pending event,
 *              -1 to subtract an event after it is posted)
 */
Pwnalytics.changePendingEvents = function (delta) {
  this.pendingEvents += delta;
  this.apiProxy.length = this.pendingEvents;
};

/** The number of events that have not yet been posted to the server. */
Pwnalytics.pendingEvents = 0;
