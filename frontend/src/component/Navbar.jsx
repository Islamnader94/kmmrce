import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const style = {
    flexGrow: 1
}

const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={style}>
                        Teacher Application Directory
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
