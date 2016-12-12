"use strict";
/* jslint node: true */

var assert = require('assert');

var browser, element, currentCommand = '',
    options = {
        timeout: 30000,
        retries: 0,
        screenshotFolder: 'screenshots/Daugherty-ServicesTest',
        baseUrl: 'https://www.daugherty.com/'
    };

module.exports = function testDaughertyServices(_browser, _options) {

    browser = _browser;
    var acceptNextAlert = true;
    getRuntimeOptions(_options);
    try {
        currentCommand = 'open("/", "")';
        browser.get(addBaseUrl("/"));

        currentCommand = 'clickAndWait("link=Business Strategy and Innovation", "")';
        doAndWait(function() {
            browser.elementByLinkText("Business Strategy and Innovation").click();
        });

        currentCommand = 'clickAndWait("css=figcaption > a", "")';
        doAndWait(function() {
            browser.elementByCssSelector("figcaption > a").click();
        });

        currentCommand = 'click("//ul[@id=\'tab_list\']/li[2]", "")';
        browser.elementByXPath("//ul[@id='tab_list']/li[2]").click();

        currentCommand = 'click("//ul[@id=\'tab_list\']/li[3]", "")';
        browser.elementByXPath("//ul[@id='tab_list']/li[3]").click();

        currentCommand = 'click("//ul[@id=\'tab_list\']/li[4]", "")';
        browser.elementByXPath("//ul[@id='tab_list']/li[4]").click();

        currentCommand = 'clickAndWait("//div[@id=\'page_content\']/div[2]/div/figure[2]/figcaption/a", "")';
        doAndWait(function() {
            browser.elementByXPath("//div[@id='page_content']/div[2]/div/figure[2]/figcaption/a").click();
        });

        currentCommand = 'sendKeys("name=first-name", "Brady")';
        browser.elementByName("first-name").sendKeys("Brady");

        currentCommand = 'sendKeys("name=last-name", "Georgen")';
        browser.elementByName("last-name").sendKeys("Georgen");

        currentCommand = 'sendKeys("name=email", "brady.georgen@daugherty.com")';
        browser.elementByName("email").sendKeys("brady.georgen@daugherty.com");

        currentCommand = 'sendKeys("name=message", "Hello world.")';
        browser.elementByName("message").sendKeys("Hello world.");

        currentCommand = 'sendKeys("name=message", "")';
        browser.elementByName("message").sendKeys("");

        currentCommand = 'sendKeys("name=email", "")';
        browser.elementByName("email").sendKeys("");

        currentCommand = 'sendKeys("name=last-name", "")';
        browser.elementByName("last-name").sendKeys("");

        currentCommand = 'sendKeys("name=first-name", "")';
        browser.elementByName("first-name").sendKeys("");

        currentCommand = 'clickAndWait("//div[@id=\'page_content\']/div[2]/div/figure[3]/figcaption/a", "")';
        doAndWait(function() {
            browser.elementByXPath("//div[@id='page_content']/div[2]/div/figure[3]/figcaption/a").click();
        });

    } catch (e) {
        var failedScreenShot = options.screenshotFolder + '/Exception@' + currentCommand.replace(/\(.+/, '') + '.png';
        try {
            createFolderPath(options.screenshotFolder);
            browser.saveScreenshot(failedScreenShot);
        } catch (e) {
            e.message = 'Failure in Selenium command "' + currentCommand + '": ' + e.message + ' (Could not save screenshot after failure occured)';
            throw e;
        }
        e.message = 'Failure in Selenium command "' + currentCommand + '": ' + e.message + ' (Screenshot was saved to ' + failedScreenShot + ')';
        throw e;
    }

};

/**
 * A hacky way to implement *AndWait Selenese commands. Native wd doesn't offer
 * commands equivalent to e.g. clickAndWait or dragAndDropAndWait (actually
 * neither dragAndDrop nor AndWait exist in wd) or clickAndWait. We work around
 * it wrapping all *AndWait commands in code that first taints the document body
 * with a class, then runs the base command, and waits for a new document ready
 * state without the tainted body.
 *
 * @param  {function}             code      The code to execute
 * @param  {WdSyncClient.browser} wdBrowser (optional) Browser instance
 * @return {void}
 */
function doAndWait(code, wdBrowser) {
    if (typeof wdBrowser !== 'object') {
        wdBrowser = browser;
    }
    wdBrowser.execute('document.body.className += " SHTML2JSC"');
    code();
    withRetry(function() {
        if (wdBrowser.execute("return document.readyState") !== 'complete' || wdBrowser.hasElementByCssSelector('body.SHTML2JSC'))
            throw new Error('Page did not load in time');
    }, wdBrowser);
}

/**
 * Implements waitForPageToLoad selenese command. As opposed to the Selenium
 * IDE implementation, this one actually waits for all resources to have been
 * loaded.
 *
 * @param  {WdSyncClient.browser} wdBrowser (optional) Browser instance.
 * @return {void}
 */
function waitForPageToLoad(wdBrowser) {
    if (typeof wdBrowser !== 'object') {
        wdBrowser = browser;
    }
    withRetry(function() {
        if (wdBrowser.execute("return document.readyState") !== 'complete')
            throw new Error('Page did not load in time');
    });
}

function getRuntimeOptions(opts) {
    if (!opts) return;

    if (typeof opts.lbParam === 'object') {
        options.lbParam = opts.lbParam;
    }

    if (opts.baseUrl && typeof opts.baseUrl === 'string') {
        options.baseUrl = opts.baseUrl;
        if (opts.forceBaseUrl && typeof opts.forceBaseUrl === 'boolean') {
            options.forceBaseUrl = opts.forceBaseUrl;
        }
    }

    if (opts.screenshotFolder && typeof opts.screenshotFolder === 'string') {
        options.screenshotFolder = opts.screenshotFolder;
    }

    if (opts.timeout && isNumber(opts.timeout)) {
        options.timeout = opts.timeout;
    }

    if (opts.retries && isNumber(opts.retries)) {
        options.retries = opts.retries;
    }
}

function isNumber(val) {
    return typeof val === 'number' && !isNaN(val);
}

function isAlertPresent(wdBrowser) {
    if (typeof wdBrowser !== 'object') {
        wdBrowser = browser;
    }

    try {
        wdBrowser.alertText();
        return true;
    } catch (e) {
        return false;
    }
}

function closeAlertAndGetItsText(acceptNextAlert, wdBrowser) {
    if (typeof wdBrowser !== 'object') {
        wdBrowser = browser;
    }

    try {
        var alertText = wdBrowser.alertText();
        if (acceptNextAlert) {
            wdBrowser.acceptAlert();
        } else {
            wdBrowser.dismissAlert();
        }
        return alertText;
    } catch (ignore) {}
}

function isEmptyArray(arr) {
    return arr instanceof Array && arr.length === 0;
}

function waitFor(checkFunc, expression, timeout, pollFreq, wdBrowser) {

    if (typeof wdBrowser !== 'object') {
        wdBrowser = browser;
    }
    if (!isNumber(timeout)) {
        timeout = options.timeout;
    }
    if (!isNumber(pollFreq)) {
        pollFreq = 200;
    }

    var val;
    var timeLeft = timeout;

    while (!val) {
        val = checkFunc();

        if (val)
            break;

        if (timeLeft < 0) {
            throw new Error('Timed out after ' + timeout + ' msecs waiting for expression: ' + expression);
        }

        wdBrowser.sleep(pollFreq);
        timeLeft -= pollFreq;
    }

    return val;
}

function createFolderPath(path) {
    var fs = require('fs');
    var folders = path.split(/[/\\]+/);
    path = '';

    while (folders.length) {
        /* This works for both absolute and relative paths, as split on an absolute path will have resulted in an array with the first bit empty. Safe for absolute Windows paths as well: */
        path += folders.shift() + '/';

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        } else if (!fs.statSync(path).isDirectory()) {
            throw new Error("Cannot create directory '" + path + "'. File of same name already exists.");
        }
    }
}

/**
 * Prefix a (relative) path with a base url.
 *
 * If the path itself is an absolute one including a domain, it'll be returned as-is, unless force is set to true, in
 * which case the existing domain is replaced with the base.
 *
 * When optional arguments are when omitted, values from glocal options object are used.
 *
 * @param  {string} path  The path to prefix with the base url
 * @param  {string} base  (optional) The base url
 * @param  {bool}   force (optional) If true, force prefixing even if path is an absolute url
 * @return {string}       The prefixed url
 */
function addBaseUrl(path, base, force) {
    if (typeof base !== 'string') {
        base = options.baseUrl;
    }

    if (typeof force !== 'boolean') {
        force = options.forceBaseUrl;
    }

    if (path.match(/^http/)) {
        if (force) {
            return path.replace(/^http(s?):\/\/[^/]+/, base).replace(/([^:])\/\/+/g, '$1/');
        }
        return path;
    }
    return (base + '/' + path).replace(/([^:])\/\/+/g, '$1/');
}

/**
 * Focuses the topmost window on the stack of handles in the browser.
 *
 * After a WdSyncClient.browser.close() wd does not automatically restore focus
 * to the previous window on the stack, so you may execute this function to
 * ensure that subsequent tests won't be targeting a defunct window handle.
 *
 * @param  {WdSyncClient.browser} wdBrowser (optional) Browser instance.
 * @return {void}
 */
function refocusWindow(wdBrowser) {
    if (typeof wdBrowser !== 'object') {
        wdBrowser = browser;
    }
    var handles = wdBrowser.windowHandles();
    if (handles.length) {
        try {
            wdBrowser.window(handles[handles.length - 1]);
        } catch (e) {
            console.warn('Failed to automatically restore focus to topmost window on browser stack. Error:', e);
        }
    }
}

/**
 * Tries to execute an Error throwing function, and if an error is thrown, one
 * or more retries are attempted until <timeout> msecs have passed.
 *
 * Pauses between retries are increasing in length. The pause before the final
 * retry will be half the total timeout. The pause before the second-to-last
 * will be half of the last one's, and so forth. The first attempt will have the
 * same pause as that of the first retry.
 *
 * Optional arguments use glocal values when omitted
 *
 * @param  {function}             code      The code to execute
 * @param  {WdSyncClient.browser} wdBrowser (optional) Browser instance
 * @param  {number}               retries   (optional) The max number of retries
 * @param  {number}               timeout   (optional) The max number of msecs to keep trying
 * @return {mixed}                Whatever the code block returns
 */
function withRetry(code, wdBrowser, retries, timeout) {
    if (typeof wdBrowser !== 'object') {
        wdBrowser = browser;
    }

    if (!isNumber(retries)) {
        retries = options.retries;
    }

    if (!isNumber(timeout)) {
        timeout = options.timeout;
    }

    var durations = [timeout];
    var err;

    while (retries) {
        durations[0] = Math.ceil(durations[0] / 2);
        durations.unshift(durations[0]);
        --retries;
    }

    for (var i = 0; i < durations.length; ++i) {
        try {
            return code();
        } catch (e) {
            err = e;
            wdBrowser.sleep(durations[i]);
        }
    }

    throw (err);
}

/**
 * Triggers a keyboard event on the provided wd browser element.
 *
 * @param    {WD Element} element Target DOM element to trigger the event on
 * @param    {string}     event   Keyboard event (keyup|keydown|keypress)
 * @param    {keyCode}    key     Charcode to use
 * @return   {void}
 */
function keyEvent(element, event, keyCode) {
    browser.execute(functionBody(function() {
        var element = arguments[0];
        var event = arguments[1];
        var keyCode = arguments[2];
        var ev = window.document.createEvent('KeyboardEvent');
        if (ev.initKeyEvent)
            ev.initKeyEvent(event, true, true, window, 0, 0, 0, 0, 0, keyCode);
        else
            ev.initKeyboardEvent(event, true, true, window, 0, 0, 0, 0, 0, keyCode);
        return element.dispatchEvent(ev);
    }), [element.rawElement, event, keyCode]);
}

function functionBody(func) {
    return func.toString().replace(/^function[^{]+{/, '').replace(/}[^}]*$/, '');
}

/* User extensions */

function typeRedactor(target, value, element) {
    /* .execute takes just a function body as a string to be eval'ed: */
    var className = browser.execute(functionBody(function() {
        var element = arguments[0];
        var text = arguments[1];
        var callback = arguments[2];
        /* Once done, we tag redactor with a class, so we know when we finished: */
        var className = "seleniumDoTypeRedactor-" + (new Date()).getTime();
        var keyEvent = function(element, event, keyCode) {
            var ev = window.document.createEvent('KeyboardEvent');
            if (ev.initKeyEvent)
                ev.initKeyEvent(event, true, true, window, 0, 0, 0, 0, 0, keyCode);
            else
                ev.initKeyboardEvent(event, true, true, window, 0, 0, 0, 0, 0, keyCode);
            return element.dispatchEvent(ev);
        };
        keyEvent(element, 'keydown', 0);
        keyEvent(element, 'keyup', 0);
        element.textContent = 'redactor';
        setTimeout(function() {
            keyEvent(element, 'keydown', 0);
            keyEvent(element, 'keyup', 0);
            element.textContent = text;
            setTimeout(function() {
                keyEvent(element, 'keydown', 0);
                keyEvent(element, 'keyup', 0);
                element.className += ' ' + className;
            }, 50);
        }, 50);
        return className;
    }), [element.rawElement /* Important! element is mangled by wd-sync; we need the raw wd element */ , value]);
    waitFor(function() {
        return browser.hasElementByCssSelector('.' + className);
    }, 'browser.hasElementByCssSelector(".' + className + '") [to mark completion of typeRedactor execution]');
}