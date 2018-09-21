import React from 'react'
export default class VisitForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { id: props.editingVisit.id, patient: props.editingVisit.patient.id, date: props.editingVisit.date, time: props.editingVisit.time, problems: props.editingVisit.problems }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            id: newProps.editingVisit.id,
            patient: newProps.editingVisit.patient.id,
            date: newProps.editingVisit.date,
            time: newProps.editingVisit.time,
            problems: newProps.editingVisit.problems
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
            if (this.state.patient == '') {
                alert('Please select a patient')
                return
            }
            fetch(`https://clinicmana3.herokuapp.com/visits?access_token=${access_token}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify({ patient: { id: this.state.patient }, problems: this.state.problems })
            })
                .then(() => {
                    fetch(`https://clinicmana3.herokuapp.com/visits?access_token=${access_token}`)
                        .then(res => res.json())
                        .then(visits => this.props.dispatch({ type: 'FETCH_VISITS', payload: visits }))
                })
        }
        else {
            fetch(`https://clinicmana3.herokuapp.com/visits?access_token=${access_token}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                method: 'put',
                body: JSON.stringify({ id: this.state.id, patient: { id: this.state.patient }, date: this.state.date, time: this.state.time, problems: this.state.problems })
            })
                .then(() => {
                    this.props.dispatch({
                        type: 'EDIT_VISIT',
                        payload: { id: '', patient: { id: '' }, date: '', time: '', problems: '' }
                    })
                    fetch(`https://clinicmana3.herokuapp.com/visits?access_token=${access_token}`)
                        .then(res => res.json())
                        .then(visits => this.props.dispatch({ type: 'FETCH_VISITS', payload: visits }))
                })
        }

    }

    render() {
        return (
            <div>
                <div className='panel panel-success'>
                    <div className='panel-heading'>Visit Form</div>
                    <div className='panel-body'>
                        <div className="form-group">
                            <label>Patient</label>
                            {!this.props.patients.length ?
                                <div>Please wait. Fetching patients...</div>
                                :
                                <select className="form-control" name='patient' value={this.state.patient} onChange={this.handleChange.bind(this)}>
                                    <option value="select">Select</option>
                                    {this.props.patients.map(s =>
                                        <option key={s.id} value={s.id}>{s.id} {s.name}</option>)}
                                </select>
                            }

                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="text" name='date'
                                value={this.state.date} className='form-control' onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label>Time</label>
                            <input type="text" name='time'
                                value={this.state.time} className='form-control' onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label>Problems</label>
                            <input type="text" name='problems'
                                value={this.state.problems} className='form-control' onChange={this.handleChange.bind(this)} />
                        </div>
                        <button className='btn btn-success' onClick={this.onSave.bind(this)}>Save</button>
                    </div>
                </div>
            </div>
        )
    }

}