import React from 'react'

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {message: '', username: '', password: ''}
    }

    login(){
        //use fetch to send username/password to API
        //if it is true
        fetch(`http://localhost:8080/oauth/token?grant_type=password&username=${this.state.username}&password=${this.state.password}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Basic Y2xpZW50LWlkOnNlY3JldA=='
                },
                method: 'post',
            }
        )
        .then(res=>res.json())
        .then(result=>{
            if(result.access_token!=null){   
                localStorage.setItem('access_token', result.access_token)        
                this.props.dispatch({type: 'AUTHENTICATED', payload: result.access_token})
            }                       
            else
                this.setState({message: 'Wrong username/password. Please retry'})
            
        }).catch(error=>{
            this.setState({message: 'Remote server is not accessible'})
        })
        
    }
    handleChange(e){
        var change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    render(){
        return(
             <div>
                 <label htmlFor="">Username</label>
                 <input type="text" name='username' onChange={this.handleChange.bind(this)} className='form-control'/>
                 <label htmlFor="">Password</label>
                 <input type="password" name='password' onChange={this.handleChange.bind(this)} className='form-control'/>
                 <button className='btn btn-default' onClick={this.login.bind(this)}>Login</button>
                <div>{this.state.message}</div>
             </div>   
        )
    }
}