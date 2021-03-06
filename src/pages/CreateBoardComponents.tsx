import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core/';
import ajax from '../infra/Ajax';

type MyState ={
  title: string,
  contents: string,
  emailId: string,
  boardId: string
}

type MyProps ={
  emailId: string
}

class CreateBoardComponents extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    const param = props.match.params;

    this.state = {
      title: '',
      contents: '',
      emailId: props.emailId,
      boardId: param.boardId
    };

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeContentsHandler = this.changeContentsHandler.bind(this);
  }

  getTitle() {
    const item = this.state;
    if (item.boardId === '_create') {
      return <h3 className='text-center'>새로운 게시판을 만듭니다.(ADMIN계정만 가능)</h3>;
    }
    return <h3 className='text-center'>게시판을 수정합니다.(ADMIN계정만 가능)</h3>;
  }

  changeTitleHandler = (event:any) => {
    this.setState({ title: event.target.value });
  }

  changeContentsHandler = (event:any) => {
    this.setState({ contents: event.target.value });
  }

  onPublish = () => {
    const item = this.state;
    ajax.post('http://localhost:8002/post/board', null, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        boardId: item.boardId,
        description: item.contents,
        hidden: false,
        name: item.title,
        userId: item.emailId }
    }).then(() => {
      window.history.back();
    }).catch((error) => {
      alert(error);
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

export default connect(mapStateToProps)(CreateBoardComponents);
