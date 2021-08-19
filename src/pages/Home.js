import React, { useState, useEffect } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";

const Home = () => {
    const [input, setInput] = useLastQuery();
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState("shows");

    const isShowsSearch = searchOption === "shows";

    useEffect(() => {
        console.log("use effect is run");
    }, []);

    const onInputChange = (ev) => {
        setInput(ev.target.value);
    };

    const onSearch = () => {
        // https://api.tvmaze.com/search/shows?q=girls
        apiGet(`/search/${searchOption}?q=${input}`).then((data) => {
            setResults(data);
            console.log(data);
        });
    };

    const onKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            onSearch();
        }
    };

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);
    };
    console.log(searchOption);

    const renderResults = () => {
        if (results && results.length === 0) {
            return <div>No results found</div>;
        }

        if (results && results.length > 0) {
            return results[0].show ? (
                <ShowGrid data={results} />
            ) : (
                <ActorGrid data={results} />
            );
        }

        return null;
    };

    return (
        <MainPageLayout>
            <input
                type='text'
                placeholder='Search for something'
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                value={input}
            />
            <div>
                <label htmlFor='shows-search'>
                    Shows
                    <input
                        id='shows-search'
                        type='radio'
                        value='shows'
                        checked={isShowsSearch}
                        onChange={onRadioChange}
                    />
                </label>
                <label htmlFor='actors-search'>
                    Actors
                    <input
                        id='actors-search'
                        type='radio'
                        value='people'
                        checked={!isShowsSearch}
                        onChange={onRadioChange}
                    />
                </label>
            </div>
            <button type='button' onClick={onSearch}>
                Search
            </button>
            {renderResults()}
        </MainPageLayout>
    );
};

export default Home;
