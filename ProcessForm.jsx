import React from 'react'
import DiagnoseForm from './DiagnoseForm.jsx'
import LabtestForm from './LabtestForm.jsx'
import PrescribeForm from './PrescribeForm.jsx'
export default class ProcessForm extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>Process Form</div>
                <div className='panel-body'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <DiagnoseForm dispatch={this.props.dispatch} icds={this.props.icds} processingPatient={this.props.processingPatient} />
                        </div>
                        <div className='col-md-4'>
                            <LabtestForm dispatch={this.props.dispatch} medicalServices={this.props.medicalServices} processingPatient={this.props.processingPatient} />
                        </div>
                        <div className='col-md-4'>
                            <PrescribeForm dispatch={this.props.dispatch} drugs={this.props.drugs} processingPatient={this.props.processingPatient} />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}