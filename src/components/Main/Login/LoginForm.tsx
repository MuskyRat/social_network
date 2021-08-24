import React from "react";
import style from './LoginForm.module.css';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {login} from "../../../redux/auth-reducer";

type PropsType = {
    isAuth: boolean
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void,
    captchaUrl: string | null,
    errorMessage: string | null
}

const LoginForm: React.FC<PropsType> = ({isAuth, captchaUrl, errorMessage}) => {



    const dispatch = useDispatch();

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.header}>
                    <h1>Login</h1>
                </div>

                <Formik
                    validationSchema={Yup.object({
                        email: Yup.string().email('Enter a valid email address.')
                    })}
                    initialValues={{email: '', password: '', rememberMe: false, captchaUrl: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        const promise = dispatch(login(values.email, values.password, values.rememberMe, values.captchaUrl));
                        Promise.all([promise]).then(() => {setSubmitting(false)});
                    }}

                >
                    {({isSubmitting}) => (

                        <Form>

                            <div className={style.item}>
                                <label htmlFor="email">Email</label>
                                <Field name='email' type='email' required />
                                <ErrorMessage name='email' component='span' className={style.errorMessage_1} />
                                {errorMessage && <span className={style.errorMessage_2}>{errorMessage}</span>}
                            </div>
                            <div className={style.item}>
                                <label htmlFor="password">Password</label>
                                <Field name='password' type='password' required />
                            </div>
                            <div className={style.rememberMe}>
                                <label>
                                    <Field className={style.checkbox} name='rememberMe' type='checkbox' />
                                    <span className={style.span}></span>
                                    rememberMe
                                </label>
                            </div>
                            {captchaUrl &&
                            <div className={style.captchaUrl}>
                                <div className={style.img}>
                                    <img src={captchaUrl} alt=""/>
                                </div>
                                <div className={style.item}>
                                    <label htmlFor="captchaUrl">Captcha</label>
                                    <Field name='captchaUrl' type='text' required />
                                </div>
                            </div>
                            }
                            <div className={style.button}>
                                <button disabled={isSubmitting} type='submit'>Login</button>
                            </div>


                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )

}

export default LoginForm;