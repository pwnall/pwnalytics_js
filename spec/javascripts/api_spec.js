describe("Pwnalytics API", function() {
  describe("_paq.push()", function() {
    beforeEach(function() {
      Pwnalytics.dropSession();
      Pwnalytics.initSession();
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
  });
  
  describe("onLoad", function() {
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
