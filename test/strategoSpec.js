describe('stratego smoke test', function() {
  it('should enter player name', function() {
    browser.get('http://localhost:3000/');

    element(by.model('textArea')).sendKeys('Mike');
    element(by.css('[value="nameButton"]')).click();

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

  });
});
