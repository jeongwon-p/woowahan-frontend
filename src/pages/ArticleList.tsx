import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useHistory } from 'react-router-dom';
import { Link, Button, List, ListItem, Divider, ListItemText } from '@material-ui/core';
import ajax from '../infra/Ajax';

const ArticleList : React.FC = () => {
  const [article, setArticle] = useState<any[]>([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajax.get(`http://localhost:8002/${location.pathname}${location.search}`);
        console.log(response.data[0]);
        setArticle(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
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
      <Button variant='contained' color='default' onClick={() => history.goBack()}>게시글 작성</Button>
      <Button variant='contained' color='default' onClick={() => history.goBack()}>메인화면으로 돌아가기</Button>
    </>
  );
};

export default ArticleList;
