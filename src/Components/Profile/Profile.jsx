import React, {useState} from 'react';
import Preloader from "../../assets/preloader/Preloader";
import s from './Profile.module.css';
import ReduxEditProfile from "./ProfileDataForm";
import ProfileData from "./ProfileData";
import userPhoto from './../../assets/images/userPhoto.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const Profile = React.memo(props => {
    if (!props.profile) {
        return <Preloader/>
    }
    let [editProfile, setEditProfile] = useState(false);
    //update profile
    const onSubmit = (formData) => {
        if (formData === props.profile) {
            setEditProfile(false)
        } else {
            props.updateProfileUserThunk(formData).then(() => {
                setEditProfile(false)
            })
        }
    }
    //upload photo
    let onUploadNewPhoto = (e) => {
        if (e.target.files.length) {
            props.uploadNewPhotoThunk(e.target.files[0])
        }
    }
    return (
        <div className={s.profileContain}>
            {props.urlMatchParams == props.id ?
                //get myProfile with editMode
                <div className={s.mainBlock}>
                    <div className={s.avatarBlock}>
                        <img src={!props.profile.photos.small ? userPhoto : props.profile.photos.large} alt=''/>
                        <input type="file" name="myFile" id="myFile" onChange={onUploadNewPhoto}/>
                        <label htmlFor="myFile" className={s.uploadPhoto}> </label>
                        <h3>{props.profile.fullName}</h3>
                        <ProfileStatusWithHooks status={props.status}
                                                updateStatusUserThunk={props.updateStatusUserThunk}
                                                id={props.id}
                                                urlMatchParams={props.urlMatchParams}
                        />
                    </div>
                    <div>
                        {editProfile ?
                            <ReduxEditProfile initialValues={props.profile}
                                              onSubmit={onSubmit} profile={props.profile}
                            />
                            :
                            <ProfileData profile={props.profile}
                                         status={props.status}
                                         updateStatusUserThunk={props.updateStatusUserThunk}
                                         id={props.id}
                                         urlMatchParams={props.urlMatchParams}
                                         setEditProfile={setEditProfile}
                                         myProfile={true}
                            />
                        }
                    </div>
                </div>
                //get Profile without EditMode
                :
                <div className={s.mainBlock}>
                    <div className={s.avatarBlock}>
                        <img src={!props.profile.photos.small ? userPhoto : props.profile.photos.large} alt=''/>
                        <h3>{props.profile.fullName}</h3>
                        <div>{props.status}</div>
                    </div>
                    <ProfileData profile={props.profile}
                                 status={props.status}
                                 updateStatusUserThunk={props.updateStatusUserThunk}
                                 id={props.id}
                                 urlMatchParams={props.urlMatchParams}
                                 myProfile={false}
                    />
                </div>
            }
        </div>
    )
})

export default Profile
