export const TEST_ACTION = 'TEST_ACTION';

export const testAction = (action) => ({
  type: TEST_ACTION,
  payload: action,
});
