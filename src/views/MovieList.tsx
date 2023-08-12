import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import DetailsPopup from './DetailsPopup';
import { LazyLoadImage } from "react-lazy-load-image-component";

interface movieListProps {
    list: any[];
    viewType: number;
}

const MovieList: React.FC<movieListProps> = ({ list, viewType }) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const [isSelected, setIsSelected] = useState(null);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const onClickCell = (c: any) => {
        setIsSelected(c.id);
        const fetchMovieDetails = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTUzYmRkZGNiMGQxNjJhNmI0OWEzMzEyMWM0OGRiNSIsInN1YiI6IjY0ZDVlMWRjZDEwMGI2MDBhZGEwNjViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hTRNv114THusMoyraZXWGg6nW_PgCG7fFZvnB5BQhJQ'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${c.id}?language=en-US`, fetchMovieDetails)
            .then(response => response.json())
            .then(response => { setMovieDetails(response); openModal() })
            .catch(err => alert(err));
    };

    return (
        <Grid>
            <Grid className='movie-list--card-arr'>
                {list.map((row: any, index: any) => (
                    <Grid key={index} className={viewType === 1 ? 'movie-list--card-grid' : 'movie-list--card-list'}>
                        <Grid className={isSelected === row.id ? 'movie-list--highlight' : ''}>
                            <Button onClick={() => onClickCell(row)} key={index}>
                                <Grid>
                                    <LazyLoadImage className='fade-in' src={`https://image.tmdb.org/t/p/original${row.poster_path}`} width={100} />
                                    <Grid>{row.title}</Grid>
                                </Grid>
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <DetailsPopup detailsData={movieDetails} isOpen={isModalOpen} onClose={closeModal} />
        </Grid>
    );
}

export default MovieList;
