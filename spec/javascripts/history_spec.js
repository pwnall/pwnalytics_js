describe("Pwnalytics history ", function() {
  beforeEach(function() {
    Pwnalytics.dropSession();
    Pwnalytics.initSession();
  });
  it("should have URL in session", function() {
    expect(Pwnalytics.session.url).toContain("http://");
    expect(Pwnalytics.session.url).toContain("localhost");
  });
  it("should have referrer in session", function() {
    expect(Pwnalytics.session.ref).not.toBeNull();
  });
  
  describe("normalizeUrl", function() {
    it("should leave query-less URLs alone", function() {
      expect(Pwnalytics.normalizeUrl("http://localhost:3000")).
          toBe("http://localhost:3000");
    });
    it("should strip query off URLs", function() {
      expect(Pwnalytics.normalizeUrl("http://localhost:3000?q=awesome")).
          toBe("http://localhost:3000?");
    });
  });
  
  describe("session URLs", function() {
    beforeEach(function() {
      spyOn(Pwnalytics, "normalizeUrl").andReturn("normalized");
      Pwnalytics.dropSession();
      Pwnalytics.initSession();
    });
    
    it("should normalize location", function() {
      expect(Pwnalytics.session.url).toBe("normalized");
      expect(Pwnalytics.session.ref).toBe("normalized");
    });
  });
});
