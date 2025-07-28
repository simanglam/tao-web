import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import axios from 'axios';

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [modelDraft, setModelDraft] = useState('');
  const [note, setNote] = useState('');
  const [manualCorrection, setManualCorrection] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.size > 0) {
      setAudioFile(() => URL.createObjectURL(file));
      const formData = new FormData();
      formData.append('audio_m', new Blob([file]), 'audio.mp3');
      console.log(formData.get('audio_m'));
      try {
        let result = await axios.post('/upload_audio_m', formData);
        setModelDraft(() => result.data.result || '');
        setManualCorrection(() => result.data.result || '');
        console.log(result.data.result);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleManualCorrectionChange = (event) => {
    setManualCorrection(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting manual correction:', manualCorrection);
    setAudioFile(null);
    setModelDraft('');
    setManualCorrection('');
    setNote('');
    alert('提交成功！');
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
            <textarea type="text" as="textarea" placeholder="Normal text" rows={3} value={modelDraft} disabled={true} />
          </Col>
          <Col>
            <h2>人工修正欄</h2>
            請根據語音修正轉寫：<br />
            <textarea type="text" as="textarea" placeholder="Normal text" rows={3} value={manualCorrection} onChange={handleManualCorrectionChange} />
            <br />
            備註（可選）：<br />
            <textarea type="text" as="textarea" placeholder="" value={note} onChange={handleNoteChange} /> <br />
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              提交
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
