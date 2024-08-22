import { useContext, useEffect, useState } from "react";
import { DispatchContext, actionTypes } from "../context/store";
import { JSON, Structure } from "../types/main";

// const BUCKET_NAME = "kata987";
// const REGION = "us-west-2";
const CLOUDFRONT_URL = "https://dg4fo0dwgiaqb.cloudfront.net";

export const FetchData = (date?: Number) => {
    const dispatch = useContext(DispatchContext);
    const [data, setData] = useState<Structure[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const url = date
                    ? `${CLOUDFRONT_URL}/data.json?cache-bust=${date}`
                    : `${CLOUDFRONT_URL}/data.json`;
                const response = await fetch(url);
                console.log(url);
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch from CloudFront: ${response.statusText}`
                    );
                }
                const result: JSON = await response.json();
                if (result && result.items && dispatch) {
                    console.log(result);
                    setData(result.items);
                    dispatch({
                        type: actionTypes.UPDATE_PRICES,
                        payload: result.items,
                    });
                }
            } catch (err: any) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [dispatch]);

    return { data, isLoading, error };
};
