import React from 'react'

export default class Search extends React.Component {
    constructor() {
        super()
        this.state = { name: '', dateOfBirth: '', searchingName: false, searchingDob: false }
    }
    handleChange(e) {
        var newvalue = {}
        newvalue[e.target.name] = e.target.value
        this.setState(newvalue)
    }

    onClear() {
        var access_token = localStorage.getItem('access_token')
        fetch(`https://clinicmana3.herokuapp.com/patients?access_token=${access_token}`)
            .catch(err => {
                console.log(err)
            })
            .then(res => res.json())
            .then(patients => {
                this.props.dispatch({ type: 'FETCH_PATIENTS', payload: patients })
            })
        this.setState({ name: '', dateOfBirth: '', searchingName: false, searchingDob: false })
    }

    onSearch() {
        var access_token = localStorage.getItem('access_token')
        if (this.state.name !== '') {
            this.setState({ searchingName: true })

            fetch(`https://clinicmana3.herokuapp.com/patientsByName?name=${this.state.name}&access_token=${access_token}`)
                .catch(err => {
                    console.log(err)
                })
                .then(res => res.json())
                .then(patients => {
                    this.props.dispatch({ type: 'FETCH_PATIENTS', payload: patients })
                })
        } else if (this.state.dateOfBirth !== '') {
            this.setState({ searchingDob: true })
            fetch(`https://clinicmana3.herokuapp.com/patientsByDOB?dob=${this.state.dateOfBirth}&access_token=${access_token}`)
                .catch(err => {
                    console.log(err)
                })
                .then(res => res.json())
                .then(patients => {
                    this.props.dispatch({ type: 'FETCH_PATIENTS', payload: patients })
                })
        }
    }
    render() {
        let btnSearch = <button className="btn btn-default" onClick={this.onSearch.bind(this)}>
            <i className="glyphicon glyphicon-search"></i>
        </button>
        let btnClear = <button className="btn btn-default" onClick={this.onClear.bind(this)}>
            <i className="glyphicon glyphicon-remove-circle"></i>
        </button>
        return (
            <div>
                <div className='panel panel-success'>
                    <div className='panel-heading'>Search Form</div>
                    <div className='panel-body'>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search by Name" name="name"  value={this.state.name} onChange={this.handleChange.bind(this)} />
                            <div className="input-group-btn">
                                {this.state.searchingName ? btnClear : btnSearch}
                            </div>
                        </div>
                        <hr />
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search by Date of Birth" name="dateOfBirth"  value={this.state.dateOfBirth} onChange={this.handleChange.bind(this)} />
                            <div className="input-group-btn">
                                {this.state.searchingDob ? btnClear : btnSearch}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}