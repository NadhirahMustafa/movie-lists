import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';
import Search from './Search';
import CardSkeleton from '../component/CardSkeleton';
import { dashboard } from '../constants/message';
import '../styles/Dashboard.scss';
import { Grid, Button } from '@mui/material';

const Dashboard: any = () => {

  const [list, setList] = useState([]);
  const [topRatedList, setTopRatedList] = useState([]);
  const [initList, setInitList] = useState([]);
  const [numResult, setNumResult] = useState(0);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);
  const [typeMovie, setTypeMovie] = useState(0);
  const [viewType, setViewType] = useState(0);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const fetchData = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTUzYmRkZGNiMGQxNjJhNmI0OWEzMzEyMWM0OGRiNSIsInN1YiI6IjY0ZDVlMWRjZDEwMGI2MDBhZGEwNjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hTRNv114THusMoyraZXWGg6nW_PgCG7fFZvnB5BQhJQ'
        }
      };

      fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', fetchData)
        .then(response => response.json())
        .then(response => { setList(response.results); setInitList(response.results); setNumResult(response.results.length); setLoading(false); setInit(true); setTypeMovie(1); setViewType(2) })
        // .then(response => setInitList(response.results))
        .catch(err => alert(err));
    }, 3000)
  }, []);

  useEffect(() => {
    const fetchTopRated = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTUzYmRkZGNiMGQxNjJhNmI0OWEzMzEyMWM0OGRiNSIsInN1YiI6IjY0ZDVlMWRjZDEwMGI2MDBhZGEwNjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hTRNv114THusMoyraZXWGg6nW_PgCG7fFZvnB5BQhJQ'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', fetchTopRated)
      .then(response => response.json())
      .then(response => setTopRatedList(response.results))
      .catch(err => alert(err));
  }, [])

  const setListNew = (s: any) => {
    setList(s);
    setNumResult(s.length)
  };

  const noResult = () => {
    if (init) {
      return (
        <>
          <Grid className='dashboard--no-result-alert'>{dashboard.no_result}</Grid>
          <Grid className='dashboard--no-result-message'>{dashboard.error_message}</Grid>
        </>
      );
    }
  };

  const hasResult = () => {
    return (
      <>
        <Grid>{numResult} {dashboard.result_found}</Grid>
        <MovieList list={list} viewType={viewType} />
      </>);
  };

  const handleTopRated = () => {
    setList(topRatedList);
    setTypeMovie(2);
  };

  const handleNowPlaying = () => {
    setList(initList);
    setTypeMovie(1);
  };

  const handleListView = () => {
    setViewType(1);
  };

  const handleGridView = () => {
    setViewType(2);
  };

  const resetList = () => {
    setList(typeMovie === 1 ? initList : topRatedList);
  }

  useEffect(() => {
    setNumResult(list.length);
  }, [list])

  const renderMovieType = () => {
    return (
      <Grid container>
        <Grid item className={'search--button-padding'}>
          <Button className='search--button' onClick={handleNowPlaying}>
            <p className={typeMovie === 1 ? 'search--button-active' : ''}>{dashboard.now_playing}</p>
          </Button>
        </Grid>
        <Grid item>
          <Button className='search--button' onClick={handleTopRated}>
            <p className={typeMovie === 2 ? 'search--button-active' : ''}>{dashboard.top_rated}</p>
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderDataView = () => {
    return (
      <Grid container>
        <Grid item className={'search--button-padding'}>
          <Button className='search--button' onClick={handleListView}>
            <p className={viewType === 1 ? 'search--button-active dashboard--small-font' : 'dashboard--small-font'}>{dashboard.list}</p>
          </Button>
        </Grid>
        <Grid item>
          <Button className='search--button' onClick={handleGridView}>
            <p className={viewType === 2 ? 'search--button-active dashboard--small-font' : 'dashboard--small-font'}>{dashboard.grid}</p>
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Grid className='dashboard--margin-bottom'>
        <Grid className='dashboard--page-title'>{dashboard.title}</Grid>
        {renderMovieType()}
        {renderDataView()}
        <Search init={list} onSearch={setListNew} resetList={resetList} />
        {loading && <CardSkeleton />}
        {!loading && numResult !== 0 ? hasResult() : noResult()}
      </Grid>

      <Grid className='dashboard--footer'>{dashboard.footer}</Grid>
    </>
  );
}

export default Dashboard;