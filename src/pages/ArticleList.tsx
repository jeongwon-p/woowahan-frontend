import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useHistory } from 'react-router-dom';
import { Link, Button, List, ListItem, Divider, ListItemText } from '@material-ui/core';
import ajax from '../infra/Ajax';

const ArticleList : React.FC = () => {
  const [boardId, setBoardId] = useState<any>();
  const [article, setArticle] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const location = useLocation();
  const history = useHistory();
  const fetchData = async () => {
    try {
      console.log(page);
      const response = await ajax.get(`http://localhost:8002/${location.pathname}${location.search}&page=${page}`);
      console.log(response.data);
      setArticle(response.data);
      if (article) {
        setBoardId(response.data[0].boardId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const movePrevPage = () => {
    if (article) {
      if (article[0].firstPage) {
        return;
      }

      setPage(article[0].currentPage - 1);
      fetchData();
      console.log(boardId);
      console.log(`?boardId=${boardId}&page=${page}`);
      history.push(`?boardId=${boardId}&page=${page}`);
    }
  };

  const moveNextPage = () => {
    if (article) {
      if (article[0].lastPage) {
        return;
      }

      setPage(article[0].currentPage + 1);
      fetchData();
      console.log(`?boardId=${boardId}&page=${page}`);
      history.push(`?boardId=${boardId}&page=${page}`);
    }
  };

  return (
    <>
      <div>
        <Button variant='contained' color='default'
          onClick={() => history.push('/post/newarticle/_create')}>게시글 작성</Button>
        <Button variant='contained' color='default' onClick={() => history.push('/')}>메인화면으로 돌아가기</Button>
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
