// App.js the component where our other components are included
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
//使react和redux链接妥当
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component{
    // after all the elements of the page is rendered correctly, this method is called.
    componentDidMount(){
        this.props.fetchUser();
    }

    render() {
        return(
            <div className = "container">
                {/* 使用dynamic route时使用BrowserRouter */}
                <BrowserRouter>
                {/* 只能有一个child */}
                    <div>
                        {/* route configration */}
                        {/* 如果没有exact，那么会从头开始比对每一个route看是否含有url中输入的，exact和exact={true}是一样的 */}
                        {/* always visiable components,因为header中没有任何configuration而且在第一个 */}
                        <Header /> 
                        {/* matching routes with exact */}
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);