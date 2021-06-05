import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core/';
import { useSelector } from 'react-redux';
import EditorContainer from '../pages/EditorContainer';
import ajax from '../infra/Ajax';

const WritePage : React.FC = () => {
  const history = useHistory();
  const { title, content } = useSelector((write: any) => ({
    title: write.title,
    content: write.body
  }));

  const onPublish = () => {
    ajax.post('http://localhost:8002/post/article', null, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        boardId: '1dc2e4d3-c774-42f2-bd72-d11b17d590e4',
        content,
        hidden: false,
        title,
        userId: 'jongwon5185@naver.com' }
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <EditorContainer/>
      <Button variant='contained' color='default' onClick={onPublish}>등록</Button>
      <Button variant='contained' color='default' onClick={() => history.goBack()}>취소</Button>
    </>
  );
};

export default WritePage;
