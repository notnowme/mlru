import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const genreList = useSelector(state => state.movie.genre);
  const [show, setShow] = useState(false);
  const styled = {
    backgroundImage: `url('https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${movie.poster_path}')`,
  };

  return (
    <div
      className="movie-card"
      style={styled}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Link to={`/movies/${movie.id}`}>
        {show && (
          <div className="overlay">
            <h3>{movie.title}</h3>
            <div className="genres">
              {/* {
              movie.genre_ids.map((data, i) => (
                genreList.filter(el => el.id === data)
                .map(el => <Badge bg='danger' key={i}>{el.name}</Badge>)
              ))
            } */}
              {movie.genre_ids.map((data, i) => (
                <Badge bg="danger" key={i}>
                  {genreList.find((item) => item.id === data).name}
                </Badge>
              ))}
            </div>
            <div>
              {/* <h3 className="fs-5">
              평점: {movie.vote_average} | {movie.adult ? "성인" : "청소년"}
            </h3> */}
              <div className="info">
                <span>평점: {movie.vote_average}점</span>
                <span>|</span>
                <span>{movie.adult ? "청불" : "청소년 관람"}</span>
              </div>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};
// genre_ids, vote_average, adult, title
export default MovieCard;
