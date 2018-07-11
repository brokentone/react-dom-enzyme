import {
  ITERATOR_SYMBOL,
  getAdapter,
  makeOptions,
  sym,
  privateSet
} from 'enzyme/build/Utils';

const NODE = sym('__node__');
const NODES = sym('__nodes__');
const RENDERER = sym('__renderer__');
const UNRENDERED = sym('__unrendered__');
const ROOT = sym('__root__');
const OPTIONS = sym('__options__');

function privateSetNodes(wrapper, nodes) {
  if (!nodes) {
    privateSet(wrapper, NODE, null);
    privateSet(wrapper, NODES, []);
  } else if (!Array.isArray(nodes)) {
    privateSet(wrapper, NODE, nodes);
    privateSet(wrapper, NODES, [nodes]);
  } else {
    privateSet(wrapper, NODE, nodes[0]);
    privateSet(wrapper, NODES, nodes);
  }
  privateSet(wrapper, 'length', wrapper[NODES].length);
}

/**
 * @class ReactWrapper
 */
class ReactWrapper {
  constructor(nodes) {
    const options = makeOptions({});

    privateSet(this, UNRENDERED, nodes);
    const renderer = getAdapter(options).createRenderer({ mode: 'mount', ...options });
    privateSet(this, RENDERER, renderer);
    renderer.render(nodes, options.context);
    privateSet(this, ROOT, this);
    privateSetNodes(this, this[RENDERER].getNode());
    privateSet(this, OPTIONS, options);
  }

  /**
   * Returns the root wrapper
   *
   * @return {ReactWrapper}
   */
  root() {
    return this[ROOT];
  }

  /**
   * Returns the wrapped component.
   *
   * @return {ReactComponent}
   */
  getNodeInternal() {
    if (this.length !== 1) {
      throw new Error('ReactWrapper::getNode() can only be called when wrapping one node');
    }
    return this[NODES][0];
  }

  /**
   * Utility method that throws an error if the current instance has a length other than one.
   * This is primarily used to enforce that certain methods are only run on a wrapper when it is
   * wrapping a single node.
   *
   * @param {Function} fn
   * @returns {*}
   */
  single(name, fn) {
    const fnName = typeof name === 'string' ? name : 'unknown';
    const callback = typeof fn === 'function' ? fn : name;
    if (this.length !== 1) {
      throw new Error(`Method “${fnName}” is only meant to be run on a single node. ${this.length} found instead.`);
    }
    return callback.call(this, this.getNodeInternal());
  }

}


if (ITERATOR_SYMBOL) {
  Object.defineProperty(ReactWrapper.prototype, ITERATOR_SYMBOL, {
    configurable: true,
    value: function iterator() {
      const iter = this[NODES][ITERATOR_SYMBOL]();
      const adapter = getAdapter(this[OPTIONS]);
      return {
        [ITERATOR_SYMBOL]() { return this; },
        next() {
          const next = iter.next();
          if (next.done) {
            return { done: true };
          }
          return {
            done: false,
            value: adapter.nodeToElement(next.value),
          };
        },
      };
    },
  });
}

/**
 * Mounts and renders a react component into the document and provides a testing wrapper around it.
 *
 * @param node
 * @returns {ReactWrapper}
 */
export default function mount(node, options) {
  return new ReactWrapper(node, null, options);
}
