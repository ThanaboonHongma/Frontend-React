import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import i18next from 'i18next';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import './layoutform.css';

const shapeSize = 180; // Define the desired size for the shape symbols
const shapes = ['▲', '■', '●', '▼', '◆', '○']; // Example shape symbols

const getRandomShapes = () => {
  const shuffled = [...shapes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 6);
};

const Layoutform: React.FC = () => {
  const [shapePositions, setShapePositions] = useState(getRandomShapes());
  const [gridLayout, setGridLayout] = useState<'top' | 'bottom'>('top');
  const [languagemain, setlanguagemain] = useState('en');

  const changeLanguage = (lang1: string) => {
    i18next.changeLanguage(lang1);
    setlanguagemain(lang1);
  };

  const moveShapeLeft = () => {
    setShapePositions(prevPositions => {
      const newPositions = [...prevPositions];
      const movedShape = newPositions.shift(); // Remove the first shape from the array
      newPositions.push(movedShape!); // Add the removed shape to the end of the array
      return newPositions;
    });
  };

  const moveShapeRight = () => {
    setShapePositions(prevPositions => {
      const newPositions = [...prevPositions];
      const movedShape = newPositions.pop();
      newPositions.unshift(movedShape!);
      return newPositions;
    });
  };

  const toggleGridLayout = () => {
    setGridLayout(prevLayout => (prevLayout === 'top' ? 'bottom' : 'top'));
  };

  const reshuffleShapes = () => {
    setShapePositions(getRandomShapes());
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className='toppic'>{i18next.t('layout')}</p>
        <div>
          <select
            className='changelanguage'
            value={languagemain}
            onChange={(event) => changeLanguage(event.target.value)}
          >
            <option value="en">{i18next.t('en')}</option>
            <option value="th">{i18next.t('th')}</option>
          </select>
          <Button style={{
            backgroundColor: 'white', height: '30px', display: 'flex', justifyContent: 'center'
            , alignItems: 'center', textDecoration: 'none', marginTop: '10px'
          }}>
            <Link to="/">
              {i18next.t('Home')}
            </Link>
          </Button>
        </div>
      </header>
      <main className='MainPagelyout'>
        <Button className='button' onClick={moveShapeLeft}>{<CaretLeftOutlined style={{ fontSize: '70px' }} />}
          <p className='p'>{i18next.t('MoveShapeleft')}</p></Button>
        <Button className='buttoncenter' onClick={toggleGridLayout}>{<CaretUpOutlined style={{ fontSize: '70px' }} />}{<CaretDownOutlined style={{ fontSize: '70px' }} />}
          <p className='pcenter'>{i18next.t('MovePosition')}</p></Button>
        <Button className='button' onClick={moveShapeRight}>{<CaretRightOutlined style={{ fontSize: '70px' }} />}
          <p className='p'>{i18next.t('MoveShaperight')}</p></Button>
      </main>
      <br />
      <br />
      {gridLayout === 'top' ? (
        <>
          <Row>
            {shapePositions.slice(0, 3).map((shape, index) => (
              <Col span={7} key={index}>
                <Button className='buttonlayout' onClick={reshuffleShapes}>
                <div style={{ fontSize: shapeSize, lineHeight: `${shapeSize}px` }}>{shape}</div>
                </Button>
              </Col>
            ))}
          </Row>
          <Row>
            {shapePositions.slice(3).map((shape, index) => (
              <Col span={8} key={index}>
                <Button className='buttonlayout' onClick={reshuffleShapes}>
                <div style={{ fontSize: shapeSize, lineHeight: `${shapeSize}px` }}>{shape}</div>
                </Button>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <Row>
            {shapePositions.slice(3).map((shape, index) => (
              <Col span={8} key={index}>
                <Button className='buttonlayout' onClick={reshuffleShapes}>
                  <div style={{ fontSize: shapeSize, lineHeight: `${shapeSize}px` }}>{shape}</div>
                </Button>
              </Col>
            ))}
          </Row>
          <Row>
            {shapePositions.slice(0, 3).map((shape, index) => (
              <Col span={7} key={index}>
                <Button className='buttonlayout' onClick={reshuffleShapes}>
                  <div style={{ fontSize: shapeSize, lineHeight: `${shapeSize}px` }}>{shape}</div>
                </Button>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default Layoutform;
