import React from 'react'
export default class Reports extends React.Component {
    constructor() {
        super()
        this.state = { vcs: [], dcs: []}
    }
    componentDidMount() {
        var access_token = localStorage.getItem('access_token')
        fetch(`https://clinicmana3.herokuapp.com/visitsCountPerDay/?access_token=${access_token}`)
            .then(res => res.json())
            .then(vcs => this.setState({vcs}))
        fetch(`https://clinicmana3.herokuapp.com/drugCounts/?access_token=${access_token}`)
            .then(res => res.json())
            .then(dcs => this.setState({dcs}))
    }
    render() {
        return (
            <div className='row'>
                <div className='col-md-4'>
                    <div className='panel panel-success'>
                        <div className='panel-heading'>Visit Counts</div>
                        <div className='panel-body'>
                        <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.vcs.map((vc,i)=>
                                <tr key={i}>
                                    <td>{vc.date}</td>
                                    <td>{vc.count}</td>
                                </tr>
                            
                                )}                            
                        </tbody>
                        </table>
                        </div>
                    </div>
                </div>   
                <div className='col-md-8'>
                    <div className='panel panel-success'>
                        <div className='panel-heading'>Drug Counts</div>
                        <div className='panel-body'>
                        <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Drug</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.dcs.map((dc,i)=>
                                <tr key={i}>
                                    <td>{dc.drugName}</td>
                                    <td>{dc.count}</td>
                                </tr>
                            
                                )}                            
                        </tbody>
                        </table>
                        </div>
                    </div>
                </div>    
            </div>
        )
    }
}