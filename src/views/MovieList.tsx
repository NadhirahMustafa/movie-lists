import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getMovieDetails } from "../service/api.service";
import { MovieDetailsInterface, movieListProps, movieInterface } from "../interface/interface";
import { common } from "../constants/message";
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

  const onClickCell = async (c: movieInterface) => {
    setIsSelected(c.id);
    let res = await getMovieDetails(c.id);
    if (res) {
      setMovieDetails(res);
      openModal();
    } else {
      alert(common.alertMessage);
    }
  };

  return (
    <Grid>
      <Grid className="movie-list--card-arr">
        {list.map((row: movieInterface, index: number) => (
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
                  <Grid><p className="button--color button--raleway-style">{row.title}</p></Grid>
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
