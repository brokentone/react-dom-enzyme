This is a simple repo created with [Create React App](https://github.com/facebookincubator/create-react-app) for the very-specific case of debugging a stateful React DOM concern.

As of ReactDOM@16.4.1, anything which trips the React Fiber Scheduler `NESTED_UPDATE_LIMIT` invariant violation is fatal for the lifetime of ReactDOM. It seems that this should not be so fatal, or ReactDOM ought to be resetable.

This is a problem for enzyme-tested codebases, as well as assumedly SPA codebases.

### Example

1. Check out this repo
2. `npm i`
3. Run `npm run test:mocha`

Observe that you will have 2 test failures. ComponentOne is indeed poorly written, but ComponentTwo is quite simple and should be "ok." Skipping ComponentOne should should ComponentTwo passing.
