import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { movieInterface } from "../interface/interface";
import { getNowPlayingMovies, getTopRatedMovies } from "../service/api.service";
import MovieList from "./MovieList";
import Search from "./Search";
import CardSkeleton from "../component/CardSkeleton";
import { dashboard, common } from "../constants/message";
import "../styles/Dashboard.scss";

const Dashboard: React.FC = () => {
  const [list, setList] = useState<movieInterface[]>([]);
  const [topRatedList, setTopRatedList] = useState<movieInterface[]>([]);
  const [initList, setInitList] = useState<movieInterface[]>([]);
  const [numResult, setNumResult] = useState(0);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);
  const [typeMovie, setTypeMovie] = useState(0);
  const [viewType, setViewType] = useState(0);

  const fetchNowPlayingList = async () => {
    let res = await getNowPlayingMovies();
    if (res) {
      setList(res);
      setInitList(res);
      setNumResult(res.length);
      setLoading(false);
      setInit(true);
      setTypeMovie(1);
      setViewType(2);
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
  };

  useEffect(() => {
    setNumResult(list.length);
  }, [list]);

  const renderMovieType = () => {
    return (
      <Grid container>
        <Grid item className={"search--button-padding"}>
          <Button className="search--button" onClick={handleNowPlaying}>
            <p className={typeMovie === 1 ? "search--button-active" : ""}>
              {dashboard.now_playing}
            </p>
          </Button>
        </Grid>
        <Grid item>
          <Button className="search--button" onClick={handleTopRated}>
            <p className={typeMovie === 2 ? "search--button-active" : ""}>
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
          <Button className="search--button" onClick={handleListView}>
            <p
              className={
                viewType === 1
                  ? "search--button-active dashboard--small-font"
                  : "dashboard--small-font"
              }
            >
              {dashboard.list}
            </p>
          </Button>
        </Grid>
        <Grid item>
          <Button className="search--button" onClick={handleGridView}>
            <p
              className={
                viewType === 2
                  ? "search--button-active dashboard--small-font"
                  : "dashboard--small-font"
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
        <Grid className="dashboard--page-title">{dashboard.title}</Grid>
        {renderMovieType()}
        {renderDataView()}
        <Search init={typeMovie === 1 ? initList : topRatedList} onSearch={setListNew} resetList={resetList} />
        {loading && <CardSkeleton />}
        {!loading && numResult !== 0 ? hasResult() : noResult()}
      </Grid>

      <Grid className="dashboard--footer">{dashboard.footer}</Grid>
    </>
  );
};

export default Dashboard;
