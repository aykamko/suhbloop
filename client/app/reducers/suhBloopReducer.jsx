import Immutable from 'immutable';

export const $$initialState = Immutable.fromJS({
  appConfig: {
    googleFormUrl: '',
  },
});

export default function suhBloopReducer($$state = $$initialState, action) {
  const { type, name } = action;

  switch (type) {
    default:
      return $$state;
  }
}
