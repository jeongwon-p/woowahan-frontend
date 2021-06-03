import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FormLabel, Button, List, ListItem, Typography, Divider, ListItemText } from '@material-ui/core';
import ajax from '../infra/Ajax';
import './Article.css';

const Article : React.FC = () => {
  const [article, setArticle] = useState<any>();
  const [comment, setComment] = useState<any>();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajax.get(`http://localhost:8002${location.pathname}${location.search}`);
        setArticle(response.data);
        setComment(article.comment);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Typography variant='h6' className='title'>
        게시글 상세정보
      </Typography>
      <div className='post-view-wrapper'>
        {
          article ? (
            <>
              <div className='post-view-row'>
                <FormLabel>게시글 번호</FormLabel>
                <FormLabel>{ article.articleId }</FormLabel>
              </div>
              <div className='post-view-row'>
                <FormLabel>제목</FormLabel>
                <FormLabel>{ article.title }</FormLabel>
              </div>
              <div className='post-view-row'>
                <FormLabel>작성자</FormLabel>
                <FormLabel>{ article.userView.name }</FormLabel>
              </div>
              <div className='post-view-row'>
                <FormLabel>작성자 랭킹</FormLabel>
                <FormLabel>{ article.userView.ranking }</FormLabel>
              </div>
              <div className='post-view-row'>
                <FormLabel>작성일</FormLabel>
                <FormLabel>{ article.createDateTime }</FormLabel>
              </div>
              <div className='post-view-row'>
                <FormLabel>수정일</FormLabel>
                <FormLabel>{ article.modifyDateTime }</FormLabel>
              </div>
              <div className='post-view-row'>
                <FormLabel>내용</FormLabel>
                <div>
                  {
                    article.content
                  }
                </div>
              </div>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
      </div>
      <div>
        <List>
          {comment && comment.map((item: any) => (
            <>
              <ListItem>
                <ListItemText
                  primary={item.contents}
                  secondary={item.userId}
               />
              </ListItem>
              <Divider variant='inset' component='li' />
            </>
          ))}
        </List>
        <Button variant='contained' color='default' onClick={() => history.goBack()}>목록으로 돌아가기</Button>
      </div>
    </>
  );
};

export default Article;
