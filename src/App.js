import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [modelDraft, setModelDraft] = useState('');
  const [manualCorrection, setManualCorrection] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1>達悟語音矯正平台</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>音檔段落</h2>
            <br />
            <input type="file" accept="audio/*" onInput={handleFileChange} />
            {audioFile && (
              <audio controls>
                <source src={audioFile} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </Col>
          <Col>
            <h2>模型初稿</h2>
            <textarea type="text" as="textarea" placeholder="Normal text" rows={3} content={undefined} />
          </Col>
          <Col>
            <h2>人工修正欄</h2>
            請根據語音修正轉寫：<br />
            <textarea type="text" as="textarea" placeholder="Normal text" rows={3} content={undefined} />
            <br />
            備註（可選）：<br />
            <textarea type="text" as="textarea" placeholder="" /> <br />
            <Button variant="primary" type="submit">
              提交
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
