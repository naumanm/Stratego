exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['strategoSpec.js'],
  restartBrowserBetweenTests: true
}
