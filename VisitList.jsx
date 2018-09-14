import React from 'react'

export default class VisitList extends React.Component {

    constructor() {
        super()
        this.state = {diagnosed: []}
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

    onDiagnose(id) {
        console.log('id'+id)
        var diagnosed = [...this.state.diagnosed, id]
        console.log('diagnosed'+diagnosed)
        this.setState({
            diagnosed: diagnosed
          })
        this.props.dispatch({type: 'DIAGNOSE', payload:id})
    }
    render() {
        

        return (
            <div>
                <div className='panel panel-primary'>
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
                                    let btnActive = <button type="button" className="btn btn-warning" onClick={this.onDiagnose.bind(this, s.id)}>Diagnose</button>
                                    let btnDisabled = <button type="button" className="btn btn-warning disabled">Diagnose</button>
                                    return <tr key={s.id}>
                                    <td>{s.patient.id}</td>
                                    <td>{s.patient.name}</td>
                                    <td>{s.date}</td>
                                    <td>{s.time}</td>
                                    <td>{s.problems.map(p => p + ", ")}</td>
                                    <td>{this.state.diagnosed.includes(s.id) ? btnDisabled : btnActive}</td>
                                            {/* <button type="button" className="btn btn-success">Prescribe</button>
                                            <button type="button" className="btn btn-info">Labtest</button> */}
                                    {/* <td><button type="button" className="btn btn-default" onClick={this.onEdit.bind(this, s.id, s.name, s.dateOfBirth, s.gender, s.address)}>Diagnose</button></td> */}
                                    {/* <td><button type="button" className="btn btn-default" onClick={this.onDelete.bind(this, s.id)}>Delete</button></td> */}
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