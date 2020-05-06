import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

/* webpack will handle the image , it copy the image to the destination 
directory it creates during development and hence optimise it*/

const logo = (props) =>(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default logo;