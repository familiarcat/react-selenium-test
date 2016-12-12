import converter from 'selenium-html-js-converter';
import fs from 'fs';
import wdSync from 'wd-sync';
import selenium from 'selenium-standalone';
import { installConfig, startupConfig } from './SeleniumConfig';


describe('INTEGRATION TEST: Selenium Tests', () => {
  it('should install selenium', (done) => {
    selenium.install(installConfig, (error) => {
      console.log('Selenium failed to install', error);
      done();
    });
  }).timeout(60000);
  it('should run selenium server', (done) => {
    selenium.start(startupConfig, (err, child) => {
      converter.convertHtmlSuiteFileToJsFiles(__dirname + '/ide/Daugherty-TestSuite.html', __dirname + '/js');
      const testFiles = fs.readdirSync(__dirname + '/js/tests/');
      const i = testFiles.indexOf('.DS_Store');
      if (i !== -1) testFiles.splice(i, 1);
      const client = wdSync.remote('127.0.0.1', 4444);
      const browser = client.browser;
      const sync = client.sync;
      const testCases = testFiles.map((f) => {
        return require(__dirname + '/js/tests/' + f);
      });
      sync(() => {
        console.log('Syncing with Selenium');
        browser.init({ browserName : 'chrome' });
        testCases.map((test) => {
          test(browser);
        });
        browser.quit();
        done();
      });
    });
  }).timeout(60000);
});
