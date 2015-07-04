// stratego smoke test by: heyMikeNauman

describe('stratego smoke test', function() {

  beforeEach(function() {
    browser.driver.get('http://localhost:3000/');
  });

  xit('should enter player name', function() {
    enterName()

    var message = browser.driver.findElement(by.id('gameMessage')).getText();
    expect(message).toEqual('Place your pieces')
  });

  it('should click the place pieces button', function() {
    enterName();
    clickPlacePieces();

    var message = browser.driver.findElement(by.id('gameMessage')).getText();
    expect(message).toEqual('Board is locked')
  });

  function enterName() {
    browser.driver.findElement(by.id('textArea')).sendKeys('Mike');
    browser.driver.findElement(by.id('nameButton')).click();
  }

  function clickPlacePieces() {
    browser.driver.findElement(by.id('readyButton')).click();
  }

});
