import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { apiGet } from "../misc/config";

const reducer = (prevState , action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':{
            return {...prevState , isLoading: false ,show: action.show}
        }
        case 'FETCH_FAILED':{
            return {...prevState , isLoading: false , error: action.error}
        }

    
        default:
            return prevState;
    }
}

const initialState = {
    show: null ,
    isLoading: true,
    error: null,
}

const Show = () => {
    const { id } = useParams();

    const [{show , isLoading , error} , dispatch] = useReducer(reducer, initialState);

    // const [show, setShow] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
            .then((results) => {
                setTimeout(() => {
                    if(isMounted){
                        dispatch( {type: 'FETCH_SUCCESS' , show: results})
                        // setShow(results);
                        // setIsLoading(false);
                    }
                }, 2000);
            })
            .catch((err) => {
                if(isMounted){
                    dispatch( {type: 'FETCH_FAILED' , error : err.message})
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

    return <div>this is show page</div>;
};

export default Show;
