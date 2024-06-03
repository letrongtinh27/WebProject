import React from "react";
import {List, ReferenceInput, TextInput} from "react-admin";

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
];

export const PostList = () => <List filters={postFilters}> ...</List>;