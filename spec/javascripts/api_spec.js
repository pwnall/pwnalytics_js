describe("Pwnalytics API", function() {
  describe("_paq.push()", function() {
    beforeEach(function() {
      Pwnalytics.resetSession();
    });
    it("should post a property-less event when given a string", function() {
      spyOn(Pwnalytics, 'post');
      _paq.push('someEvent');
      expect(Pwnalytics.post).toHaveBeenCalledWith('someEvent', {});
    });
    it("should post an event when given an array", function() {
      spyOn(Pwnalytics, 'post');
      _paq.push(['anEvent', {someProp: 42}]);
      expect(Pwnalytics.post).toHaveBeenCalledWith('anEvent', {someProp: 42});
    });
    it("should ammend the session when given an object", function() {
      _paq.push({'ssd': 'session value'});
      expect(Pwnalytics.session.ssd).toBe('session value');
    });
    it("should call a function when given one", function () {
      var callCount = 0;
      var fn = function() { callCount += 1; }
      _paq.push(fn);
      expect(callCount).toBe(1);
    });
  });
  
  describe("_paq.length", function() {
    beforeEach(function() {
      Pwnalytics.pendingEvents = 0;
    });
    it("should be 0 before any event is posted", function() {
      expect(_paq.length).toBe(0);
    });
    it("should be 1 right after an event is posted", function() {
      _paq.push(['anEvent', {someProp: 42}]);
      expect(_paq.length).toBe(1);
    });
    describe("after client messes with _paq.length", function() {
      beforeEach(function() {
        _paq.length = 42;
      });
      it("should still be 1 right after an event is posted", function() {
        _paq.push(['anEvent', {someProp: 42}]);
        expect(_paq.length).toBe(1);
      });
    });
  });
  
  describe("_paq.reset", function () {
    it("should change the session uid", function () {
      var oldUid = Pwnalytics.session.uid;
      _paq.reset();
      expect(Pwnalytics.session.uid).toNotBe(oldUid);
    });
  });
  
  describe("onLoad", function() {
    beforeEach(function() {
      Pwnalytics.pendingPosts = 0;
    });
    it("relays requests in _paq to Pwnalytics.api", function() {
      var fn = function() { };
      _paq = [{some: 'object'}, 'event', fn];
      spyOn(Pwnalytics, 'api');
      Pwnalytics.onLoad();
      expect(Pwnalytics.api).toHaveBeenCalledWith({some: 'object'});
      expect(Pwnalytics.api).toHaveBeenCalledWith('event');
      expect(Pwnalytics.api).toHaveBeenCalledWith(fn);
    });
  });
});
