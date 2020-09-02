//surveyFormReview show users their input for review
import React from 'react';
import { connect } from 'react-redux';
import formField from './formFields';
const SurveyReview = ({ onCancel,formValues }) =>{
    const reviewFields = _.map(formField, field =>{
        return(
            <div key ={field.name}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        );
    });


    return(
        <div>
            <h5>Please confirm your entries!</h5>
            <botton className ="yellow darken-3 btn-flat" onClick={onCancel}>
                Back
            </botton>
        </div>
    );
};

function mapStateToProps(state){
    return { formValues: state.form.surveyForm.values};
}

 export default connect(mapStateToProps)(SurveyReview);