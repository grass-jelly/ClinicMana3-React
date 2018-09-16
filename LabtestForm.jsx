import React from 'react'

export default class LabtestForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visit: { id: props.processingPatient.visitId }, medicalServices: [], ordered: false }
    }

    validate() {
        if (this.state.medicalServices.length == 0) return false
        return true
    }

    handleChange(e) {
        var medicalServices = [...e.target.options].filter(o => o.selected).map(o => ({ "id": o.value }))
        this.setState({ medicalServices: medicalServices })
    }

    onSave() {
        if (this.validate.bind(this)() == false) {
            alert('Please choose a test')
            return
        }
        this.setState({ordered: true})
        var access_token = localStorage.getItem('access_token')
        fetch(`http://localhost:8080/labTests?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(this.state)
        })

            .then(res => res.json())
            .then(d => {
                alert(`Labtest Order added (ID: ${d.id})! Medical Services IDs: ` + d.medicalServices.map(ds => ds.id))
            })
    }

    render() {
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>Labtest Order Form</div>
                <div className='panel-body'>
                    <div className='form-group'>
                        <label>Mutiple select list (hold shift to select more than one):</label>
                        <select multiple className="form-control" onChange={this.handleChange.bind(this)}>
                            {this.props.medicalServices.map(s =>
                                <option key={s.id} value={s.id}>{s.id + " " + s.name}</option>)}

                        </select>
                    </div>
                    {this.state.ordered == false ?
                        <button className='btn btn-default' onClick={this.onSave.bind(this)}>Post</button>
                    : <button className='btn btn-default disabled' >Post</button>}
                </div>
            </div>
        )
    }
}