import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import {apiGet} from '../misc/config';

const Home = () => {
    const [input , setInput] = useState('');
    const [results , setResults] = useState(null);
    const [searchOption , setSearchOption] = useState('shows');

    const isShowsSearch = searchOption === 'shows';

    const onInputChange = ev => {
        setInput(ev.target.value);
    }

    const onSearch = () =>{
        // https://api.tvmaze.com/search/shows?q=girls
        apiGet(`/search/${searchOption}?q=${input}`).then(data => {setResults(data); console.log(data)});
    }

    const onKeyDown = (ev) => {
        if(ev.keyCode === 13){
           onSearch();
        }
    }

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);
    }
    console.log(searchOption);

    const renderResults = () => {
        if(results && results.length === 0){
            return <div>No results found</div>
        }

        if(results && results.length > 0){
            return results[0].show ? results.map( (item) => <div key={item.show.name}>{item.show.name}</div>) : results.map( (item) => <div key={item.person.name}>{item.person.name}</div>);
        }

        return null;
    }

    return (
        <MainPageLayout>
            <input type="text" placeholder="Search for something" onChange ={onInputChange} onKeyDown={onKeyDown} value={input}/>
            <div>
                <label htmlFor="shows-search">
                    Shows
                    <input id="shows-search" type="radio" value="shows" checked={isShowsSearch} onChange={onRadioChange}/>
                </label>
                <label htmlFor="actors-search">
                    Actors
                    <input id="actors-search" type="radio" value="people" checked={!isShowsSearch} onChange={onRadioChange}/>
                </label>
            </div>
            <button type="button" onClick={onSearch}>Search</button>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
