/** Metrics about the screen and browser window resolution.  */

/**
 * String encoding all the screen / window metrics.
 * 
 * The following metrics are base36-encoded and separated by .
 *   - screen width
 *   - screen height
 *   - color depth
 *   - document width
 *   - document height
 *   - window X position
 *   - window Y position
 */
Pwnalytics.screenInfoString = function () {
  var screen = window.screen || {};
  return [
    (screen.availWidth || 0).toString(36),
    (screen.availHeight || 0).toString(36),
    (screen.colorDepth || 0).toString(36),
    (document.width || 0).toString(36),
    (document.height || 0).toString(36),
    (window.screenLeft || window.screenX || 0).toString(36),
    (window.screenTop || window.screenY || 0).toString(36)
  ].join('.');
};
