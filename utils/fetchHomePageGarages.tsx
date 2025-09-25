import { supabase } from "../lib/supabase";
import { Garage_with_pictures_and_description } from "../types";

export async function fetchHomePageGarages(
    sort_by: string,
    query: string,
    empty_garage: boolean,
    is_garage_finished: boolean,
    duration_type: "monthly" | "annual",
    only_one: boolean,
    limit: number,
    offset: number,
    profile_id: string) {
    const { data, error } = await supabase.rpc("get_garages_and_car_types_with_details_and_description", {
        p_sort_by: sort_by,
        p_query: query,
        p_empty_garage: empty_garage,
        p_is_garage_finished: is_garage_finished,
        p_duration_type: duration_type,
        p_only_one: only_one,
        p_limit: limit,
        p_offset: offset,
        p_profile_id: profile_id,
    });
    if (error) {
        console.error("Error fetching homepage garages:", error);
        return [];
    }

    console.log("garage : ", data);


    return data as Garage_with_pictures_and_description[];
}