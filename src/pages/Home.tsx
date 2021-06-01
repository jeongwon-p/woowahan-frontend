import React from 'react';
import Button from '@material-ui/core/Button';
import { Container, Typography, Grid, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ajax from '../infra/Ajax';
import { actions } from '../infra/redux/AppWidgets';
import BoardList from './BoardList';
import HackerNewsList from './HackerNewsList';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    ajax.get('http://localhost:8001/logout').then(() => {
      dispatch(actions.signOut());
      history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <Container maxWidth='sm'>
        사용자이름 <Button variant='contained' color='default' onClick={logout}>Logout</Button>
        <Typography component='div' variant='h6'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Box p={2}>
                <div>Board List</div>
                <BoardList/>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box p={2}>
                <div>HackerNews Latest 10</div>
                <HackerNewsList/>
              </Box>
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </>
  );
};

export default Home;
