import React, { useEffect, useState } from 'react'
import api from '../api';
import { useDispatch, useSelector } from 'react-redux'
import { MovieReducerActions as ACTIONS } from '../redux/reducers/movieSlice'
import Banner from '../components/Banner';
import Movies from '../pages/Movies';
import MovieSlide from '../components/MovieSlide';
import HashLoader from 'react-spinners/HashLoader'
const Home = () => {
  const [loading, setLoading] = useState(true);
  // const popularArr = useSelector(state => state.movie.popular);
  // const topRatedArr = useSelector(state => state.movie.topRated);
  // const upcomingArr = useSelector(state => state.movie.upcoming);

  const {
    popular: popularArr,
    topRated:topRatedArr,
    upcoming: upcomingArr, } = useSelector(state => state.movie);
  const dispatch = useDispatch();

  const getData = async(code) => {
    const res = await api.get(`/movie/${code}`,{
      params: {
        language: 'ko-KR',
        page: '1'
      }
    });
  }
  const getAll = async() => {
    setLoading(true);
    const pop = api.get('/movie/popular?language=ko-KR&page=1')
    const top = api.get('/movie/top_rated?language=ko-KR&page=1')
    const up = api.get('/movie/upcoming?language=ko-KR&page=1')
    const gen = api.get('/genre/movie/list?language=ko')

    const [popular, topRated, upcoming, genre] = await Promise.all([pop, top, up, gen]);

    //dispatch(ACTIONS.init({target:'pop', data:popular.data.results}));
    //dispatch(ACTIONS.init({target:'top',data:topRated.data.results}));
    //dispatch(ACTIONS.init({target:'up', data:upcoming.data.results}));
    dispatch(ACTIONS.init({
      popular: popular.data,
      topRated: topRated.data,
      upcoming: upcoming.data,
      genre: genre.data
    }));
    setLoading(false);
  }
  useEffect(()=>{
    getAll();
  },[]);
  return (
    <div>
      {loading ? (
        <div className='loader'>
          <HashLoader
            loading={loading}
            color='white'
            size={50}
          />
        </div>
      ) : (
        <>
        {/* {
          popularArr.length && <Banner movie={popularArr[0]}/>
        } */}
        <Banner movie={popularArr[0]}/>
        <MovieSlide name={'Popular Movie'} movies={popularArr}/>
        <MovieSlide name={'Top rated Movie'} movies={topRatedArr}/>
        <MovieSlide name={'Upcoming Movie'} movies={upcomingArr}/>
        </>
      )}
    </div>
  )
}

export default Home
