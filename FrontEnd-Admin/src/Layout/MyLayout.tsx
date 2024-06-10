import React from "react";
import { Layout, LayoutProps } from "react-admin";
import MyAppBar from "./MyAppBar";
import { ProfileProvider } from "../Layout/ProfileEdit";

const MyLayout = (props: LayoutProps) => (
    <ProfileProvider>
        <Layout {...props} appBar={MyAppBar} />
    </ProfileProvider>
);

export default MyLayout;