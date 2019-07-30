import React from 'react';
import { connect } from 'react-redux';
import { mountWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';

describe('example mountWithStore', () => {
  const ReactComponent = () => (<div>dummy component</div>);
  describe('state', () => {
    it('works', () => {
      const expectedState = 'expectedState';
      const mapStateToProps = (state) => ({
        state,
      });
      const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
      const component = mountWithStore(<ConnectedComponent />, createMockStore(expectedState));
      expect(component.props().state).toBe(expectedState);
    });
  });
  
  describe('dispatch', () => {
    it('works', () => {
      const action = {
        type: 'type',
      };
      const mapDispatchToProps = (dispatch) => ({
        dispatchProp() {
          dispatch(action);
        },
      });
      const store = createMockStore();

      const ConnectedComponent = connect(undefined, mapDispatchToProps)(ReactComponent);
      const component = mountWithStore(<ConnectedComponent />, store);
      component.props().dispatchProp();
      expect(store.isActionDispatched(action)).toBe(true);
    });
  });
});
