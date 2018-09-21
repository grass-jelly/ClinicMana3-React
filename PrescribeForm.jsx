import React from 'react'

export default class PrescribeForm extends React.Component {
    constructor(props) {
        super()
        this.state = {
            prescription: { id: props.prescribing.pid },
            drug: { id: '' },
            quantity: '',
            dose: '',
            howToUse: ''
        }
    }

    validate() {
        if (this.state.drug.id == '' || this.state.quantity == '' || this.state.dose == '' || this.state.howToUse == '')
            return false
        return true
    }

    handleChange(e) {
        var newvalue = Object.assign({}, this.state)
        newvalue[e.target.name] = e.target.value
        this.setState(newvalue)
    }

    handleDrug(e) {
        var drugId = e.target.value
        var drug = { drug: { id: drugId } }
        this.setState(drug)
    }

    onPost() {
        if (this.validate.bind(this)() == false) {
            alert('Please fill in all fields in Prescribe Form')
            return
        }
        var access_token = localStorage.getItem('access_token')
        fetch(`https://clinicmana3.herokuapp.com/drugInfos?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(d => alert(`Drug Info (ID: ${d.id}) has been added to Prescription with ID: ${d.prescription.id}
        \nDrug ID: ${d.drug.id}\nQuantity: ${d.quantity}\nDose: ${d.dose}\nHow To Use: ${d.howToUse}`))
    }

    render() {
        return (
            <div>
                <div className='panel panel-success'>
                    <div className='panel-heading'>Prescribe Form</div>
                    <div className='panel-body'>
                        <div className='form-group'>
                            <label htmlFor="drug">Drug</label>
                            {!this.props.drugs.length ?
                                <div>Please wait. Fetching drugs...</div>
                                :
                                <select className='form-control' name="drug" onChange={this.handleDrug.bind(this)} id='drug'>
                                    <option>Choose drug</option>
                                    {this.props.drugs.map(d =>
                                        <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            }
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Quantity</label>
                            <input className='form-control' type="text" name='quantity' value={this.state.quantity}
                                onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Dose</label>
                            <input className='form-control' type="text" name='dose' value={this.state.dose}
                                onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">How to Use</label>
                            <input className='form-control' type="text" name='howToUse' value={this.state.howToUse}
                                onChange={this.handleChange.bind(this)} />
                        </div>
                        <button className='btn btn-success' onClick={this.onPost.bind(this)}>Post</button>

                    </div>
                </div>
            </div>
        )
    }
}