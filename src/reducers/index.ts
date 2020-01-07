import { combineReducers } from 'redux';
import book from './book';

const rootReducer = combineReducers({
  book
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

