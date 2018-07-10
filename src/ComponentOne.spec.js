import assert from 'assert';

import React from 'react';
import { mount } from 'enzyme';

import ComponentOne from './ComponentOne';

describe('ComponentOne', function () {
  it ('should mount', function () {
      const component = mount(<ComponentOne />);
      assert.ok(component);
  });
});
