import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { movieInterface } from "../interface/interface";
import { getNowPlayingMovies, getTopRatedMovies } from "../service/api.service";
import MovieList from "./MovieList";
import Search from "./Search";
import CardSkeleton from "../component/CardSkeleton";
import { dashboard, common } from "../constants/message";
import { viewConstant, typeConstant } from "../constants/constant";
import "../styles/Dashboard.scss";

const Dashboard: React.FC = () => {
  const [list, setList] = useState<movieInterface[]>([]);
  const [topRatedList, setTopRatedList] = useState<movieInterface[]>([]);
  const [initList, setInitList] = useState<movieInterface[]>([]);
  const [numResult, setNumResult] = useState(0);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);
  const [typeMovie, setTypeMovie] = useState('');
  const [viewType, setViewType] = useState('');

  const fetchNowPlayingList = async () => {
    let res = await getNowPlayingMovies();
    if (res) {
      setList(res);
      setInitList(res);
      setNumResult(res.length);
      setLoading(false);
      setInit(true);
      setTypeMovie(typeConstant.NOW_PLAYING);
      setViewType(viewConstant.GRID);
    } else {
      alert(common.alertMessage);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchNowPlayingList();
    }, 1000);
  }, []);

  const fetchTopRatedList = async () => {
    let res = await getTopRatedMovies();
    if (res) {
      setTopRatedList(res);
    } else {
      alert(common.alertMessage);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchTopRatedList();
    }, 1000);
  }, []);

  const setListNew = (s: movieInterface[]) => {
    setList(s);
    setNumResult(s.length);
  };

  const noResult = () => {
    if (init) {
      return (
        <>
          <Grid className="dashboard--no-result-alert">
            {dashboard.no_result}
          </Grid>
          <Grid className="dashboard--no-result-message">
            {dashboard.error_message}
          </Grid>
        </>
      );
    }
  };

  const hasResult = () => {
    return (
      <>
        <Grid>
          {numResult} {dashboard.result_found}
        </Grid>
        <MovieList list={list} viewType={viewType} />
      </>
    );
  };

  const handleTopRated = () => {
    setList(topRatedList);
    setTypeMovie(typeConstant.TOP_RATED);
  };

  const handleNowPlaying = () => {
    setList(initList);
    setTypeMovie(typeConstant.NOW_PLAYING);
  };

  const resetList = () => {
    setList(typeMovie === typeConstant.NOW_PLAYING ? initList : topRatedList);
  };

  useEffect(() => {
    setNumResult(list.length);
  }, [list]);

  const renderMovieType = () => {
    return (
      <Grid container>
        <Grid item className="search--button-padding">
          <Button onClick={handleNowPlaying}>
            <p className={typeMovie === typeConstant.NOW_PLAYING ? "search--button-active button--color button--libre-style" : "button--color button--libre-style"}>
              {dashboard.now_playing}
            </p>
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleTopRated}>
            <p className={typeMovie === typeConstant.TOP_RATED ? "search--button-active button--color button--libre-style" : "button--color button--libre-style"}>
              {dashboard.top_rated}
            </p>
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderDataView = () => {
    return (
      <Grid container>
        <Grid item className={"search--button-padding"}>
          <Button onClick={() => setViewType(viewConstant.LIST)}>
            <p
              className={
                viewType === viewConstant.LIST
                  ? "search--button-active dashboard--small-font button--color button--libre-style"
                  : "dashboard--small-font button--color button--libre-style"
              }
            >
              {dashboard.list}
            </p>
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={() => setViewType(viewConstant.GRID)}>
            <p
              className={
                viewType === viewConstant.GRID
                  ? "search--button-active dashboard--small-font button--color button--libre-style"
                  : "dashboard--small-font button--color button--libre-style"
              }
            >
              {dashboard.grid}
            </p>
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Grid className="dashboard--margin-bottom">
        <Grid className="dashboard--page-title dashboard--header">{dashboard.title}</Grid>
        {renderMovieType()}
        {renderDataView()}
        <Search init={typeMovie === typeConstant.NOW_PLAYING ? initList : topRatedList} onSearch={setListNew} resetList={resetList} />
        {loading && <CardSkeleton />}
        {!loading && numResult !== 0 ? hasResult() : noResult()}
      </Grid>

      <Grid className="dashboard--footer">{dashboard.footer}</Grid>
    </>
  );
};

export default Dashboard;
