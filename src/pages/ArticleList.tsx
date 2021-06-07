import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useHistory, useRouteMatch } from 'react-router-dom';
import { Link, Button, List, ListItem, Divider, ListItemText } from '@material-ui/core';
import ajax from '../infra/Ajax';
import { GlobalReduxState } from '../infra/redux/GlobalReducer';

type MyParam = {
  boardId: string
}

const ArticleList : React.FC = () => {
  const emailId = useSelector((state: GlobalReduxState) => state.app.emailId);
  const [article, setArticle] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const match = useRouteMatch<MyParam>();
  const history = useHistory();
  const fetchData = async () => {
    try {
      const response = await
      ajax.get(`http://localhost:8002/post/article/list?boardId=${match.params.boardId}&page=${page}`);
      setArticle(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hideBoard = () => {
    if (window.confirm('정말로 게시판을 숨기기 하시겠습니까?')) {
      ajax.post('http://localhost:8002/post/board/hide', null, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          boardId: match.params.boardId,
          userId: emailId }
      }).then(() => {
        window.history.back();
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  const movePrevPage = () => {
    if (article) {
      if (article[0].firstPage) {
        return;
      }
      setPage(article[0].currentPage - 1);
      fetchData();
      history.push(`?boardId=${match.params.boardId}&page=${page}`);
    }
  };

  const moveNextPage = () => {
    if (article) {
      if (article[0].lastPage) {
        return;
      }
      setPage(article[0].currentPage + 1);
      console.log(page);
      fetchData();
      history.push(`?boardId=${match.params.boardId}&page=${page}`);
    }
  };

  return (
    <>
      <div>
        <Button variant='contained' color='default'
          onClick={() => history.push(`/post/newarticle/_create/${match.params.boardId}`)}>게시글 작성</Button>
        <Button variant='contained' color='default' onClick={() => history.push('/')}>메인화면으로 돌아가기</Button>
        <Button variant='contained' color='default' onClick={hideBoard}>게시판 숨기기</Button>
        <Button variant='contained' color='default'
          onClick={() => history.push(`/post/newBoard/${match.params.boardId}`)}>게시판 수정</Button>
      </div>
      <List>
        {article && article.map((item: any) => (
          <>
            <ListItem button alignItems='flex-start' component={Link}>
              <Link component={RouterLink} to={`/post/article?articleId=${item.articleId}`}>
                <ListItemText
                  id={item.articleId}
                  primary={item.title}
                  secondary={item.userView.name}
              />
              </Link>
            </ListItem>
            <Divider variant='inset' component='li' />
          </>
        ))}
      </List>
      <div>
        <Button variant='contained' color='default' onClick={movePrevPage}>Prev</Button>
        <Button variant='contained' color='default' onClick={moveNextPage}>Next</Button>
      </div>
      <br/>
    </>
  );
};

export default ArticleList;
