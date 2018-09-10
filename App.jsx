import React from 'react'
import {connect} from 'react-redux'
import List from './List.jsx'
import Form from './Form.jsx'
import Hello from './Hello.jsx'
import About from './About.jsx'
import {browserHistory} from 'react-router'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'
import Login from './Login.jsx';

class App extends React.Component{

    logout(){
        this.props.dispatch({type: 'LOGOUT'})
    }

    render(){

        return (
            <div>
               <div className="jumbotron">
                    <h1>React/Redux project</h1>
                    <p>It is hard but really cool!</p>
               </div>

                <Router>
                   {this.props.authenticate.loggedin==true?
                    <div> 
                    <ul>
                        <li><Link to={'/About'}>About</Link></li>
                        <li><Link to={'/Hello'}>Hello</Link></li>
                        <li><Link to={'/Students'}>Students</Link></li>
                        <li><a href='#' onClick={this.logout.bind(this)}>Logout</a></li>
                    </ul>
                
                    <Switch>                 
                        <Route path='/About' component={About}  />
                        <Route path='/Hello' component={Hello}  />
                        <Route path='/Students' render={()=>
                            <div className='row'>
                            <div className='col-md-4'>
                            <List access_token={this.props.authenticate.access_token} students={this.props.students} dispatch={this.props.dispatch}/>
                            </div>

                            <div className='col-md-8'>
                            <Form dispatch={this.props.dispatch} editingStudent={this.props.editingStudent}/>
                            </div>
                            </div>
                        } 
                        />
                    </Switch> 
                   
                    </div> 
                   :
                   <div> 
                       <Login dispatch={this.props.dispatch} />

                   </div> 
                  
                }

                   
                </Router>    
       
           </div>

        )
    }
    
}

function mapStateToProps(centralState){
    return {
       students: centralState.students,
       courses: centralState.courses,
       editingStudent: centralState.editingStudent,
       authenticate: centralState.authenticate
    }
}


export default connect(mapStateToProps)(App)