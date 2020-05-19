import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

/*Backdrop is placed with Modal , because whenever Modal is shown backdrop should also be shown
, still there are other ways to place it but dor that we need to make some components stateful*/

/*Converted To Functional Component*/
const modal = props => {

 
        return(
            //-100vh = viewport Height
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
                <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                    {props.children}
                </div>
        </Aux>
        );
}

export default React.memo(
    modal,
    (prevProps,nextProps) => 
    nextProps.show === prevProps.show && 
    nextProps.children === prevProps.children
    );