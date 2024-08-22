import { useEffect, useState } from "react";

// const BUCKET_NAME = "kata987";
// const REGION = "us-west-2";
const CLOUDFRONT_URL = "https://dg4fo0dwgiaqb.cloudfront.net";

export const FetchData = () => {
    const [data, setData] = useState<string | undefined>(undefined);
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
                const result = await response.text();
                console.log(result);
                setData(result);
            } catch (err: any) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return { data, isLoading, error };
};
