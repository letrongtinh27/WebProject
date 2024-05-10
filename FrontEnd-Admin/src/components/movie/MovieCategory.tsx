import * as React from 'react';
import {
    CheckboxGroupInput,
    required,
    useGetList, useRecordContext,
} from 'react-admin';
import {useEffect, useMemo, useState} from "react";
import {Category, Movie} from "../../types";

export const MovieCategory = () => {
    const [category, setCategories] = useState<Category[]>([]);
    const {data}: any = useGetList<Category>('category',{
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });
    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    const record = useRecordContext<Movie>();
    const defaultCategories = useMemo(() => {
        if (record && record.categories) {
            return record.categories.map((category: Category) => category.id);
        }
        return [];
    }, [record]);

    return (
        <CheckboxGroupInput
            source="category"
            label="Danh mục"
            choices={category}
            optionText="name"
            optionValue="id"
            fullWidth
            row={false}
            defaultValue={defaultCategories}
            validate={req}
        />
    );
};
const req = [required()];