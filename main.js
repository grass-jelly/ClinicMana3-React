import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

//write the first reducer:
function students(state=[], action){
    if(action.type=='FETCH_STUDENT')
        return action.payload
    else if(action.type=='ADD_STUDENT')
        return [].concat(state, action.payload)
    else
        return state
}

function editingStudent(state = {}, action){
    if(action.type=='EDIT_STUDENT')
        return action.payload
    else
        return state
}
//reducers
function authenticate(state = {loggedin: false}, action){
    if(action.type=='AUTHENTICATED')
        return {loggedin: true, access_token: action.payload}
    return state
}


var centralState = combineReducers({
   students, editingStudent, authenticate
})

var store = createStore(centralState, applyMiddleware(thunk))



ReactDOM.render(
<Provider store={store}>    
    <App />
</Provider>    
    , document.getElementById('app')

)