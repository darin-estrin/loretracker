import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  START_CAMPAIGN,
  FETCH_CAMPAIGN,
  ADD_CAMPAIGN_DATA,
  FETCH_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3090';
const token = localStorage.getItem('token');

export function startCampaign(formProps){
  return function(dispatch) {
    axios.put(`${ROOT_URL}/startCampaign`, formProps, {
      headers: { authorization: token }
    })
    .then(response => {
      dispatch({
        type: START_CAMPAIGN,
        payload: response.data
      });
    })
  }
}

export function getCampaignData(id, type) {
  return function(dispatch) {
    console.log(id, type);
    axios.get(`${ROOT_URL}/campaigndata`, {
      headers: { authorization: token, id, type }
    })
    .then(response => {
      dispatch({
        type: FETCH_CAMPAIGN,
        payload: response.data
      })
    })
    .catch((error) => {
      browserHistory.push('/campaigns');
    });
  }
}

export function addPlayer(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/addPlayer`, request, {
      headers: { authorization: token }
    })
    .then(response => {
      dispatch({
        type: ADD_CAMPAIGN_DATA,
        payload: response.data
      });
    })
    .catch(error => dispatch(fetchError(error.response.data.error)));
  }
}

export function addNPC(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/addnpc`, request, {
      headers: { authorization: token }
    })
    .then(response => {
      console.log(response);
      dispatch({
        type: ADD_CAMPAIGN_DATA,
        payload: response.data
      });
    })
    .catch(error => console.log(error));
  }
}

export function addLocation() {

}

export function addLore() {

}

export function fetchError(error) {
  return {
    type: FETCH_ERROR,
    payload: error
  };
}