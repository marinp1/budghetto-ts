import * as React from 'react';
import glamorous from 'glamorous';

const Container = glamorous.section({
  background: `url('./bg.jpg')`,
  backgroundSize: 'cover',
});

const FileUploadButton = () => (
  <div className='file'>
    <label className='file-label'>
      <input className='file-input' type='file' name='resume'/>
      <span className='file-cta' style={{backgroundColor: 'white'}}>
        <span className='file-icon'>
          <i className='fa fa-upload'></i>
        </span>
        <span className='file-label'>
          Open existing file
        </span>
      </span>
    </label>
  </div>
)

const WelcomeScreen = () => (
  <Container className='hero is-fullheight'>
    <div className='hero-body'>
      <div className='container'>
        <h1 className='title is-1 is-spaced'>
          BUDGHETTO
        </h1>
        <h2 className='subtitle is-5'>
          Start by loading a budget file or creating a new one:
        </h2>
        <div className='columns'>
          <div className='column' style={{flexGrow: 0}}>
            <FileUploadButton/>
          </div>
          <div className='column'>
            <a className='button'>
              <span className='icon is-small'>
                <i className='fa fa-plus'></i>
              </span>
              <span>Create new file</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default WelcomeScreen;