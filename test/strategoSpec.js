// stratego smoke test by: heyMikeNauman

describe('stratego smoke test suite', function() {

  beforeEach(function() {
    browser.driver.get('http://localhost:3000/');
  });

  describe('test player name input', function() {

    it('should enter player name', function() {
      checkInitalPrompt();
      enterName();

      var message = browser.driver.findElement(by.id('gameMessage')).getText();
      expect(message).toEqual('Place your pieces')
    });

  });

  describe('test board setup', function() {

    it('should click the place pieces button', function() {
      checkInitalPrompt();
      enterName();
      clickPlacePieces();

      var message = browser.driver.findElement(by.id('gameMessage')).getText();
      expect(message).toEqual('Board is locked')

    });

  });

  function checkInitalPrompt() {
    var message;
    message = browser.driver.findElement(by.id('gameMessage')).getText();
    expect(message).toEqual('Please enter your name')
  }

  function enterName() {
    browser.driver.findElement(by.id('textArea')).sendKeys('Mike');
    browser.driver.findElement(by.id('nameButton')).click();
  }

  function clickPlacePieces() {
    browser.driver.findElement(by.id('readyButton')).click();
  }

});
