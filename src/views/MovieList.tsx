import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MovieDetailsInterface, movieListProps } from "../interface/interface";
import DetailsPopup from "./DetailsPopup";

const MovieList: React.FC<movieListProps> = ({ list, viewType }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsInterface>({
    adult: false,
    backdrop_path: "",
    belongs_to_collection: {},
    budget: 0,
    genres: [],
    homepage: "",
    id: 0,
    imdb_id: "",
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    production_companies: [],
    production_countries: [],
    release_date: "",
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: "",
    tagline: "",
    title: "",
    video: false,
    vote_average: 0,
    vote_count: 0,
  });
  const [isSelected, setIsSelected] = useState<number>(0);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickCell = (c: MovieDetailsInterface) => {
    setIsSelected(c.id);
    const fetchMovieDetails = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTUzYmRkZGNiMGQxNjJhNmI0OWEzMzEyMWM0OGRiNSIsInN1YiI6IjY0ZDVlMWRjZDEwMGI2MDBhZGEwNjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hTRNv114THusMoyraZXWGg6nW_PgCG7fFZvnB5BQhJQ",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${c.id}?language=en-US`,
      fetchMovieDetails
    )
      .then((response) => response.json())
      .then((response) => {
        setMovieDetails(response);
        openModal();
      })
      .catch((err) => alert(err));
  };

  return (
    <Grid>
      <Grid className="movie-list--card-arr">
        {list.map((row: MovieDetailsInterface, index: number) => (
          <Grid
            key={index}
            className={
              viewType === 1 ? "movie-list--card-grid" : "movie-list--card-list"
            }
          >
            <Grid
              className={isSelected === row.id ? "movie-list--highlight" : ""}
            >
              <Button onClick={() => onClickCell(row)} key={index}>
                <Grid>
                  <LazyLoadImage
                    className="fade-in"
                    src={`https://image.tmdb.org/t/p/original${row.poster_path}`}
                    width={100}
                  />
                  <Grid>{row.title}</Grid>
                </Grid>
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <DetailsPopup
        detailsData={movieDetails}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </Grid>
  );
};

export default MovieList;
