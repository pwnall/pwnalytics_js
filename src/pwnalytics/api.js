/** The Pwnalytics API, accessible via _paq.push(). */

/**
 * Services calls to _paq.push().
 * 
 * @param request the object given to _paq.push()
 * 
 * If the request is a string, records an event with that name.
 * 
 * If the request is an array, records an event whose name is the first element
 * in the array. The event has additional properties, indicated by the object
 * that is the second element in the array.
 * 
 * If the request is an object, adds the object's properties to the session
 * properties.
 * 
 * If the request is a function, calls the function after Pwnalytics is loaded.
 * _paq will have additional methods properties available, such as reset().
 */
Pwnalytics.api = function (request) {
  switch (typeof request) {
  case 'string':  // Event without arguments.
    Pwnalytics.post(request, {});
    break;
  case 'object':  // Event with properties or session ammendment.
    if (typeof request.length === 'number' && typeof request[0] === 'string') {
      // Event with arguments.
      Pwnalytics.post(request[0], request[1]);
    } else {
      // Session ammendment.
      Pwnalytics.ammendSession(request);
    }
    break;
  case 'function':  // Load-delayed function.
    request.call();
    break;
  }
};

/** Object that replaces the _paq array providing a bridge to our API. */
Pwnalytics.apiProxy = { push: Pwnalytics.api, length: 0 };

/**
 * Called after the Pwnalytics JS is fully loaded and everything is defined.
 */
Pwnalytics.onLoad = function () {
  // Collect browser data.
  this.initSession();
  
  // Ammend the API proxy.
  this.apiProxy.reset = Pwnalytics.resetSession;
  
  // The requests that got queued up before Pwnalytics got loaded.
  var requests = window._paq;
  // Replace the inital array with an object redirecing push() calls to our API.
  window._paq = Pwnalytics.apiProxy;
  // Honor the old requests.
  for (var i = 0; i < requests.length; i += 1) {
    this.api(requests[i]);
  }
};
