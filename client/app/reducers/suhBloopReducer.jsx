import Immutable from 'immutable';

export const $$initialState = Immutable.fromJS({
  name: '', // this is the default state that would be used if one were not passed into the store
});

export default function suhBloopReducer($$state = $$initialState, action) {
  const { type, name } = action;

  switch (type) {
    default:
      return $$state;
  }
}
