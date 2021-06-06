import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core/';
import ajax from '../infra/Ajax';

type MyState ={
  title: string,
  contents: string,
  articleId: string,
  boardId: string,
  emailId: string
}

type MyProps ={
  boardId: string,
  article: string,
  emailId: string
}

class CreateAricleComponents extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    const param = props.match.params;
    this.state = {
      articleId: param.articleId,
      title: '',
      contents: '',
      boardId: param.boardId,
      emailId: props.emailId
    };

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeContentsHandler = this.changeContentsHandler.bind(this);
  }

  getTitle() {
    const item = this.state;
    if (item.articleId === '_create') {
      return <h3 className='text-center'>새글을 작성해주세요</h3>;
    }
    return <h3 className='text-center'>글을 수정 합니다.</h3>;
  }

  changeTitleHandler = (event:any) => {
    this.setState({ title: event.target.value });
  }

  changeContentsHandler = (event:any) => {
    this.setState({ contents: event.target.value });
  }

  onPublish = () => {
    const item = this.state;
    console.log(item);
    ajax.post('http://localhost:8002/post/article', null, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        boardId: item.boardId,
        articleId: (item.articleId === '_create' ? null : item.articleId),
        content: item.contents,
        hidden: false,
        title: item.title,
        userId: item.emailId }
    }).then(() => {
      window.history.back();
    }).catch((error) => {
      console.log(error);
    });
  };

  render() {
    const item = this.state;
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
              {
                this.getTitle()
              }
              <div className='card-body'>
                <form>
                  <div className='form-group'>
                    Title
                    <TextField id='outlined-basic' label='title' variant='outlined'
                      placeholder='title' value={item.title} onChange={this.changeTitleHandler}/>
                  </div>
                  <div className='form-group'>
                    Contents
                    <TextField id='outlined-basic' label='contents' variant='outlined'
                      placeholder='contents' value={item.contents} onChange={this.changeContentsHandler}/>
                  </div>
                  <Button variant='contained' color='default' className='btn btn-success'
                    onClick={this.onPublish}>Save</Button>
                  <Button variant='contained' color='default' className='btn btn-danger'
                    onClick={() => window.history.back()}>Cancel</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state:any) => ({
  emailId: state.app.emailId
});

export default connect(mapStateToProps)(CreateAricleComponents);
