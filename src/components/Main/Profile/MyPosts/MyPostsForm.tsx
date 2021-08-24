import React from 'react';
import style from './MyPostsForm.module.css';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

type PropsType = {
    addPost: (newPostText: string) => void,
}

const MyPostsForm: React.FC<PropsType> = ({addPost}) => {


    return (
        <div className={style.wrapper}>
            <Formik
                initialValues={{newPostText: ''}}
                validationSchema={Yup.object({
                    newPostText: Yup.string().required('Required')
                })}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    addPost(values.newPostText);
                    resetForm();
                    setSubmitting(false);
                }}
            >
                {({isSubmitting}) => (

                    <Form>

                        <div className={style.textarea}><Field as='textarea' name='newPostText' placeholder='Enter your message...' /></div>

                        <div className={style.button}><button disabled={isSubmitting} type='submit' >Post</button></div>

                    </Form>

                )}
            </Formik>
        </div>
    )

};

export default MyPostsForm;