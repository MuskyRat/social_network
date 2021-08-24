import React from 'react';
import style from './UsersSearchForm.module.css';
import {Formik, Form, Field} from 'formik';
import {FilterType} from "../../../redux/users-reducer";

type PropsType = {
    filter: FilterType;
    onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = ({filter, onFilterChanged}) => {



    return (
        <div className={style.wrapper}>
            <Formik
                enableReinitialize
                initialValues={{term: filter.term, friend: String(filter.friend)}}
                onSubmit={(values, {setSubmitting}) => {
                    let actualFilter: FilterType = {
                        term: values.term,
                        friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
                    }
                    onFilterChanged(actualFilter);
                    setSubmitting(false);
                }}
            >
                {({isSubmitting}) => (

                    <Form>
                        <div className={style.container}>
                            <div className={style.input}>
                                <Field name='term' type='text' />
                            </div>

                            <div className={style.select}>
                                <Field name='friend' as='select'>
                                    <option value="null">All users</option>
                                    <option value="true">Only followed</option>
                                    <option value="false">Only unfollowed</option>
                                </Field>
                            </div>

                            <div className={style.button}>
                                <button type='submit' disabled={isSubmitting}>Find</button>
                            </div>
                        </div>

                    </Form>

                )}
            </Formik>
        </div>
    )

};

export default UsersSearchForm;