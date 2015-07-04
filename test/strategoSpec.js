// stratego smoke test by: heyMikeNauman

describe('stratego smoke test', function() {
  it('should enter player name', function() {
    browser.driver.get('http://localhost:3000/');
    browser.driver.findElement(by.id('textArea')).sendKeys('Mike');
    browser.driver.findElement(by.id('nameButton')).click();

    var message = browser.driver.findElement(by.id('gameMessage')).getText();
    expect(message).toEqual('Place your pieces')
  });
});
