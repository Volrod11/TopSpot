// types.ts
export type RootStackParamList = {
    PicturesPage: undefined;
    ProfileScreen: undefined;
    PicturePage: { idPicture: string, picture: string };
    Garage: { garage_id: string };
    GaragePage: { garage_id: string };
    TabScreen: { user_id: string };
};
