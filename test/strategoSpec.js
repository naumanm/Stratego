// stratego smoke test by: heyMikeNauman

describe('stratego smoke test suite', function() {

  beforeEach(function() {
    browser.driver.get('http://localhost:3000/');
  });

  describe('test player name input', function() {

    it('should check inital prompt', function () {
      var message = browser.driver.findElement(by.id('gameMessage')).getText();
      expect(message).toEqual('Please enter your name');

      var readyButtonCheck = browser.driver.findElement(by.id('readyButton')).getAttribute('hidden');
      console.log(readyButtonCheck);
      expect(readyButtonCheck).toBeTruthy();
    });

    it('should enter player name', function() {
      enterName();

      var message = browser.driver.findElement(by.id('gameMessage')).getText();
      expect(message).toEqual('Place your pieces');
    });

  });

  describe('test board setup', function() {

    it('should click the place pieces button', function() {
      enterName();
      clickPlacePieces();

      var message = browser.driver.findElement(by.id('gameMessage')).getText();
      expect(message).toEqual('Board is locked');

    });

  });

  function enterName() {
    browser.driver.findElement(by.id('textArea')).sendKeys('Mike');
    browser.driver.findElement(by.id('nameButton')).click();
  }

  function clickPlacePieces() {
    browser.driver.findElement(by.id('readyButton')).click();
  }

});
