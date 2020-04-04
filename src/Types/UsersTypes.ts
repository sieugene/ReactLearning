import { PhotosType } from "./ProfileTypes";

export type UserType = {
    name: string,
    id: number,
    photos: PhotosType
    status: string,
    followed: boolean
}
