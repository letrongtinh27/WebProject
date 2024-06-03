import React from 'react';
import { AppBar, UserMenu, Logout } from 'react-admin';
import CustomizeUserMenuItem from './CustomizeUserMenuItem';

const CustomAppBar = () => (
    <AppBar
        userMenu={
            <UserMenu>
                <CustomizeUserMenuItem />
                <Logout />
            </UserMenu>
        }
    />
);

export default CustomAppBar;