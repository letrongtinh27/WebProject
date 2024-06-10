import React from "react";
import { AppBar, AppBarProps } from "react-admin";
import MyUserMenu from "./MyUserMenu";

const MyAppBar = (props: AppBarProps) => <AppBar {...props} userMenu={<MyUserMenu />} />;

export default MyAppBar;