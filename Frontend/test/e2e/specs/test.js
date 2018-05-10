// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#app > div.container')
      .assert.containsText('div.pageTitle', 'Welcome')
      .end();
      
    browser
      .url(devServer + '/#/auth')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#app > div.container')
      .assert.containsText('div.pageTitle', 'Login')
      .end();
      
    browser
      .url(devServer + '/#/recipes')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#app > div.container')
      .assert.containsText('div.pageTitle', 'Recipes')
      .end();
      
    browser
      .url(devServer + '/#/recipes/new')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#app > div.container')
      .assert.containsText('div.pageTitle', 'New Recipe')
      .end();
  },
};
