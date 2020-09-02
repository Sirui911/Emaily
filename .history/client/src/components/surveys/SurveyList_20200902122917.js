import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurvey } from '../../actions';

class SurveyList extends Component{
    componentDidMount(){
        this.props.fetchSurvey();
    }

    renderSurveys(){
        return this.props.surveys.map(survey => {
            return(
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content text-white">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            sent on: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {survey.yes} </a>
                        <a>No:{survey.no} </a>
                    </div>

                </div>
            )
        })
    }

    render(){
        return(
            <div>
                {renderSurveys()}
            </div>
        );
    };
}

function mapStateToProps({surveys}){
    return { surveys };
}

export default connect(mapStateToProps, {fetchSurvey})(SurveyList);
