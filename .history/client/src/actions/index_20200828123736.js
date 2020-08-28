//help us make api request or ajax request to backend
//actions creator使用来modify redux  store中的state
import axios from 'axios';
import {FETCH_USER} from './types';

//如果arrow function中只有一个return语句的话，可以去掉大括号和return
//It returns an object describes our actions.
export const fetchUser = () => async dispatch => {
    //这里是relative route，也要设置proxy
    const res = await axios.get('/api/current_user');
    //res中有很多信息，可是我们只关心data
    dispatch({type: FETCH_USER, payload: res.data});
};    

//to handle the checkout state
export const handleToken = token => async dispatch =>{
    //这个是post
    const res = await axios.post('/api/stripe', token);
    //因为credit会到user MOdel中，所以也是知道user就可以了
    dispatch({type: FETCH_USER, payload: res.data});
}
