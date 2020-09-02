import { FETCH_USER } from '../actions/types';
//在不知道是否登录时就用null
export default function(state = null, action){
    console.log(action);
    switch (action.type){
        case FETCH_USER:
            //action.payload就是user model 
            //如果没登录时payload时''，在js中是false，所以登录时，有值，未登录时为false；也会有原本的状态null
            return action.payload || false;
        default:
            return state;
    }
}