// Third party.
import expect        from 'expect';
import deepFreeze    from 'deep-freeze';
import React         from 'react';
import ReactDOM      from 'react-dom';
import TestUtils     from 'react-addons-test-utils';
import shallowRender from 'react-shallow-renderer';
import { jsdom }     from 'jsdom';

// Set Node environment to test.
process.env.NODE_ENV = 'test';

// JSdom.
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

// Expose globals.
Object.assign(global, {
  expect,
  deepFreeze,
  React,
  ReactDOM,
  TestUtils,
  shallowRender,
});
