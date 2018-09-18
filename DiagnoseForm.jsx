import React from 'react'
import { runInThisContext } from 'vm';

export default class DiagnoseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visit: { id: props.diagnosingPatient.visitId }, diseases: [] }
    }

    componentWillReceiveProps(newProps) {
        this.setState({visit: {id: newProps.diagnosingPatient.visitId}})
    }

    handleDiagnose(e) {
        var diseases = [...e.target.options].filter(o => o.selected).map(o => ({ "id": o.value }))
        this.setState({ diseases: diseases })
    }

    validate() {
        if (this.state.visit.id == '' || this.state.diseases.length == 0) return false
        return true
    }

    onDiagnose() {
        if (this.validate.bind(this)() == false) {
            alert('Please select a visit then select a disease')
            return
        }
        var access_token = localStorage.getItem('access_token')
        fetch(`https://clinicmana3.herokuapp.com/diagnoses?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ visit: this.state.visit, diseases: this.state.diseases })
        })
            .then(res => res.json())
            .then(d => {
                alert(`Diagnosis added (ID: ${d.id})! Disease IDs: ` + d.diseases.map(ds=>ds.id))
            })
            .then(()=>this.props.dispatch({type: 'RESET'}))
    }


    render() {
        return (
            <div>
                <div className='panel panel-success'>
                    <div className='panel-heading'>Diagnose Form for VISIT #{this.state.visit.id} </div>
                    <div className='panel-body'>
                        <div className='form-group'>
                            <label>Mutiple select list (hold shift to select more than one):</label>
                            <select multiple className="form-control" onChange={this.handleDiagnose.bind(this)}>
                                {this.props.icds.map(s =>
                                    <option key={s.id} value={s.id}>{s.diseaseCode + " " + s.diseaseName}</option>)}

                            </select>
                        </div>
                        <button className='btn btn-success' onClick={this.onDiagnose.bind(this)}>Post</button>
                    </div>
                </div>
            </div>
        )
    }
}