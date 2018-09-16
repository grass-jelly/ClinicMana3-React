import React from 'react'
import { runInThisContext } from 'vm';

export default class DiagnoseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visit: { id: props.processingPatient.visitId }, diseases: [], diagnosed: false }
    }

    handleDiagnose(e) {
        var diseases = [...e.target.options].filter(o => o.selected).map(o => ({ "id": o.value }))
        this.setState({ diseases: diseases })
    }

    validate() {
        if (this.state.diseases.length == 0) return false
        return true
    }

    onDiagnose() {
        if (this.validate.bind(this)() == false) {
            alert('Please choose a disease')
            return
        }
        this.setState({ diagnosed: true })
        var access_token = localStorage.getItem('access_token')
        fetch(`http://localhost:8080/diagnoses?access_token=${access_token}`, {
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
    }


    render() {
        return (
            <div>
                <div className='panel panel-warning'>
                    <div className='panel-heading'>Diagnose Form</div>
                    <div className='panel-body'>
                        <div className='form-group'>
                            <label>Mutiple select list (hold shift to select more than one):</label>
                            <select multiple className="form-control" onChange={this.handleDiagnose.bind(this)}>
                                {this.props.icds.map(s =>
                                    <option key={s.id} value={s.id}>{s.diseaseCode + " " + s.diseaseName}</option>)}

                            </select>
                        </div>
                        {this.state.diagnosed == false ?
                        <button className='btn btn-warning' onClick={this.onDiagnose.bind(this)}>Post</button>
                    : <button className='btn btn-warning disabled' >Post</button>}
                    </div>
                </div>
            </div>
        )
    }
}