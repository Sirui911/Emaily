import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurvey } from '../../actions';

class SurveysList extends Component{
    componentDidMount(){
        this.props.fetchSurvey();
    }

    render(){
        return(
            <div>
                SurveysList!
            </div>
        );
    };
}

function mapStateToProps({surveys}){
    return { surveys };
}

export default connect(mapStateToProps, {fetchSurvey})(SurveyList);
