//survey show to a user to add input 
//lodash中含有许多helper function，包括map，所以可以有下面的fields的map
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

const FIELDS = [
    {label:'Survey Title', name:'title'},
    {label:'Survey Line', name:'subject'},
    {label:'Email Body', name:'body'},
    {label:'Recipient List', name:'emails'}
];

class SurveyForm extends Component{
    renderFields(){
        // ES2015写法,qizhong field是遍历FIELD中的每一个
    //    return _.map(FIELDS, (field) => {
    //        return (
    //            <Field component={SurveyField} type="text" label={field.label} name={field.name} />
    //        );
    //    });
       //take every label, name from fields and 做下述操作,再返回一个array作为map的返回
       return _.map(FIELDS, ({ label, name }) =>{
           return (
               <Field key={name} component={SurveyField} type="text" label={label} name={name} />
           );
       });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="btn-flat red white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>    
            </div>
        );
    }
}

//values指的是我们输入object的values
function validate(values){
     //因为输入的name叫title，而error的property也是error，所以error会自动连接到title那里去
    const errors ={};
    //放在上面的原因是因为再没有输入的时候想让输出provide a valid value， 但是再输错的时候输出invalid emails， 这样如过没有输入，下面的错误信息会override invalid emails
    errors.emails = validateEmails(values.emails || '');
    //不使用map是因为不输出list只是看值
    _.each(FIELDS, ({ name }) => {
        //console.log("value[name] is :", values[name]);
        if(!values[name]){
            //不能用values.name是因为那样只是获得name property的值但是这样的话就是取name叫做name的那个object的所有
           errors[name] = 'You must provide a valid value!'; 
        }
    });

    return errors;
}

export default reduxForm({
    //每次submit时都会validate
    validate,
    form:'surveyForm'
})(SurveyForm);