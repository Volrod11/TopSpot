import { supabase } from "../lib/supabase";
import { Picture } from "../types";

/*
Fetch pictures from Supabase
user_id uuid default null,
brand_filter text default null,
period text default null,        -- 'week', 'month', ou null
sort_by text default null,       -- 'likes', 'comments', ou null
query text default null,
*/
export async function fetchFilteredPictures(
    user_id: string | null = null,
    brand: string | null = null,
    period: string | null = null,
    query: string | null = null,
    sort_by: string | null = null,
    category: string | null = null,
    limit: number | null = null,
    offset: number | null = null) {

        console.log("user_id : ", user_id,
            "brand : ", brand,
            "period : ", period,
            "query : ", query,
            "sort_by : ", sort_by,
            "category : ", category,
            "limit : ", limit,
            "offset : ", offset,
        );
        
    const { data, error } = await supabase.rpc("search_filtered_pictures", {
        p_user_id: user_id,
        p_brand_filter: brand,
        p_period: period,
        p_sort_by: sort_by,
        p_query: query,
        p_category: category,
        p_limit: limit,
        p_offset: offset
    });
    if (error) {
        console.error("Error fetching pictures: ", error);
        return [];
    }    


    console.log("data : ",data);
    

    return data as Picture[];
};


export async function fetchNearByPictures(city: string, region: string, limit: number, offset: number) {
    const { data, error } = await supabase.rpc("get_pictures_city_or_region", {
        p_city: city,
        p_region: region,
        p_limit: limit,
        p_offset: offset
    });

    if (error) {
        console.error("Error fetching nearby pictures");
    }
    
    console.log("data : ",data);

    return data as Picture[];
};