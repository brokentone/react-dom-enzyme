import assert from 'assert';

import React from 'react';
import { mount } from 'enzyme';

import ComponentTwo from './ComponentTwo';


describe('ComponentTwo', function () {
  it ('should mount', function () {
      const component = mount(<ComponentTwo />);
      assert.ok(component);
  });
});
