/*jslint white: true, undef: true, newcap: true, nomen: false, regexp: true, plusplus: true, bitwise: true, maxlen: 80, indent: 2 */
/*global document */

/**
 * The body of the <script> tag that pulls pwnalytics in a page.
 * 
 * This sets up the global variable _paq (pwnalytics queue) which receives
 * pwnalytics commands.
 * 
 * The function inserts an asynchronous script tag that pulls in the analytics
 * JS. The following strings can be find-replaced in the binary:
 *   PA-12345-6: the analytics property ID
 *   bin/p.min.js: URL to the analytics JS
 */
var _paq = _paq || [];
_paq.push({pid: 'PA-12345-6'});
_paq.push('page');
(function () {
  var d = document,  // d aliases document, for a shorter script
  // s stands for "script element"
  s = d.createElement('script'),
  // a stands for "anchor element" (that our JS will be inserted next to)
  a = d.getElementsByTagName('script')[0]; //
  s.async = true;
  s.type = 'text/javascript';
  s.src = 'bin/p.min.js';
  a.parentNode.insertBefore(s, a);
}());
