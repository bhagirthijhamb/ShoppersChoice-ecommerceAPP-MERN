import axios from "axios"
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from './../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = {
      email: email,
      password: password
    }
    console.log(body);
    const { data } = await axios.post('/api/users/login', body, config );
    console.log(data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch(error){
    console.log(error.response)
    dispatch({ 
      type: USER_LOGIN_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}