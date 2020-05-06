import React from 'react';

import classes from './Backdrop.module.css';

/*backdrop component is user to remove Modal when order is done*/

const backdrop = (props) =>(
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null

);

export default backdrop;