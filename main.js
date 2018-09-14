import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

//write the first reducer:
function patients(state = [], action) {
    if (action.type == 'FETCH_PATIENTS')
        return action.payload
    else if (action.type == 'ADD_PATIENT')
        return [].concat(state, action.payload)
    else if (action.type == 'DELETE_PATIENT') {
        return state.filter(s => s.id != action.payload)
    }
    else
        return state
}

function visits(state = [], action) {
    if (action.type == 'FETCH_VISITS')
        return action.payload
    // else if (action.type == 'ADD_PATIENT')
    //     return [].concat(state, action.payload)
    // else if (action.type == 'DELETE_PATIENT') {
    //     return state.filter(s => s.id != action.payload)
    // }
    else
        return state
}

function icds(state = [], action) {
    if (action.type == 'FETCH_ICDS')
        return action.payload
    else
        return state
}

function visitId(state = '', action) {
    if (action.type == 'DIAGNOSE')
        return action.payload
    else return state
}

function editedPatient(state = { id: '', name: '', dateOfBirth: '', gender: '', address: '' }, action) {
    if (action.type == 'EDIT_PATIENT')
        return action.payload
    else
        return state
}
//reducers
function authenticate(state = { loggedin: false }, action) {
    if (action.type == 'AUTHENTICATED')
        return { loggedin: true, access_token: action.payload }
    return state
}


var centralState = combineReducers({
    patients, editedPatient, authenticate,
    visits, icds, visitId
})

var store = createStore(centralState, applyMiddleware(thunk))



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app')

)