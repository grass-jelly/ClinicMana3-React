import React from 'react'

export default class SearchVisits extends React.Component {
    constructor() {
        super()
        this.state = { patient: '', date: '', searchingPatient: false, searchingDate: false }
    }
    handleChange(e) {
        var newvalue = {}
        newvalue[e.target.name] = e.target.value
        this.setState(newvalue)
    }

    onClear() {
        var access_token = localStorage.getItem('access_token')
        fetch(`https://clinicmana3.herokuapp.com/visits?access_token=${access_token}`)
            .then(res => res.json())
            .then(visits => {
                this.props.dispatch({ type: 'FETCH_VISITS', payload: visits })
            })
        this.setState({ patient: '', date: '', searchingPatient: false, searchingDate: false })
    }

    onSearch() {
        var access_token = localStorage.getItem('access_token')
        if (this.state.patient != '') {
            this.setState({ searchingPatient: true })

            fetch(`https://clinicmana3.herokuapp.com/visitsByPatient?patientId=${this.state.patient}&access_token=${access_token}`)
                .then(res => res.json())
                .then(visits => {
                    this.props.dispatch({ type: 'FETCH_VISITS', payload: visits })
                })
        } else if (this.state.date != '') {
            this.setState({ searchingDate: true })
            fetch(`https://clinicmana3.herokuapp.com/visitsByDay?date=${this.state.date}&access_token=${access_token}`)
                .then(res => res.json())
                .then(visits => {
                    this.props.dispatch({ type: 'FETCH_VISITS', payload: visits })
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
                            <input type="text" className="form-control" placeholder="Search by Patient ID" name="patient" value={this.state.patient} onChange={this.handleChange.bind(this)} />
                            <div className="input-group-btn">
                                {this.state.searchingPatient ? btnClear : btnSearch}
                            </div>
                        </div>
                        <hr />
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search by Date" name="date" value={this.state.date} onChange={this.handleChange.bind(this)} />
                            <div className="input-group-btn">
                                {this.state.searchingDate ? btnClear : btnSearch}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
