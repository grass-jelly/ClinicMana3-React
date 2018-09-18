import React from 'react'

export default class LabtestForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visit: { id: props.orderingLabtest.visitId }, medicalServices: [] }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ visit: { id: newProps.orderingLabtest.visitId } })
    }

    validate() {
        if (this.state.visit.id == '' || this.state.medicalServices.length == 0) return false
        return true
    }

    handleChange(e) {
        var medicalServices = [...e.target.options].filter(o => o.selected).map(o => ({ "id": o.value }))
        this.setState({ medicalServices: medicalServices })
    }

    onSave() {
        if (this.validate.bind(this)() == false) {
            alert('Please select a visit then select a service')
            return
        }
        this.setState({ ordered: true })
        var access_token = localStorage.getItem('access_token')
        fetch(`https://clinicmana3.herokuapp.com/labTests?access_token=${access_token}`, {
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
            <div className='panel panel-success'>
                <div className='panel-heading'>Labtest Order Form for VISIT #{this.state.visit.id}</div>
                <div className='panel-body'>
                    <div className='form-group'>
                        <label>Mutiple select list (hold shift to select more than one):</label>
                        <select multiple className="form-control" onChange={this.handleChange.bind(this)}>
                            {this.props.medicalServices.map(s =>
                                <option key={s.id} value={s.id}>{s.id + " " + s.name}</option>)}

                        </select>
                    </div>
                    <button className='btn btn-success' onClick={this.onSave.bind(this)}>Post</button>
                </div>
            </div>
        )
    }
}