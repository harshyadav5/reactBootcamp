import React, {Component} from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

/*Backdrop is placed with Modal , because whenever Modal is shown backdrop should also be shown
, still there are other ways to place it but dor that we need to make some components stateful*/

class modal extends Component{

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show;
    }

    componentDidUpdate(){
        console.log('[Modal] Did Update');
    }
    render(){
        return(
            //-100vh = viewport Height
        <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
        </Aux>
        );
    }
}

export default modal;