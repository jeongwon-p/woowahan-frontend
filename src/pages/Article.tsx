import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormLabel, Button, List, ListItem, Typography, Divider, ListItemText, TextField } from '@material-ui/core';
import ajax from '../infra/Ajax';
import { GlobalReduxState } from '../infra/redux/GlobalReducer';
import './Article.css';

type MyParam = {
  boardId: string
}

const Article : React.FC = () => {
  const emailId = useSelector((state: GlobalReduxState) => state.app.emailId);
  const [currentComment, setCurrentComment] = useState();
  const [updateComment, setUpdateComment] = useState();
  const [article, setArticle] = useState<any>();
  const [comment, setComment] = useState<any>();
  const match = useRouteMatch<MyParam>();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajax.get(`http://localhost:8002${location.pathname}${location.search}`);
        setArticle(response.data);
        setComment(response.data.commentList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const hideArticle = () => {
    if (window.confirm('정말로 글을 숨기기 하시겠습니까?')) {
      ajax.post('http://localhost:8002/post/article/hide', null, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          articleId: article.articleId,
          userId: emailId }
      }).then(() => {
        window.history.back();
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  const hideComment = (event: any) => {
    const targetCommentId = event.target.id;
    console.log(event.target.id);
    if (window.confirm('정말로 댓글을 숨기기 하시겠습니까?')) {
      ajax.post('http://localhost:8002/post/comment/hide', null, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          commentId: targetCommentId,
          userId: emailId }
      }).then(() => {
        window.history.back();
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  const onCommentPublish = () => {
    console.log(updateComment);
    console.log(updateComment || null);
    ajax.post('http://localhost:8002/post/comment', null, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        commentId: updateComment || null,
        content: currentComment,
        articleId: article.articleId,
        userId: emailId }
    }).then(() => {
      window.location.reload();
    }).catch((error) => {
      console.log(error);
    });
  };

  const changeCommentHandler = (event:any) => {
    setCurrentComment(event.target.value);
  };

  const updateCommentHandler = (item:any) => {
    setUpdateComment(item.target.offsetParent.id);
    setCurrentComment(item.target.innerText);
  };

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
      <div className='form-group'>
        댓글작성
        <TextField id='commentInput' variant='outlined'
          placeholder='댓글을 입력하세요' value={currentComment} onChange={changeCommentHandler}/>
        <Button variant='contained' color='default' className='btn btn-success'
          onClick={onCommentPublish}>댓글등록</Button>
      </div>
      <div>
        <List>
          {comment && comment.map((item: any) => (
            <>
              <ListItem>
                <ListItemText id={item.commentId} onClick={updateCommentHandler}
                  primary={item.content}
                  secondary={<>작성자: {item.userView.name} 랭킹: {item.userView.ranking}</>}
               />
                <Button id={item.commentId} onClick={hideComment}>숨기기</Button>
              </ListItem>
              <Divider variant='inset' component='li' />
            </>
          ))}
        </List>
        <Button variant='contained' color='default' onClick={() => history.goBack()}>목록으로 돌아가기</Button>
        <Button variant='contained' color='default'
          onClick={() => history.push(`/post/newarticle/${article.articleId}/${match.params.boardId}`)}>글수정</Button>
        <Button variant='contained' color='default' onClick={hideArticle}>글숨기기</Button>
      </div>
    </>
  );
};

export default Article;
