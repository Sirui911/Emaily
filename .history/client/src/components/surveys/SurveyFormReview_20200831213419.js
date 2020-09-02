//surveyFormReview show users their input for review
import _ from 'lodash'
import React from 'react';
import { connect } from 'react-redux';
import formField from './formFields';
import * as actions from '../../actions/index';
//这些argument的作用是什么
const SurveyReview = ({ onCancel,formValues,submitSurvey }) =>{
    const reviewFields = _.map(formField, ({name, label}) =>{
        return(
            <div key ={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });


    return(
        <div>
            <h5>Please confirm your entries!</h5>
            {reviewFields}
            <botton 
            className ="yellow darken-3 white-text btn-flat" onClick={onCancel}>
                Back
            </botton>
            <botton 
            onClick = {() => submitSurvey(formValues)}
            className="green btn-flat right white-text">
                send Survey
                <i className="material-icons right">email</i>
            </botton>
        </div>
    );
};

function mapStateToProps(state){
    return { formValues: state.form.surveyForm.values};
}

 export default connect(mapStateToProps,actions)(SurveyReview);