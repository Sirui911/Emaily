//survey contains logic to render a single label and text input
import React from 'react';

//input是指props下input里面所有的内容，...input是指input里面所有的key-value对.
//这里是为了实现不用reduxForm的input而用surveyfields，然后我们再实现wiring up
export default ({ input,label, meta:{ error, touched } }) => {
    return(
        <div>
            <label>{label}</label>
            <input {...input} style ={{marginBottom:'5px'}}/>
            <div className="red-text" style={{marginBottom:'20px'}}>
            {touched && error}
            </div>    
        </div>
    );     
};