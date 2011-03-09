describe("Pwnalytics event posting", function() {
  describe("eventUrl", function() {
    var url = null;
    beforeEach(function() {
      url = Pwnalytics.eventUrl({s1: 'sval1', s2: 'sval&2'}, 'evnm',
          {ev1: 'evalue1', ev2: 'evalue?2'});
    });
    it("should include the event name", function() {
      expect(url).toContain('__=evnm');
    });
    it("should include the session data", function() {
      expect(url).toContain('__s1=sval1&__s2=sval%262');
    });
    it("should include the event data", function() {
      expect(url).toContain('ev1=evalue1&ev2=evalue%3F2');
    });
    it("should start with the base URL", function() {
      expect(url).toMatch(/^bin\/p.gif\?/);
    });
  });
  
  describe("image", function() {
    var fakeImg = null;
    beforeEach(function() {
      spyOn(window, "Image").andCallFake(function() {
        fakeImg = {};
        return fakeImg;
      });
      Pwnalytics.image("http://localhost/invalid");
    });
    
    it("should construct an Image", function() {
      expect(Image).toHaveBeenCalledWith();
    });
    it("should set the image's src to the given source", function() {
      expect(fakeImg.src).toBe("http://localhost/invalid");
    });
    it("should set the image's error handlers to same function", function() {
      expect(fakeImg.onerror).not.toBe(null);
      expect(fakeImg.onerror).toBe(fakeImg.onabort);
    });
    describe("onerror", function() {
      var delayed = null;
      var timeout = null;
      beforeEach(function() {
        spyOn(window, "setTimeout").andCallFake(function(fn, ms) {
          delayed = fn;
          timeout = ms;
        });
        fakeImg.onerror.call({});
        spyOn(Pwnalytics, "image");
        delayed();
      });
      it("should delay for 60 seconds", function() {
        expect(timeout).toBe(60 * 1000);
      });
      it("should call image recursively in the delay", function() {
        expect(Pwnalytics.image).
            toHaveBeenCalledWith("http://localhost/invalid");
      });
    });
  });
  
  describe("post", function() {
    var goldDate = new Date(1337);
    var goldScreenInfo = '1.3.3.7';
    var eventData = {occurred: 'today'};
    beforeEach(function() {
      spyOn(window, 'Date').andReturn(goldDate);
      spyOn(Pwnalytics, 'screenInfoString').andReturn(goldScreenInfo);
      spyOn(Pwnalytics, 'eventUrl').andReturn('http://event.url.gif');
      spyOn(Pwnalytics, 'image');
      Pwnalytics.post('awesomeness', eventData);
    });
    it("should set the session time", function() {
      expect(Pwnalytics.session.time).toBe(1337);
    });
    it("should set the session screen metrics", function() {
      expect(Pwnalytics.session.px).toBe(goldScreenInfo);
    });
    it("should generate an image URL", function() {
      expect(Pwnalytics.eventUrl).toHaveBeenCalledWith(
          Pwnalytics.session, 'awesomeness', eventData);
    });
    it("should inject an image", function() {
      expect(Pwnalytics.image).toHaveBeenCalledWith('http://event.url.gif');
    });
  });
});
