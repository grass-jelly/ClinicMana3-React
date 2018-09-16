import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
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
    else if (action.type == 'ADD_VISIT')
        return [].concat(state, action.payload)
    else if (action.type == 'DELETE_VISIT') {
        return state.filter(s => s.id != action.payload)
    }
    else
        return state
}

function icds(state = [], action) {
    if (action.type == 'FETCH_ICDS')
        return action.payload
    else
        return state
}

function medicalServices(state = [], action) {
    if (action.type == 'FETCH_MSS')
        return action.payload
    else
        return state
}

function drugs(state = [], action) {
    if (action.type == 'FETCH_DRUGS') return action.payload
    else return state
}

function diagnosingPatient(state = { visitId: '' }, action) {
    if (action.type == 'DIAGNOSE')
        return action.payload
    else return state
}

function orderingLabtest(state = { visitId: '' }, action) {
    if (action.type == 'ORDER_LABTEST')
        return action.payload
    else return state
}

function prescribing(state = { pid: '' }, action) {
    if (action.type == 'PRESCRIBE')
        return action.payload
    else return state
}

function editingVisit(state = { id: '', patient: {id: ''}, date: '', time: '', problems: ''}, action) {
    if (action.type == 'EDIT_VISIT')
        return action.payload
    else
        return state
}

function showingForm(state = 'visitForm', action) {
    switch (action.type) {
        case 'DIAGNOSE':
            return 'diagnoseForm'
        case 'EDIT_VISIT': 
            return 'visitForm'
        case 'ORDER_LABTEST':
            return 'labtestForm'
        case 'PRESCRIBE':
            return 'prescribeForm'
        default:
            return state
    }
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
    visits, icds, medicalServices, drugs,
    diagnosingPatient, orderingLabtest, editingVisit, prescribing,
    showingForm
})

var store = createStore(centralState, composeWithDevTools(
    applyMiddleware(thunk)
))
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app')

)