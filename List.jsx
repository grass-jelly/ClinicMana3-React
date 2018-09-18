import React from 'react'

export default class List extends React.Component {

    constructor() {
        super()
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
    }

    onDelete(id) {
        var access_token = localStorage.getItem('access_token')
        if (!confirm('Do you want to delete?')) return
        var access_token = localStorage.getItem('access_token')
        fetch(`https://clinicmana3.herokuapp.com/patients/${id}?access_token=${access_token}`, {
            method: 'delete'
        })
            .then(() => this.props.dispatch({ type: 'DELETE_PATIENT', payload: id }))
    }

    onEdit(id, name, dateOfBirth, gender, address) {
        this.props.dispatch({ type: 'EDIT_PATIENT', payload: { id: id, name: name, dateOfBirth: dateOfBirth, gender: gender, address: address } })
    }
    render() {
        return (
            <div>
                <div className='panel panel-success'>
                    <div className='panel-heading'>Patient List</div>
                    <div className='panel-body'>

                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Date of Birth</th>
                                    <th>Gender</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.patients.map(s =>
                                    <tr key={s.id}>
                                        <td>{s.id}</td>
                                        <td>{s.name}</td>
                                        <td>{s.dateOfBirth}</td>
                                        <td>{s.gender}</td>
                                        <td>{s.address}</td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" className="btn btn-default" onClick={this.onEdit.bind(this, s.id, s.name, s.dateOfBirth, s.gender, s.address)}>Edit</button>
                                                <button type="button" className="btn btn-default" onClick={this.onDelete.bind(this, s.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}