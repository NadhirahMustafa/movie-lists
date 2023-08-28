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
  const [typeMovie, setTypeMovie] = useState("");
  const [viewType, setViewType] = useState("");
  const typeMovieCheck =
    typeMovie === typeConstant.NOW_PLAYING ? initList : topRatedList;

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
    // setTimeout(() => {
    fetchNowPlayingList();
    // }, 1000);
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
    // setTimeout(() => {
    fetchTopRatedList();
    // }, 1000);
  }, []);

  useEffect(() => {
    setNumResult(list.length);
  }, [list]);

  const setListNew = (s: movieInterface[]) => {
    setList(s);
    setNumResult(s.length);
  };

  const handleNowPlaying = () => {
    setList(initList);
    setTypeMovie(typeConstant.NOW_PLAYING);
  };

  const handleTopRated = () => {
    setList(topRatedList);
    setTypeMovie(typeConstant.TOP_RATED);
  };

  const noResult = (
    <>
      {init && (
        <Grid>
          <Grid className="dashboard--no-result-alert">
            {dashboard.no_result}
          </Grid>
          <Grid className="dashboard--no-result-message">
            {dashboard.error_message}
          </Grid>
        </Grid>
      )}
    </>
  );

  const hasResult = (
    <>
      <Grid className="dashboard--margin-bottom-20">
        {numResult} {dashboard.result_found}
      </Grid>
      <MovieList list={list} viewType={viewType} />
    </>
  );

  const renderMovieType = (
    <Grid container>
      <Grid item className="common--button-padding">
        <Button onClick={handleNowPlaying} className="dashboard--button">
          <p
            className={`button--color button--libre-style ${
              typeMovie === typeConstant.NOW_PLAYING
                ? "search--button-active "
                : ""
            }`}
          >
            {dashboard.now_playing}
          </p>
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={handleTopRated} className="dashboard--button">
          <p
            className={`button--color button--libre-style ${
              typeMovie === typeConstant.TOP_RATED
                ? "search--button-active "
                : ""
            }`}
          >
            {dashboard.top_rated}
          </p>
        </Button>
      </Grid>
    </Grid>
  );

  const renderDataView = (
    <Grid container>
      <Grid item>
        <Button
          onClick={() => setViewType(viewConstant.GRID)}
          className="dashboard--button"
        >
          <p
            className={`dashboard--small-font button--color button--libre-style ${
              viewType === viewConstant.GRID ? "search--button-active" : ""
            }`}
          >
            {dashboard.grid}
          </p>
        </Button>
      </Grid>
      <Grid item className={"common--button-padding"}>
        <Button
          onClick={() => setViewType(viewConstant.LIST)}
          className="dashboard--button"
        >
          <p
            className={`dashboard--small-font button--color button--libre-style ${
              viewType === viewConstant.LIST ? "search--button-active" : ""
            }`}
          >
            {dashboard.list}
          </p>
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Grid className="dashboard--margin-bottom">
        <Grid className="dashboard--page-title dashboard--header">
          {dashboard.title}
        </Grid>
        {renderMovieType}
        {renderDataView}
        <Search
          init={typeMovieCheck}
          onSearch={setListNew}
          resetList={() => setList(typeMovieCheck)}
        />
        {loading && <CardSkeleton />}
        {!loading && numResult !== 0 ? hasResult : noResult}
      </Grid>

      <Grid className="dashboard--footer">{dashboard.footer}</Grid>
    </>
  );
};

export default Dashboard;
