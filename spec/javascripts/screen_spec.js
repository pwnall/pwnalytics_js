describe("Pwnalytics screen metrics", function() {
  var re = /^[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]\.[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+$/;
  
  describe("screenInfoString", function() {
    it("should follow the pattern", function() {
      expect(Pwnalytics.screenInfoString()).toMatch(re);
    });
    
    describe("even if window.screen is", function() {
      var crippledRe = /^0\.0\.0\.[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+$/;
      var backup = null;
      beforeEach(function() { backup = window.screen; });
      afterEach(function() { window.screen = backup; });

      it("not supported", function() {
        window.screen = null;
        expect(Pwnalytics.screenInfoString()).toMatch(crippledRe);
      });

      it("broken", function() {
        window.screen = {};
        expect(Pwnalytics.screenInfoString()).toMatch(crippledRe);
      });
    });
  });
});
