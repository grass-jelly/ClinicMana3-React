import React from 'react'

export default class Form extends React.Component {
    constructor() {
        super()
        this.state = { id: '', name: '', dateOfBirth: '', gender: '', address: '' }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            id: newProps.editedPatient.id,
            name: newProps.editedPatient.name,
            dateOfBirth: newProps.editedPatient.dateOfBirth,
            gender: newProps.editedPatient.gender,
            address: newProps.editedPatient.address
        })
    }
    handleChange(e) {
        var newvalue = {}
        newvalue[e.target.name] = e.target.value
        this.setState(newvalue)
    }

    onSave() {
        var access_token = localStorage.getItem('access_token')
        if (this.state.id === '') {
            fetch(`http://localhost:8080/patients?access_token=${access_token}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(this.state)
            })
                .catch(err => {
                    console.log(err)
                })
                .then(res => res.json())
                .then(patient => {
                    console.log(patient)
                    this.props.dispatch({ type: 'ADD_PATIENT', payload: patient })
                })
        }
        else {
            fetch(`http://localhost:8080/patients?access_token=${access_token}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                method: 'put',
                body: JSON.stringify({ id: this.state.id, name: this.state.name, dateOfBirth: this.state.dateOfBirth, gender: this.state.gender, address: this.state.address })
            })
                .then(() => {
                    this.props.dispatch({ type: 'EDIT_PATIENT', payload: { id: '', name: '', dateOfBirth: '', gender: '', address: '' } })
                    fetch(`http://localhost:8080/patients?access_token=${access_token}`)
                        .catch(err => {
                            console.log(err)
                        })
                        .then(res => res.json())
                        .then(patients => this.props.dispatch({ type: 'FETCH_PATIENTS', payload: patients }))
                })
        }

    }

    render() {
        return (
            <div>
                <div className='panel panel-default'>
                    <div className='panel-heading'>Patient Form</div>
                    <div className='panel-body'>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name='name'
                            value={this.state.name} className='form-control' onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input type="text" name='dateOfBirth'
                            value={this.state.dateOfBirth} className='form-control' onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <div className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        onChange={this.handleChange.bind(this)}
                                        value='MALE'
                                        checked={this.state.gender === 'MALE'}
                                    />
                                    Male
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        onChange={this.handleChange.bind(this)}
                                        value='FEMALE'
                                        checked={this.state.gender === 'FEMALE'}
                                    />
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" name='address'
                            value={this.state.address} className='form-control' onChange={this.handleChange.bind(this)} />
                        </div>
                        <button className='btn btn-default' onClick={this.onSave.bind(this)}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
}