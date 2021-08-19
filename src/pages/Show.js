import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import Details from "../components/show/Details";
import ShowMainData from "../components/show/ShowMainData";
import Seasons from "../components/show/Seasons";
import Cast from "../components/show/Cast";
import { apiGet } from "../misc/config";
import { ShowPageWrapper, InfoBlock } from "./Show.styled";

const reducer = (prevState, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS": {
            return { ...prevState, isLoading: false, show: action.show };
        }
        case "FETCH_FAILED": {
            return { ...prevState, isLoading: false, error: action.error };
        }

        default:
            return prevState;
    }
};

const initialState = {
    show: null,
    isLoading: true,
    error: null,
};

const Show = () => {
    const { id } = useParams();

    const [{ show, isLoading, error }, dispatch] = useReducer(
        reducer,
        initialState
    );

    // const [show, setShow] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
            .then((results) => {
                if (isMounted) {
                    dispatch({ type: "FETCH_SUCCESS", show: results });
                    // setShow(results);
                    // setIsLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    dispatch({ type: "FETCH_FAILED", error: err.message });
                    // setError(err.message);
                    // setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [id]);

    console.log("show", show);

    if (isLoading) {
        return <div>Data is being Loaded</div>;
    }

    if (error) {
        return <div>Error occured {error}</div>;
    }

    return (
        <ShowPageWrapper>
            <ShowMainData
                image={show.image}
                name={show.name}
                rating={show.rating}
                summary={show.summary}
                tags={show.genres}
            />

            <InfoBlock>
                <h2>Details</h2>
                <Details
                    status={show.status}
                    network={show.network}
                    premiered={show.premiered}
                />
            </InfoBlock>
            <InfoBlock>
                <h2>Seasons</h2>
                <Seasons seasons={show._embedded.seasons} />
            </InfoBlock>
            <InfoBlock>
                <h2>Cast</h2>
                <Cast cast={show._embedded.cast} />
            </InfoBlock>
        </ShowPageWrapper>
    );
};

export default Show;
