// stratego smoke test by: heyMikeNauman

describe('stratego smoke test suite', function() {

  beforeEach(function() {
    browser.driver.get('http://localhost:3000/');
  });

  describe('test player name input', function() {

    it('should check inital prompt', function () {
      return browser.driver.wait(function() {
        return browser.driver.findElement(by.id('gameMessage')).getText();
      }, 2000).then(function (message) {
        expect(message).toEqual('Please enter your name');
      });
    });

    it('should enter player name', function() {
      browser.driver.findElement(by.id('textArea')).sendKeys('Mike')
      .then(function() {
        browser.driver.findElement(by.id('nameButton')).click();
      })
      .then(function() {
        return browser.driver.wait(function (){
          return browser.driver.findElement(by.id('gameMessage')).getText();
        }, 2000);
      })
      .then(function(message) {
        expect(message).toEqual('Place your pieces');
      });
    });
  });

  describe('test board setup', function() {

    it('should click the place pieces button', function() {
      browser.driver.findElement(by.id('textArea')).sendKeys('Mike')
      .then(function() {
        browser.driver.findElement(by.id('nameButton')).click();
      })
      .then(function() {
        browser.driver.findElement(by.id('readyButton')).click();
      })
      .then(function(message) {
        return browser.driver.wait(function (){
          return browser.driver.findElement(by.id('gameMessage')).getText();
        }, 2000);
      })
      .then(function(message) {
        expect(message).toEqual('Board is locked');
      });
    });
  });

});
