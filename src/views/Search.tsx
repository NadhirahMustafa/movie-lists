import React, { useState } from 'react';
import '../styles/Dashboard.scss';
import { search } from '../constants/message';
import { Grid, TextField, Button } from '@mui/material';

interface movieListProps {
    init: string[];
    onSearch: (searchTerm: string[]) => void;
    resetList: () => void;
}

const Search: React.FC<movieListProps> = ({ init, onSearch, resetList }) => {

    const [value, setValue] = useState('');

    const handleInputChange = (e: any) => {
        setValue(e.target.value);
    };

    const handleClick = () => {
        filteredData();
    };

    const handleReset = () => {
        setValue('');
        resetList();
    };

    const filteredData = () => {
        let result = value !== '' ? init.filter(
            (movie: any) =>
                movie.title.toLowerCase().includes(value.toString().toLowerCase())
        ) : init
        onSearch(result);
    };

    return (
        <Grid className='search--padding'>
            <Grid container className='search--justify'>
                <Grid item className='search--textfield-padding'>
                    <TextField
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        placeholder={search.search_movie}
                        size='small'
                    />
                </Grid>
                <Grid item className='search--button-padding'><Button className='search--button' onClick={handleClick}>{search.search}</Button></Grid>
                <Grid item><Button className='search--button' onClick={handleReset}>{search.reset}</Button></Grid>
            </Grid>
        </Grid>
    );
}

export default Search;
