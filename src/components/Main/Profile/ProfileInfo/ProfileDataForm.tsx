import React from "react";
import style from './ProfileDataForm.module.css';
import {Formik, Form, Field} from 'formik';
import {ProfileType} from "../../../../types/types";

type PropsType = {
    profile: ProfileType,
    deactivateEditMode: () => void,
    updateProfile: (profile: ProfileType) => void
}

const ProfileDataForm: React.FC<PropsType> = ({profile, deactivateEditMode, updateProfile}) => {



    return (
        <div className={style.wrapper}>
            <Formik
                enableReinitialize
                initialValues={profile}
                onSubmit={(values, {setSubmitting}) => {
                    updateProfile(values);
                    deactivateEditMode();
                }}
            >
                {({isSubmitting}) => (

                    <Form>

                        <div className={style.fullName}>
                            <Field name='fullName' type='text' />
                        </div>
                        <div className={style.lineContainer}>
                            <div className={style.line}></div>
                        </div>
                        <div className={style.item}>
                            <b>Looking for a job</b>:
                            <label className={style.checkboxLabel}>
                                <Field className={style.checkbox} name='lookingForAJob' type='checkbox' />
                                <span className={style.checkboxSpan}></span>
                            </label>
                        </div>
                        <div className={style.item}>
                            <div className={style.title}>
                                <b>My professional skills</b>:
                            </div>
                            <div className={style.content}>
                                <Field name='lookingForAJobDescription' as='textarea' cols={100} rows={3} />
                            </div>
                        </div>
                        <div className={style.item}>
                            <div className={style.title}>
                                <b>About me</b>:
                            </div>
                            <div className={style.content}>
                                <Field name='aboutMe' as='textarea' cols={100} rows={3} />
                            </div>
                        </div>
                        <div className={style.item}>
                            <b>Contacts</b>: {Object.keys(profile.contacts).map((c) => <div key={c} className={style.contact}><span className={style.titleSpan}><b>{c}</b>: </span><Field name={'contacts.' + c} type='text' /></div>)}
                        </div>
                        <div className={style.button}>
                            <button type='submit' disabled={isSubmitting} >Save profile</button>
                        </div>
                        <div className={style.lineContainer2}>
                            <div className={style.line2}></div>
                        </div>

                    </Form>

                )}
            </Formik>
        </div>
    )

};

export default ProfileDataForm;