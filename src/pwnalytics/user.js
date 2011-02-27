// User identification.

/** True: use HTML5 localStorage to tag user. False: use cookie. */
Pwnalytics.useLocalStorage = !!window.localStorage;

/** Removes all user-identifying information. */
Pwnalytics.dropUid = function () {
  if (this.useLocalStorage) {
    window.localStorage.removeItem('__pwnu');
  } else {
    document.cookie = '__pwnu=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
  }
  this.cachedUid = null;
};

/** Randomly-generated UID. */
Pwnalytics.randomUid = function () {
  var timestamp = (new Date()).getTime().toString(16);
  var random1 = Math.floor(Math.random() * 0x7fffffff).toString(16);
  var random2 = Math.floor(Math.random() * 0x7fffffff).toString(16);
  return timestamp + '.' + random1 + random2;
};

/** A unique ID associated with a user (actually browser). */
Pwnalytics.uid = function () {
  if (this.cachedUid) {
    return this.cachedUid;
  }
  if (!(this.cachedUid = this.readUid())) {
    this.cachedUid = this.randomUid();
    this.stashUid(this.cachedUid);
  }
  return this.cachedUid;
};

/** Retrieves the UID stored in this browser. */
Pwnalytics.readUid = function () {
  if (this.useLocalStorage) {
    return window.localStorage.getItem('__pwnu');
  } else {
    var match = /(^|\W)__pwnu=([^;]*)(;|$)/.exec(document.cookie);
    return match && match[2];
  }
};

/** Stores a UID such that future readUid calls will return it. */
Pwnalytics.stashUid = function (uid) {
  if (this.useLocalStorage) {
    window.localStorage.setItem('__pwnu', uid);
  } else {
    document.cookie = '__pwnu=' + uid +
                      '; expires=Tue, 19-Jan-2038 03:14:07 GMT';
  }
};
