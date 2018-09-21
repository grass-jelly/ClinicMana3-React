import React from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import "./Login.css"
export default class Login extends React.Component {
    constructor() {
        super()
        this.state = { message: '', username: '', password: '' }
    }

    login() {
        //use fetch to send username/password to API
        //if it is true
        this.setState({message: 'Please wait. Logging in...'})
        fetch(`https://clinicmana3.herokuapp.com/oauth/token?grant_type=password&username=${this.state.username}&password=${this.state.password}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Basic Y2xpZW50LWlkOnNlY3JldA=='
                },
                method: 'post',
            }
        )
            .then(res => res.json())
            .then(result => {
                if (result.access_token != null) {
                    localStorage.setItem('access_token', result.access_token)
                    this.props.dispatch({ type: 'AUTHENTICATED', payload: result.access_token })
                }
                else
                    this.setState({ message: 'Wrong username/password. Please retry' })

            })
            .catch(error => {
                this.setState({ message: 'Remote server is not accessible' })
            })


    }

    handleChange(e) {
        var change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    render() {
        return (
            <div>
                <div className="Login">
                    <form>
                        <FormGroup controlId="username" bsSize="large">
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                name="username"
                                onChange={this.handleChange.bind(this)}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                onChange={this.handleChange.bind(this)}
                                type="password"
                                name="password"
                            />
                        </FormGroup>
                        <Button
                            block
                            bsSize="large"
                            onClick={this.login.bind(this)}
                        >
                            Login
                    </Button>
                    </form>

                </div>
                <div>{this.state.message}</div>
            </div>

        )
    }
}

