import React from 'react'
import { SIGABRT } from 'constants';

export default class VisitList extends React.Component {

    constructor(props) {
        super(props)
        this.state = { visit: { id: '' }, value: 'select' }
    }

    componentDidMount() {
        var access_token = localStorage.getItem('access_token')
        fetch(`https://clinicmana3.herokuapp.com/patients/?access_token=${access_token}`)
            .catch(err => {
                console.log(err)
            })
            .then(res => res.json())
            .then(patients => {
                this.props.dispatch({ type: 'FETCH_PATIENTS', payload: patients })
            })
        fetch(`https://clinicmana3.herokuapp.com/visits/?access_token=${access_token}`)
            .catch(err => {
                console.log(err)
            })
            .then(res => res.json())
            .then(visits => {
                this.props.dispatch({ type: 'FETCH_VISITS', payload: visits })
            })
        
        fetch(`https://clinicmana3.herokuapp.com/icds/?access_token=${access_token}`)
            .then(res => res.json())
            .then(icds => {
                this.props.dispatch({ type: 'FETCH_ICDS', payload: icds })
            })
        fetch(`https://clinicmana3.herokuapp.com/medicalServices/?access_token=${access_token}`)
            .then(res => res.json())
            .then(mss => {
                this.props.dispatch({ type: 'FETCH_MSS', payload: mss })
            })
        fetch(`https://clinicmana3.herokuapp.com/drugs/?access_token=${access_token}`)
            .then(res => res.json())
            .then(drugs => {
                this.props.dispatch({ type: 'FETCH_DRUGS', payload: drugs })
            })
    }

    handleVisit(s, e) {
        this.setState({
            visit: s,
            value: 'select'
        })
    }

    handleChange(e) {
        if (e.target.value == 'add') {
            this.setState({ value: 'add', visit: {id: ''} }, () => { this.onAdd.bind(this)() })
            return
        }
        if (this.state.visit.id == '') {
            alert('Please select a visit')
            return
        }
        this.setState({ value: e.target.value }, () => {
            var action = this.state.value
            if (action == 'diagnose') this.onDiagnose.bind(this)()
            else if (action == 'orderLabtest') this.onOrderLabtest.bind(this)()
            else if (action == 'edit') this.onEdit.bind(this)()
            else if (action == 'prescribe') this.onPrescribe.bind(this)()
            else if (action == 'delete') this.onDelete.bind(this)()
        })
    }

    onAdd() {
        this.props.dispatch({
            type: 'EDIT_VISIT',
            payload: { id: '', patient: { id: '' }, date: '', time: '', problems: '' }
        })
    }

    onDelete() {
        var access_token = localStorage.getItem('access_token')
        if (!confirm('Do you want to delete?')) return
        var access_token = localStorage.getItem('access_token')
        fetch(`https://clinicmana3.herokuapp.com/visits/${this.state.visit.id}?access_token=${access_token}`, {
            method: 'delete'
        })
            .then(() => this.props.dispatch({ type: 'DELETE_VISIT', payload: this.state.visit.id }))
    }

    onEdit() {
        this.props.dispatch({
            type: 'EDIT_VISIT',
            payload: this.state.visit
        })

    }

    onDiagnose() {
        this.props.dispatch({
            type: 'DIAGNOSE',
            payload: { visitId: this.state.visit.id }
        })
    }

    onOrderLabtest() {
        this.props.dispatch({
            type: 'ORDER_LABTEST',
            payload: { visitId: this.state.visit.id }
        })
    }

    onPrescribe() {
        var access_token = localStorage.getItem('access_token')
        fetch(`https://clinicmana3.herokuapp.com/prescriptions?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ visit: { id: this.state.visit.id } })
        })
            .then(res => res.json())
            .then(pid => {
                this.props.dispatch({ type: 'PRESCRIBE', payload: { pid: pid } })
            })
    }

    
    render() {
        return (
            <div>
                <div className='panel panel-success'>
                    <div className='panel-heading'>
                    Visit List
                   
                    </div>
                    <div className='panel-body'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Visit ID</th>
                                    <th>Patient ID</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Problems</th>
                                    <th>
                                        <select className="form-control"
                                            onChange={this.handleChange.bind(this)}
                                            value={this.state.value}>
                                            <option value="select">Select</option>
                                            <option value="add">Add</option>
                                            <option value="diagnose">Diagnose</option>
                                            <option value="orderLabtest">Order Labtest</option>
                                            <option value="prescribe">Prescribe</option>
                                            <option value="edit">Edit</option>
                                            <option value="delete">Delete</option>
                                        </select>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.visits.map(s => {
                                    return <tr key={s.id}>
                                        <td>{s.id}</td>
                                        <td>{s.patient.id}</td>
                                        <td>{s.date}</td>
                                        <td>{s.time}</td>
                                        <td>{s.problems}</td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="visit"
                                                onChange={this.handleVisit.bind(this, s)}
                                                value={s.id}
                                                checked={this.state.visit.id === s.id}
                                            />
                                        </td>
                                    </tr>
                                }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}