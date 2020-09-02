//survey show surveyNew and surveyForm
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { connect } from 'react-redux';

class SurveyNew extends Component {
    state = { showFormReview: false };

    renderContent(){
        if (this.state.showFormReview){
            return(
                <SurveyFormReview 
                onCancel={()=> this.setState({showFormReview:false})}
                />
            );
        }
        return(
            <SurveyForm 
            onSurveySubmit={() => this.setState({ showFormReview: true })}
            />
        );
    }

    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {formValues: state.form.SurveyForm.values};
}

export default connect(mapStateToProps)(SurveyNew);