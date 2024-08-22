import { useContext, useEffect, useState } from "react";
import { ContextDispatchContext, actionTypes } from "../context/store";
import { JSON, Structure } from "../components/types/main";

// const BUCKET_NAME = "kata987";
// const REGION = "us-west-2";
const CLOUDFRONT_URL = "https://dg4fo0dwgiaqb.cloudfront.net";

export const FetchData = () => {
    const dispatch = useContext(ContextDispatchContext);
    const [data, setData] = useState<Structure[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${CLOUDFRONT_URL}/data.json`);
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch from CloudFront: ${response.statusText}`
                    );
                }
                const result: JSON = await response.json();
                if (result && result.items && dispatch) {
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
