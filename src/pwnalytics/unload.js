/** Registers an event when the browser window is closed. */
Pwnalytics.onUnload = function () {
  Pwnalytics.post('unload', {});
};

// Hook onunload for both IE and standards-compliant browsers.
if (window.addEventListener) {
  window.addEventListener('unload', Pwnalytics.onUnload, false);
} else if (window.attachEvent) {
  window.attachEvent('unload', Pwnalytics.onUnload);
}
