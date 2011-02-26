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
});
