import React, {ChangeEvent, useState} from "react";
import style from './ProfileInfo.module.css';
import {ContactsType, ProfileType} from "../../../../types/types";
import userPhoto from '../../../../assets/userPhoto.png';
import ProfileDataForm from "./ProfileDataForm";
import ProfileStatus from "./ProfileStatus";

type PropsType = {
    profile: ProfileType,
    status: string,
    isOwner: boolean,
    updateProfile: (profile: ProfileType) => void,
    updateStatus: (status: string) => void,
    updatePhoto: (file: File) => void
}

const ProfileInfo: React.FC<PropsType> = ({status, profile, isOwner, updateStatus, updateProfile, updatePhoto}) => {

    const [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false)
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length) {
            updatePhoto(e.target.files[0]);
        }
    };

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.img}>
                    <img src={profile && profile.photos.large ? profile.photos.large : userPhoto} alt=""/>
                </div>
                <div className={style.fileInput}>
                    {isOwner && <label><input type="file" onChange={onMainPhotoSelected} className={style.file} /><span className={style.span}>Edit photo</span></label>}
                </div>
                <ProfileStatus status={status} isOwner={isOwner} updateStatus={updateStatus} />
                <div className={style.info}>
                    {editMode
                        ? <ProfileDataForm profile={profile} deactivateEditMode={deactivateEditMode} updateProfile={updateProfile} />
                        : <ProfileData isOwner={isOwner} activateEditMode={activateEditMode} profile={profile} />}
                </div>
            </div>
        </div>
    )

};

export default ProfileInfo;

type ProfileDataPropsType = {
    isOwner: boolean,
    activateEditMode: () => void,
    profile: ProfileType
}

const ProfileData: React.FC<ProfileDataPropsType> = ({isOwner, activateEditMode, profile}) => {

    return (
        <div className={style.wrapper2}>
            <div className={style.fullName}>
                <b>{profile.fullName}</b>
            </div>
            <div className={style.lineContainer}>
                <div className={style.line}></div>
            </div>
            <div className={style.item}>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob &&
                <div className={style.item}>
                    <div className={style.title}>
                        <b>My professional skills</b>:
                    </div>
                    <div className={style.content}>
                        {profile.lookingForAJobDescription}
                    </div>
                </div>
            }
            <div className={style.item}>
                <div className={style.title}>
                    <b>About me</b>:
                </div>
                <div className={style.content}>
                    {profile.aboutMe}
                </div>
            </div>
            <div className={style.item}>
                <b>Contacts</b>: {Object.keys(profile.contacts).map((c) => <Contact key={c} title={c} value={profile.contacts[c as keyof ContactsType]} />)}
            </div>
            {isOwner && <div className={style.button}><button onClick={activateEditMode} >Edit profile</button></div>}
            <div className={style.lineContainer2}>
                <div className={style.line2}></div>
            </div>
        </div>
    )

};

type ContactPropsType = {
    title: string,
    value: string | null
}

const Contact: React.FC<ContactPropsType> = ({value, title}) => {

    return (
        <div className={style.contact}><span className={style.titleSpan}><b>{title}</b>: </span><span className={style.valueSpan}>{value}</span></div>
    )

};