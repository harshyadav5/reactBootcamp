import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Drawertoggle from '../SideDrawer/DrawerToggler/DrawerToggler'

const toolbar = (props) =>(

    <header className={classes.Toolbar}>
        <Drawertoggle clicked={props.drawerToggleClicked}/>
        <div>Harsh</div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;