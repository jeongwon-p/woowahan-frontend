import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid;
  margin-bottom: 2rem;
  width: 100%;
`;

interface EditorProps {
  title: string;
  onChangeField: any;
}

const Editor : React.FC<EditorProps> = ({ title, onChangeField }) => {
  const quillElement: any = useRef<HTMLDivElement>(null);
  const quillInstance: any = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세요...',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'orderd' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image']
        ]
      }
    });

    const quill = quillInstance.current;
    quill.on('text-change', (delta:any, oldDelta:any, source:any) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  onChangeField = () => {
    return onChangeField;
  };

  const onChangeTitle = (e:any) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    <>
      <TitleInput
        placeholder='제목을 입력하세요'
        onChange={onChangeTitle}
        value={title}
     />
      <div ref={quillElement}/>
    </>
  );
};

export default Editor;
