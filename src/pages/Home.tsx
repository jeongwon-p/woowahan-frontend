import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Container, Typography, Grid, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ajax from '../infra/Ajax';
import { actions } from '../infra/redux/AppWidgets';
import BoardList from './BoardList';
import HackerNewsList from './HackerNewsList';
import { GlobalReduxState } from '../infra/redux/GlobalReducer';

const Home: React.FC = () => {
  const [role, setRole] = useState<string>();
  const emailId = useSelector((state: GlobalReduxState) => state.app.emailId);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(emailId);
        const response = await ajax.get(`http://localhost:8001/user/by?userId=${emailId}`);
        setRole(response.data.role);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const getAdminButton = () => {
    if (role === 'ADMIN') {
      return (
        <>
          <Button variant='contained' color='default'
            onClick={() => history.push('/post/newBoard/_create')}>게시판 만들기</Button>
          <Button variant='contained' color='default'
            onClick={() => history.push('/user')}>사용자 관리</Button>
        </>
      );
    }
    return <>ADMIN 계정으로 들어가면 게시판관리, 사용자관리 메뉴가 보입니다</>;
  };

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
        <Button variant='contained' color='default' onClick={logout}>Logout</Button>
        {
          getAdminButton()
        }
        <Typography component='div' variant='h6'>
          <Grid container spacing={10}>
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
