import React, { useState } from "react";
require ('dotenv').config();

function SearchBar(){
    const [query,setQuery] = useState('');
    const [searchedMovie,setSM] =useState('');
    const [movies,setMovies] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY;
    



    const fetchMovie = async (e)=>{

        e.preventDefault();
       
        const url =  "https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&language=en-US&query="+query+"&page=1&include_adult=false"
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.results);
            setMovies(data.results);
            setSM(query);
                setQuery('');

        }catch(err){
            console.log(err);
        }
    }


    return<div>
         <form className="form" onSubmit={fetchMovie}>
                <label htmlFor="query" className="lable"> Enter your movie name </label>
                <input type="text" required placeholder="i.e Black Panther" className="input" onChange={ e => setQuery(e.target.value)} value={query}/>
                <button type="submit" className = "button">search </button>
         </form>
         <p className="searchM">{  searchedMovie === "" ? null : "You searched for " + searchedMovie.charAt(0).toUpperCase()+searchedMovie.slice(1)}</p>
         <div className="card-list" >
            {movies.filter(movie => movie.poster_path).map(movie => 
            <div className="card" key={movie.id}>
                <img  className="card-image" src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} 
                alt={movie.title + "poster"}
                />
                <div className="card-content">
                <h3 className="card-title" >{movie.title} </h3>
                <p> <small>RELESE DATE : {movie.release_date}</small> </p>
                <p> <small>RATING : {movie.vote_average}</small> </p>
                <p className="card-desc" > DESCRIPTION : {movie.overview} </p>

                </div>
            </div>
             )}
         </div>
     </div>;
}

export default SearchBar;