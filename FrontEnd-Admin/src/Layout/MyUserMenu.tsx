import React from "react";
import { UserMenu, MenuItemLink, UserMenuProps, MenuItemLinkProps } from "react-admin";
import { useProfile } from "./ProfileEdit";

const MyUserMenu = (props: UserMenuProps) => {
    const { profileVersion } = useProfile();

    return (
        <UserMenu key={profileVersion} {...props}>
            <MenuItemLink
                to="/my-profile"
                primaryText="My Profile"
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
            />
        </UserMenu>
    );
};

export default MyUserMenu;