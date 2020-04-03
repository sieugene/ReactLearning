import React, { useState } from 'react';
import Preloader from "../../assets/preloader/Preloader";
import s from './Profile.module.css';
import ReduxEditProfile from "./ProfileDataForm";

import userPhoto from './../../assets/images/userPhoto.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileData from "./ProfileData";
import { ProfileType } from '../../Types/ProfileTypes';

type PropsType = {
    profile: ProfileType
    updateProfileUserThunk: (profile: ProfileType) => void
    uploadNewPhotoThunk: (photo: object) => void
    loading: boolean
    id: number | null
    urlMatchParams: string
    status: string | null
    updateStatusUserThunk: (userId: number, newStatus: string | null) => void
}
const Profile: React.FC<PropsType> = React.memo(props => {
    if (!props.profile) {
        return <Preloader />
    }
    let [editProfile, setEditProfile] = useState(false);
    //update profile
    const onSubmit = (formData: any) => {
        if (formData === props.profile) {
            setEditProfile(false)
        } else {
            props.updateProfileUserThunk(formData)
            setEditProfile(false)
        }
    }
    //upload photo
    let onUploadNewPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            if (e.target.files.length) {
                props.uploadNewPhotoThunk(e.target.files[0])
            }
        }
    }
    return (
        <div className={s.profileContain}>
            {props.loading ? <Preloader /> :
                <>
                    <div className='row profile'>
                        <div className="col">
                            <div className={s.avatarBlock}>
                                <img src={!props.profile.photos.small ? userPhoto : props.profile.photos.large} alt='' />
                                {props.id === Number(props.urlMatchParams) &&
                                    // upload photo for myProfile
                                    <div>
                                        <input type="file" name="myFile" id="myFile" onChange={onUploadNewPhoto} />
                                        <label htmlFor="myFile" className={s.uploadPhoto}
                                            data-tooltip="click to upload a photo"> </label>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col s6">
                            <h5>{props.profile.fullName}</h5>
                            <ProfileStatusWithHooks status={props.status}
                                updateStatusUserThunk={props.updateStatusUserThunk}
                                id={props.id}
                                urlMatchParams={props.urlMatchParams} />
                        </div>
                    </div>
                    <div className="row profile">
                        <div className="col s12">
                            {editProfile ?
                                <ReduxEditProfile initialValues={props.profile} onSubmit={onSubmit} profile={props.profile} />
                                :
                                <ProfileData profile={props.profile}
                                    status={props.status}
                                    id={props.id}
                                    urlMatchParams={props.urlMatchParams}
                                    setEditProfile={setEditProfile}
                                />
                            }
                        </div>
                    </div>

                </>
            }
        </div>
    )
})

export default Profile
