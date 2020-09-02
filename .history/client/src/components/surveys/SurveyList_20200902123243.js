import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurvey } from '../../actions';

class SurveyList extends Component{
    componentDidMount(){
        this.props.fetchSurvey();
    }

    renderSurveys(){
        //加入reverse是为了倒叙处理，倒序显示
        return this.props.surveys.reverse().map(survey => {
            return(
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content text-white">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            {/* 是为了显示成正常的日期格式而不是电脑才认识的日期 */}
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
                {this.renderSurveys()}
            </div>
        );
    };
}

function mapStateToProps({surveys}){
    return { surveys };
}

export default connect(mapStateToProps, {fetchSurvey})(SurveyList);
