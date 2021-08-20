import React, { useState, useCallback } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import CustomRadio from "../components/CustomRadio";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";
import {
    SearchInput,
    RadioInputsWrapper,
    SearchButtonWrapper,
} from "./Home.styled";

const renderResults = (results) => {
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

const Home = () => {
    const [input, setInput] = useLastQuery();
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState("shows");

    const isShowsSearch = searchOption === "shows";

    const onInputChange = useCallback(
        (ev) => {
            setInput(ev.target.value);
        },
        [setInput]
    );

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

    const onRadioChange = useCallback((ev) => {
        setSearchOption(ev.target.value);
    }, []);
    console.log(searchOption);

    return (
        <MainPageLayout>
            <SearchInput
                type='text'
                placeholder='Search for something'
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                value={input}
            />
            <RadioInputsWrapper>
                <div>
                    <CustomRadio
                        label='Shows'
                        id='shows-search'
                        value='shows'
                        checked={isShowsSearch}
                        onChange={onRadioChange}
                    />
                </div>
                <div>
                    <CustomRadio
                        label='Actors'
                        id='actors-search'
                        value='people'
                        checked={!isShowsSearch}
                        onChange={onRadioChange}
                    />
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
                <button type='button' onClick={onSearch}>
                    Search
                </button>
            </SearchButtonWrapper>
            {renderResults(results)}
        </MainPageLayout>
    );
};

export default Home;
