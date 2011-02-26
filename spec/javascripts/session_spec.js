describe("Pwnalytics session", function() {
  beforeEach(function() {
    Pwnalytics.dropSession();
    Pwnalytics.initSession();
  });
  
  it("should have a uid equal to the UID", function() {
    expect(Pwnalytics.session.uid).toBe(Pwnalytics.uid());
  });
  it("should have a correct pid", function() {
    expect(Pwnalytics.session.pid).toBe('PA-12345-6');
  });

  describe("ammendSession", function() {
    it("should add a single property", function() {
      Pwnalytics.ammendSession({vid: 'videos'});
      expect(Pwnalytics.session.vid).toBe('videos');
      expect(Pwnalytics.session.pid).toBe('PA-12345-6');
    });
    it("should add/update properties", function() {
      Pwnalytics.ammendSession({
        vid: 'videos', uid: 'magicuser', '__ignore': 'should be ignored'
      });
      expect(Pwnalytics.session.vid).toBe('videos');
      expect(Pwnalytics.session.pid).toBe('PA-12345-6');
      expect(Pwnalytics.session.uid).toBe('magicuser');
      expect(Pwnalytics.session['__ignore']).toBeFalsy();
    });
  });
  
  describe("dropSession", function() {
    beforeEach(function() {
      Pwnalytics.dropSession();
    });
    it("should remove the uid key", function() {
      expect(Pwnalytics.session.uid).toBeFalsy();
    });
    it("should remove the stashed uid", function() {
      expect(Pwnalytics.readUid()).toBeFalsy();
    });
  });
});
