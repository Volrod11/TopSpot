// types.ts
export type RootStackParamList = {
    PicturesPage: { user_id: string };
    ProfileScreen: { user_id: string };
    PicturePage: { idPicture: string, picture: string };
    Garage: { garage_id: string };
    GaragePage: { garage_id: string };
    TabScreen: { user_id: string };
};

export type RootStackParamList2 = {
    ProfileScreenStack: {user_id: string};
    CameraScreenStack: {user_id: string};
}

export type ProfileScreenStackParamList = {
    ProfileScreen: { user_id: string };
    PicturePage: { idPicture: string, picture: string };
    GaragePage: { garage_id: string };
    Settings: undefined;
};

export type CameraScreenStackParamList = {
    CameraScreen: { user_id: string };
    PhotoDetailsScreen: { picture: string, user_id: string };
};