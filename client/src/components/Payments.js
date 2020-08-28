import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render(){
        //为了看下面这这一堆生成的是啥样的js code
        // debugger;
        return(
            //默认用的是dollar,单位是cents
            <StripeCheckout
            name="Emaily"
            description="$5 for 5 credits" 
            amount={500}
            //token返回的是本次charge的所有信息，其中的id才是我们真正的token，我们只能拿到creadit card number的后四位，所以不会处理row number
            token={token => this.props.handleToken(token)}
            stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add credits
                </button>
            </StripeCheckout>
        );
    }
}
export default connect(null, actions)(Payments);