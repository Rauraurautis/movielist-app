import React, { useState, useEffect } from "react"
import MovieInfo from "./MovieInfo.js"
import axios from "axios"
import "./styles.css";




var options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/auto-complete',
  params: { q: 'game of thr' },
  headers: {
    'x-rapidapi-host': 'imdb8.p.rapidapi.com',
    'x-rapidapi-key': '054186ea1cmsh9e121c1f09235dcp18a4a5jsnc4427693757f'
  }
};




function App() {
  const [movieArray, setMovieArray] = useState("");
  const [movies, setMovies] = useState([{name: "Testmovie"}, {name: "Testmovie"}, {name: "Testmovie"}, {name: "Testmovie"}]);
  const [loading, setLoading] = useState(false);


  const submitMovies = (e) => {
    e.preventDefault();
    setLoading(true);
    let moviesSplit = movieArray.split("\n");
    let promises = [];
    let moviesArray = [];
    for (let i = 0; i < moviesSplit.length; i++) {
      let whichMovie = moviesSplit[i];
      promises.push(
        axios.request({ ...options, params: { q: whichMovie } }, { timeout: 1000 }).then(res => {
          console.log(res.data.d[0].id)
          moviesArray.push({ "name": moviesSplit[i], "id": res.data.d[0].id });
        }).catch(error => {
          let a = error.message;
          console.log(a.replace("undefined", moviesSplit[i]))

        }))
    }
    Promise.all(promises).then(() => {
      setMovies(movies.concat(moviesArray));
      setLoading(false);
      setMovieArray("");
    })


  }













  return (
    <div>
      <div className="header"><h1>Movie list</h1></div>
      <div className="form-container">
        <form onSubmit={submitMovies}>
          <textarea onChange={(e) => { setMovieArray(e.target.value) }} value={movieArray}></textarea>
          <div className="submit-button"><input type="submit" value="Submit" /></div>
        </form>
      </div>
      <div class={loading ? "loader" : ""}></div>
      <div className="movielist-container">
        {movies.map(movie => {
          return <MovieInfo movie={movie} />
        })}
      </div>
    </div>

  );
}

export default App;
