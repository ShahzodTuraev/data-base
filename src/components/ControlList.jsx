import React, { useState } from 'react';
import { Head, HeadText, Body, InputContainer, Input, Btn } from './mainStyle';
import axios from 'axios';
import { Space, Main } from '../table/style';

const ContolList = () => {
  const [mainTitle, setMainTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const category = localStorage.getItem('category');
  const handleInputChange = (e) => {
    if (e.target.id === 'mainTitle') {
      setMainTitle(e.target.value);
    } else if (e.target.id === 'subTitle') {
      setSubTitle(e.target.value);
    }
  };

  const handleUpdateTitle = () => {
    axios
      .post('https://api.mever.me:8080/updateTitle', {
        mainTitle: mainTitle,
        subTitle: subTitle,
        category: category,
      })
      .then((response) => {
        console.log('업데이트 완료');
        alert('업데이트 되었습니다.');
      })
      .catch((error) => {
        console.log('에러 발생:', error);
        // 에러 처리에 대한 추가로 실행할 코드 작성
      });
  };
  return (
    <>
    <Space/>
    <Main>
      <Head>
        <HeadText>페이지 설정</HeadText>
      </Head>
      <Body style={window.innerWidth < 500?{flexDirection: 'column', justifyContent: 'center', width: '100%'}:{flexDirection: 'row'}}>
        <InputContainer>
              <input type="text" id="mainTitle" value={mainTitle} onChange={handleInputChange} placeholder={localStorage.getItem('mainTitle')}/>
        </InputContainer>
        <InputContainer>
              <input type="text" id="subTitle" value={subTitle} onChange={handleInputChange} placeholder={localStorage.getItem('subTitle')}/>
        </InputContainer>
        <Btn onClick={handleUpdateTitle}>업데이트</Btn>  
      </Body>
    </Main>
    </>
  );
};

export default ContolList;