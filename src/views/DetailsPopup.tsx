import React from 'react';
import Modal from 'react-modal';
import { Grid, Button } from '@mui/material';
import { PopupModalProps, genresInterface, languageInterface } from '../interface/interface';
import { detailsPopup } from '../constants/message';
import '../styles/Dashboard.scss';

Modal.setAppElement('#root');

const DetailsPopup: React.FC<PopupModalProps> = ({ isOpen, onClose, detailsData }) => {
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Popup Modal"
      className='details--modal-width'
    >
      <Grid className='details--padding'>

        <Grid className='common--justify'>
          <img src={`https://image.tmdb.org/t/p/original${detailsData.poster_path}`} width={100} />
        </Grid>
        <Grid className='common--justify'>
          <b>{detailsData.title}</b>
        </Grid>
        <Grid className='details--padding-top'>
          <Grid>
            <b>{detailsPopup.tagline}</b>{detailsData.tagline}
          </Grid>
          <Grid>
            <b>{detailsPopup.overview}</b>{detailsData.overview}
          </Grid>
          <Grid>
            <b>{detailsPopup.release_date}</b>{detailsData.release_date}
          </Grid>
          <Grid>
            <b>{detailsPopup.genre}</b>{detailsData.genres?.map((x: genresInterface, index: number) => index === detailsData.genres.length - 1 ? `${x.name}` : `${x.name}, `)}
          </Grid>
          <Grid>
            <b>{detailsPopup.runtime}</b>{detailsData.runtime}
          </Grid>
          <Grid>
            <b>{detailsPopup.language}</b>{detailsData.spoken_languages?.map((x: languageInterface, index: number) => index === detailsData.spoken_languages.length - 1 ? `${x.english_name}` : `${x.english_name}, `)}
          </Grid>

        </Grid>

        <Grid container className='common--justify'>
          <Grid item className='details--padding-top'><Button onClick={onClose}><p className='button--color'>{detailsPopup.close}</p></Button></Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default DetailsPopup;
