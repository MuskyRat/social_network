


export type ProfileType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: PhotosType
}

export type ContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null
}

export type PhotosType = {
    small: string | null,
    large: string | null
}

export type PostType = {
    id: number,
    message: string,
    likesCount: number
}

export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: string | null,
    photos: PhotosType,
    status: string | null,
    followed: boolean
}

export type DialogType = {
    id: number,
    userName: string,
    img: string | null
}

export type DirectionType = 'in' | 'out'

export type MessageType = {
    id: number,
    message: string,
    dir: DirectionType
}