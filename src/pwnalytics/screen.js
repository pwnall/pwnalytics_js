/** Metrics about the screen and browser window resolution.  */

/**
 * String encoding all the screen / window metrics.
 * 
 * Components
 *   - screen width
 *   - ':'
 *   - screen height
 *   - '.'
 *   - color depth
 *   - '.'
 */
Pwnalytics.screenInfoString = function () {
  var screen = window.screen || {};
  return [
    (screen.availWidth || 0).toString(36), ':',
    (screen.availHeight || 0).toString(36), '.',
    (screen.colorDepth || 0).toString(36), '.'].join('');
};
