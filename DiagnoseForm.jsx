import React from 'react'

export default class DiagnoseForm extends React.Component {
    constructor() {
        super()
        this.state = { visit: {id:''}, diseases: [] }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            visit: {id: newProps.visitId}
        })
    }

    handleChange(e) {
        var diseases = [...e.target.options].filter(o => o.selected).map(o => ({"id": o.value}))
        this.setState({ diseases: diseases })
    }

    onSave() {
        var access_token = localStorage.getItem('access_token')
            fetch(`http://localhost:8080/diagnoses?access_token=${access_token}`, {
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
                .then(()=>{
                    this.props.dispatch({ type: 'DIAGNOSE', payload: '' })
                })
    }

    render() {
        return (
            <div className='panel panel-warning'>
                <div className='panel-heading'>Diagnose Form | Visit ID: {this.state.visit.id}</div>
                <div className='panel-body'>
                    <div className='form-group'>
                        <label>Mutiple select list (hold shift to select more than one):</label>
                        <select multiple className="form-control" onChange={this.handleChange.bind(this)}>
                        {this.props.icds.map(s=>
                            <option key={s.id} value={s.id}>{s.diseaseCode + " "+ s.diseaseName}</option>)}
                            
                        </select>
                    </div>
                    <button className='btn btn-warning' onClick={this.onSave.bind(this)}>Post</button>
                </div>
            </div>
        )
    }
}
// value={this.props.diseases} 