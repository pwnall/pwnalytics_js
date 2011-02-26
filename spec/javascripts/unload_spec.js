describe("Pwnalytics unload", function() {
  describe("onUnload", function() {
    beforeEach(function() {
      spyOn(Pwnalytics, 'post');
    });
    it("should post unload event", function() {
      Pwnalytics.onUnload();
      expect(Pwnalytics.post).toHaveBeenCalledWith('unload', {});
    });
  });
});
