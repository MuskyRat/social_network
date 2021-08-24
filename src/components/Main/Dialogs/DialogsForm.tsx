import React from "react";
import style from './DialogsForm.module.css';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

type PropsType = {
    addMessage: (newMessageBody: string) => void
}

const DialogsForm: React.FC<PropsType> = ({addMessage}) => {

    return (
        <div className={style.form}>
            <Formik
                initialValues={{newMessageBody: ''}}
                validationSchema={Yup.object({
                    newMessageBody: Yup.string().required('Requires')
                })}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    addMessage(values.newMessageBody);
                    resetForm();
                    setSubmitting(false);
                }}
            >
                {({isSubmitting}) => (

                    <Form>

                        <div className={style.textarea}>
                            <Field name='newMessageBody' type='textarea' cols={50} rows={10}></Field>
                        </div>

                        <div className={style.button}>
                            <button disabled={isSubmitting} type='submit'>Send</button>
                        </div>

                    </Form>

                )}
            </Formik>
        </div>
    )

};

export default DialogsForm;