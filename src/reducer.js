/* eslint-disable default-param-last */
import {
  TEST_ACTION,
} from './actions';

const initialState = {
  test: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_ACTION:
      return {
        ...state,
        test: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
