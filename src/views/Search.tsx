import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { movieInterface, searchProps } from '../interface/interface';
import { search } from '../constants/message';
import '../styles/Dashboard.scss';

const Search: React.FC<searchProps> = ({ init, onSearch, resetList }) => {

    const [value, setValue] = useState('');

    const handleClick = () => {
        filteredData();
    };

    const handleReset = () => {
        setValue('');
        resetList();
    };

    const filteredData = () => {
        let result = value !== '' ? init.filter(
            (movie: movieInterface) =>
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
                        onChange={(e)=>setValue(e.target.value)}
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
