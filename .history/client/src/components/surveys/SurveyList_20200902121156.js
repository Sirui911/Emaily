import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveysList extends Component{
    componentDidMount(){
        this.props.fetchSurveys();
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

export default connect(mapStateToProps, {fetchSurveys})(SurveyList);
