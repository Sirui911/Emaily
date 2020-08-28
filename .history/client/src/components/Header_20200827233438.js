import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return <li><a href='/auth/google'>Login with Google</a></li>;
            default:
                return [
                    //加key是为了解决Each child in a list should have a unique "key" prop. 
                    <li key="1"><Payments /></li>,
                    //第一个是top，bottom，后面的是左右
                    <li key="3" style={{margin : '0 10px'}}>
                        credits:{this.props.auth.credits}
                    </li>, 
                    <li key="2"><a href='/api/logout'>Logout</a></li>
                ];
        }  
    }

    render(){
        console.log(this.props);
        return(
            <nav>
                <div className="nav-wrapper">
                <Link 
                to={this.props.auth ? '/surveys' : '/'}
                className="brand-logo"
                >
                    Emaily
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {this.renderContent()}
                </ul>
                </div>
            </nav>
        );
    }
}
//mapStateToProps maps the state to the props of current component and shows the data as a property of the component.
function mapStateToProps({ auth }){
    return { auth };
}

export default connect(mapStateToProps)(Header);