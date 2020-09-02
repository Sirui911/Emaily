//surveyFormReview show users their input for review
import React from 'react';

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

 export default SurveyReview;