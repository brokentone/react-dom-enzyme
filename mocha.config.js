/**
 * Everything in this file should only be run once to set up the mocha environment
 */
require('babel-core/register');

const Adapter = require('enzyme-adapter-react-16');
const enzyme = require('enzyme');
const { JSDOM } = require('jsdom');
require('raf/polyfill');

// configure enzyme
enzyme.configure({ adapter: new Adapter() });

// setup jsdom
const jsdom = new JSDOM(`<!doctype html>
<html>
  <head>
    <script></script>
  </head>
  <body>
    <div id="app-root"></div>
  </body>
</html>
`);

const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};

/**
   * copyProps
   * Checks to see if source has props the target does not have,
   *    and if so copies those props from the source to the target.
   * Relates to the following: https://github.com/chaijs/type-detect/pull/91
   *
   * @param {Object} src - The object with needed props
   * @param {Object} target - The object that will acquire props from the src
   *
   * @returns {undefined} undefined
   */
function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

// make sure global has all the props that window has
copyProps(window, global);

console.error = (error) => {
  throw new Error(error);
};
