// types.ts


//Enumeration
export enum FetchFunction {
  filtered,
  nearby
}

//Types simples
export type Picture = {
  picture_id: string;
  picture_url: string;
};

export type NearbyCar = {
  picture_id: string,
  url: string,
  marque: string,
  modele: string,
  variante: string,
  city: string,
  username: string;
  profile_id: string,
  avatar_url: string,
  likes_count: number,
  comments_count: number
};

export type CityRegion = {
  city: string | null,
  region: string | null
};

export type PictureAndCartype = {
  id: string | null;
  url: string | null;
  car_type: string;
};


export type Garage_with_pictures = {
  garage_id: string;
  username: string;
  avatar_url: string | null;
  nb_categories: number;
  total_likes: number;
  total_comments: number;
  total_pictures: number;
  total_views: number;
  created_at: string;
  rang: number;
  is_liked: boolean;
  top_pictures_by_category: PictureAndCartype[];
};

export type Garage_with_pictures_and_description = {
  garage_id: string;
  username: string;
  avatar_url: string | null;
  nb_categories: number;
  total_likes: number;
  total_comments: number;
  total_pictures: number;
  total_views: number;
  description: string,
  created_at: string;
  rang: number;
  is_liked: boolean;
  top_pictures_by_category: PictureAndCartype[];
};




export type Pictures_with_infos = {
  picture_id: string;
  description: string | null;
  picture_url: string;
  user_id: string;
  username: string;
  avatar_url: string | null;
  likes_count: number;
  comments_count: number;
  relevance_score: number;
  is_liked: boolean;
  car_id: string,
  car_marque: string,
  car_modele: string,
  car_variante: string,
  car_annee: number,
  car_motorisation: string,
  car_cehvaux: number,
  car_couple: number,
  car_poids: number,
  car_acceleration_0_100: number,
  car_vmax: number,
  car_nb_cylindre: number,
  car_structure_moteur: string
}


/*export type RootStackParamList = {
    PicturesPage: { user_id: string, brand_filter?: string  };
    ProfileScreen: { };
    PicturePage: { idPicture: string, picture: string };
    GaragesPage: { garage_id: string, show_my_garage : boolean, garage_type: string, is_finished?: boolean|null, onCountChange?: (count: number) => void};
    GaragePage: { garage_id: string };
    TabScreen: { user_id: string };
};*/
/*
export type RootStackParamList2 = {
    ProfileScreenStack: {user_id: string};
    CameraScreenStack: {user_id: string};
}*/

export type HomeScreenStackParamList = {
  HomeScreen: {};
  SearchPage: {};
  MessagingPage: {};
  ConversationPage: { conversation_id: string };
  NotificationsPage: {};
  PicturesPage: {
    fetchFunction: "filtered" | "nearby";  //'filtered' ou 'nearby'
    user_id?: string | null,
    brand?: string | null,
    period?: string | null,
    query?: string | null,
    sort_by?: string | null,
    category?: string | null,
    city?: string | null,
    region?: string | null,
    limit?: number | null,
    offset?: number | null,
  };
  PicturePage: { idPicture: string; picture: string };
  GaragesPage: { user_id: string; show_my_garage: boolean; garage_type: string; is_finished?: boolean | null; sort_by?: string | null; query?: string | null; onCountChange?: (count: number) => void };
  GaragePage: { garage_id: string };
};

export type CameraScreenStackParamList = {
  PhotoDetailsScreen: { picture: string };
  CameraScreen: {};
};

export type ProfileScreenStackParamList = {
  ProfileScreen: {};
  PicturePage: { idPicture: string; picture: string };
  GaragePage: { garage_id: string };
  Settings: undefined;
};

export type SearchPageStackParamList = {
  SearchPage: {};
  PicturePage: { idPicture: string; picture: string };
  GaragePage: { garage_id: string };
};

export type PicturesStackParamList = {
  PicturesPage: {
    fetchFunction: "filtered" | "nearby";  //'filtered' ou 'nearby'
    user_id?: string | null,
    brand?: string | null,
    period?: string | null,
    query?: string | null,
    sort_by?: string | null,
    category?: string | null,
    city?: string | null,
    region?: string | null,
    limit?: number | null,
    offset?: number | null,
  };
  PicturePage: { idPicture: string; picture: string };
};

export type GaragesStackParamList = {
  GaragesPage: {
    user_id: string;
    show_my_garage: boolean;
    garage_type: string;
    is_finished?: boolean | null;
    sort_by?: string | null;
    query?: string | null;
    onCountChange?: (count: number) => void;
  };
  GaragePage: { garage_id: string };
};

/*
export type HomeScreenStackParamList = {
    HomeScreen: {};
    GaragesPage: { user_id: string, show_my_garage : boolean, garage_type: string, is_finished?: boolean|null, query?: string|null, onCountChange?: (count: number) => void};
    GaragePage: { garage_id: string };
    PicturesPage: { user_id: string|null, brand_filter?: string|null, period?: string|null, sort_by?: string|null, query?: string|null };
    PicturePage: { idPicture: string, picture: string };
};*/


