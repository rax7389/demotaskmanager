import { isEmpty } from 'lodash';
import { CoreGlobal } from '../constants/core-global.constant';

export class AuthenticationReducer {
  public static reducer(state = [null], action) {
    switch (action.type) {
      case CoreGlobal.LOGIN:
        return [action.payload];
        break;
      case CoreGlobal.LOGOUT:
        if(!isEmpty(state) && !isEmpty(state[0])){
          state.splice(action.payload, 1);
        }
        return state;
        break;
      default:
        return state;
    }
  }
}
