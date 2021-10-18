import React from 'react'
import "./styles.css"

export default function MovieInfo({movie, movieLink}) {


    return (
        <div className="movie-item">
            <span><a target="_blank" href={`http://imdb.com/title/${movie.id}`}>{movie.name}</a></span>
        </div>
    )
}
