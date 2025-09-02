// types.ts
export type RootStackParamList = {
    PicturesPage: { user_id: string, brand_filter?: string  };
    ProfileScreen: { };
    PicturePage: { idPicture: string, picture: string };
    GaragesPage: { garage_id: string, show_my_garage : boolean, garage_type: string, is_finished?: boolean|null, onCountChange?: (count: number) => void};
    GaragePage: { garage_id: string };
    TabScreen: { user_id: string };
};

export type RootStackParamList2 = {
    ProfileScreenStack: {user_id: string};
    CameraScreenStack: {user_id: string};
}

export type ProfileScreenStackParamList = {
    ProfileScreen: { };
    PicturesPage: { user_id: string|null, brand_filter?: string|null };
    PicturePage: { idPicture: string, picture: string };
    GaragePage: { garage_id: string };
    Settings: undefined;
};

export type CameraScreenStackParamList = {
    PhotoDetailsScreen: { picture: string };
    CameraScreen: {};
};

export type HomeScreenStackParamList = {
    HomeScreen: {};
    GaragesPage: { user_id: string, show_my_garage : boolean, garage_type: string, is_finished?: boolean|null, query?: string|null, onCountChange?: (count: number) => void};
    PicturesPage: { user_id: string|null, brand_filter?: string|null, period?: string|null, sort_by?: string|null, query?: string|null };
    PicturePage: { idPicture: string, picture: string };
};