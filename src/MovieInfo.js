import React from 'react'
import axios from "axios"
import "./styles.css"

export default function MovieInfo({movie, movieLink}) {

    

    



    return (
        <div className="movie-item">
            <span><a href={`http://imdb.com/title/${movie.id}`}>{movie.name}</a></span>
        </div>
    )
}
