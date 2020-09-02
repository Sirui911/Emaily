//surveyFormReview show users their input for review
import React from 'react';
import { connect } from 'react-redux';
import { STATES } from 'mongoose';

const SurveyReview = ({ onCancel }) =>{
    return(
        <div>
            <h5>Please confirm your entries!</h5>
            <botton className ="yellow darken-3 btn-flat" onClick={onCancel}>
                Back
            </botton>
        </div>
    );
};

function mapStateToProps(){
    return { formValues: STATES.form.SurveyForm.values};
}

 export default connect(mapStateToProps){SurveyReview};