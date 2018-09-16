import React from 'react'

export default class VisitList extends React.Component {

    constructor() {
        super()
    }

    componentDidMount() {
        var access_token = localStorage.getItem('access_token')
        fetch(`http://localhost:8080/visits/current/?access_token=${access_token}`)
            .catch(err => {
                console.log(err)
            })
            .then(res => res.json())
            .then(visits => {
                this.props.dispatch({ type: 'FETCH_VISITS', payload: visits })
            })
    }

    onProcess(id) {
        var access_token = localStorage.getItem('access_token')
        fetch(`http://localhost:8080/prescriptions?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ visit: { id: id } })
        })
            .then(res => res.json())
            .then(pid => {
                console.log(pid)
                this.props.dispatch({ type: 'PROCESS_PATIENT', payload: { visitId: id, prescriptionId: pid } })
            })
    }

    render() {


        return (
            <div>
                <div className='panel panel-default'>
                    <div className='panel-heading'>Visit List</div>
                    <div className='panel-body'>

                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Patient ID</th>
                                    <th>Patient Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Problems</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.visits.map(s => {
                                    return <tr key={s.id}>
                                        <td>{s.patient.id}</td>
                                        <td>{s.patient.name}</td>
                                        <td>{s.date}</td>
                                        <td>{s.time}</td>
                                        <td>{s.problems}</td>
                                        <td><button type="button" className="btn btn-default" onClick={this.onProcess.bind(this, s.id)}>Process</button></td>
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