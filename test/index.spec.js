import Vue from 'vue';
import FooComponent from './fixtures/FooComponent.vue';
import TsComponent from './fixtures/TsComponent.vue';
import TypescriptComponent from './fixtures/TypescriptComponent.vue';

const doTest = (Component) => {
  const vm = new Vue({
    el: document.createElement('div'),
    render: h => h(Component)
  });

  const mockFn = jest.fn();
  vm.$children[0].clickHandler = mockFn;

  // check if template HTML compiled properly
  expect(vm.$el).toBeDefined();
  expect(vm.$el.querySelector('.lorem-class').textContent).toEqual('some test text');

  // check if template calls vue methods
  vm.$el.querySelector('button').click();
  expect(mockFn.mock.calls[0][0]).toBe('value passed to clickHandler');
};

describe('preprocessor', () => {
  it('should process a `.vue` file', () => {
    doTest(FooComponent);
  });

  it('should process a `.vue` file with ts lang', () => {
    doTest(TsComponent);
  });

  it('should process a `.vue` file with typescript lang', () => {
    doTest(TypescriptComponent);
  });
});
