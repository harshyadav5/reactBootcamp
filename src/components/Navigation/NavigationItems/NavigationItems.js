import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' active>Burger Builder</NavigationItem>
        <NavigationItem link='/' >Check out</NavigationItem>
    </ul>
);

export default navigationItems;