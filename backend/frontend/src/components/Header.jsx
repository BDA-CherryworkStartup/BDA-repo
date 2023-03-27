import React from 'react'
import { AppBar, Toolbar, Menu, MenuItem} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    return (
        <div>
            <AppBar color="inherit">
                <Toolbar>
                    <img src="..\static\dummyLogo.jfif" alt="logo"/>
                    <Menu>
                        <MenuItem icon={<AccountCircleIcon />}></MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header