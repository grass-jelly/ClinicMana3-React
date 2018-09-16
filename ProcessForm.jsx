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
            <div>
                 <DiagnoseForm dispatch={this.props.dispatch} icds={this.props.icds} processingPatient={this.props.processingPatient} />
                            <LabtestForm dispatch={this.props.dispatch} medicalServices={this.props.medicalServices} processingPatient={this.props.processingPatient} />
                            <PrescribeForm dispatch={this.props.dispatch} drugs={this.props.drugs} processingPatient={this.props.processingPatient} />

            </div>
                           
                
        )
    }
}