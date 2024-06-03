import React from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useUserMenu } from 'react-admin';

const CustomizeUserMenuItem = React.forwardRef((props: any, ref: any) => {
    const { onClose } = useUserMenu();

    return (
        <MenuItem
            onClick={onClose}
            ref={ref}
            {...props}
        >
            <ListItemIcon>
                <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Customize User</ListItemText>
        </MenuItem>
    );
});

export default CustomizeUserMenuItem;