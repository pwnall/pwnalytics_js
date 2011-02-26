describe("Pwnalytics user", function() {
  var sharedPersistenceExamples = function() {
    it("should start out without any UID", function() {
      expect(Pwnalytics.readUid()).toBeNull();
    });
    
    describe("after stash", function() {
      beforeEach(function() {
        Pwnalytics.stashUid('imapwnu');
      });
      it("should read stashed UID", function() {
        expect(Pwnalytics.readUid()).toBe('imapwnu');
      });
      
      describe("after drop", function() {
        beforeEach(function() {
          Pwnalytics.dropUid();
        });
        it("should read stashed UID", function() {
          expect(Pwnalytics.readUid()).toBeNull();
        });
      });
    });
  };
  
  beforeEach(function() {
    Pwnalytics.useLocalStorage = false;
    Pwnalytics.dropUid();
    Pwnalytics.useLocalStorage = true;
    Pwnalytics.dropUid();
  });
  
  describe("using LocalStorage", function() {
    beforeEach(function() {
      Pwnalytics.useLocalStorage = true;
    });
    sharedPersistenceExamples();
  });

  describe("using Cookies", function() {
    beforeEach(function() {
      Pwnalytics.useLocalStorage = false;
    });
    describe("with an empty jar", function() {
      beforeEach(function() {
        document.cookie = '__a=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
        document.cookie = '__pwnu=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
        document.cookie = 'zzz=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
      });
      it("should really have no cookies", function() {
        expect(document.cookie).toBe('');
      });
      sharedPersistenceExamples();
    });
    describe("with cookies", function() {
      beforeEach(function() {
        document.cookie = '__a=123;expires=Tue, 19-Jan-2038 03:14:07 GMT';
        document.cookie = 'zzz=123;expires=Tue, 19-Jan-2038 03:14:07 GMT';
      });
      sharedPersistenceExamples();
    });
  });
  
  describe("uid", function() {
    it('should not be null', function() {
      expect(Pwnalytics.uid()).not.toBeNull();
    });
    it('should be consistent', function() {
      expect(Pwnalytics.uid()).toBe(Pwnalytics.uid());
    });
    it('should stash something', function() {
      Pwnalytics.uid();
      expect(Pwnalytics.readUid).not.toBeNull();
    })
    it('should be reset by dropUid', function() {
      var oldUid = Pwnalytics.uid();
      Pwnalytics.dropUid();
      expect(Pwnalytics.uid()).not.toBe(oldUid);
    });
  });
});
