// This file is our manifest of all reducers for the app.
// See also /client/app/bundles/SuhBloop/store/suhBloopStore.jsx
// A real world app will likely have many reducers and it helps to organize them in one file.
import {
  suhBloopReducer,
  $$initialState as $$suhBloopState,
} from './suhBloopReducer';

export default {
  $$suhBloopStore: suhBloopReducer,
};

export const initialStates = {
  $$suhBloopState,
};
