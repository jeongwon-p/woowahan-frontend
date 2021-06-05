import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Editor from './Editor';
import { actions } from './write';

const EditorContainer : React.FC = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector((write: any) => ({
    title: write.title,
    body: write.body
  }));
  const onChangeField = useCallback((payload) => dispatch(actions.changeField(payload)),
    [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(actions.initialize());
    };
  }, [dispatch]);
  return <Editor {...onChangeField} {...title} {...body}/>;
};

export default EditorContainer;
