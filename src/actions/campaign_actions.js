import axios from 'axios';
import { browserHistory } from 'react-router';
import { START_CAMPAIGN, ADD_PLAYER } from './types';

const ROOT_URL = 'http://localhost:3090';

export function startCampaign(formProps){
  return function(dispatch) {
    axios.put(`${ROOT_URL}/startCampaign`, formProps, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: START_CAMPAIGN,
        payload: response.data
      });
    })
  }
}

export function addPlayer(request) {
  console.log(request);
  return (dispatch) => {
    axios.put(`${ROOT_URL}/addPlayer`, request, {
      headers: {authorization: localStorage.getItem('token') }
    })
    .then(response => {
      console.log('player added', response);
      dispatch({
        type: ADD_PLAYER,
        payload: response.data
      });
    });
  }
}

export function addNPC() {
  
}

export function addLocation() {

}

export function addLore() {

}

export function getCampaignData() {
  
}