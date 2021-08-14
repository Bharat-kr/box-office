import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import {apiGet} from '../misc/config';

const Home = () => {
    const [input , setInput] = useState('');
    const [results , setResults] = useState(null);

    const onInputChange = ev => {
        setInput(ev.target.value);
    }

    const onSearch = () =>{
        // https://api.tvmaze.com/search/shows?q=girls
        apiGet(`/search/shows?q=${input}`).then(data => {setResults(data); console.log(data)});
    }

    const onKeyDown = (ev) => {
        if(ev.keyCode === 13){
           onSearch();
        }
    }

    const renderResults = () => {
        if(results && results.length === 0){
            return <div>No results found</div>
        }

        if(results && results.length > 0){
            return <div>{results.map( (item) => <div key={item.show.name}>{item.show.name}</div>)}</div>
        }

        return null;
    }

    return (
        <MainPageLayout>
            <input type="text" onChange ={onInputChange} onKeyDown={onKeyDown} value={input}/>
            <button type="button" onClick={onSearch}>Search</button>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
