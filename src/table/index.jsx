import React, {useEffect,useState } from 'react'
import { Btn, BtnBox, Container, LoginBox, LoginBtn, LoginInput,Dropdown } from './style'
import axios from 'axios';
import MainAnalytics from '../components/MainAnalytics'
import PaymentList from '../components/PaymentList'
import EmailList from '../components/EmailList'
import SmsList from '../components/SmsList'
import MemberList from '../components/MemberList'
import ContolList from '../components/ControlList'
const TablePage = () => {
// PAGES' DISPLAY STATES : 
  const [access, setAccess] = useState(false)
  const [mainPage, setMainPage] = useState(true)
  const [userPage, setUserPage] = useState(false)
  const [emailPage, setEmailPage] = useState(false)
  const [emailSendPage, setEmailSendPage] = useState(false)
  const [smsPage, setSmsPage] = useState(false)
  const [memberPage, setMemberPage] = useState(false)
  const [subPage, setSubPage] = useState(false)
  const [controlPage, setContolPage] = useState(false)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  // SUBSCRIPTION BUTTON STATES :

  // SEARCH STATES:
  const [searchType, setSearchType] = useState('name'); // Default search type
  const [searchValue, setSearchValue] = useState('');


  // LOGIN PAGE FUNCTIONS:
  const onId = (e) => {
    setId(e.target.value)
  }
  const onPassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = () => {
    // 서버와 통신하여 회원 정보 확인
    axios
    .post('https://api.mever.me:8080/chkAdmin', {
      email: id,
      password: password
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      // 회원 정보 확인 결과에 따라 로그인 처리
      if (data.statusCodeValue !== 400) {
        localStorage.setItem('category',data.category);                                                                                                 
        setAccess(true);
      } else {
        alert('아이디 또는 패스워드가 잘못되었습니다.');
      }
    })
    .catch(error => {
      console.log(error);
      // 에러 처리에 대한 추가로 실행할 코드 작성
    });
};

// PAGE BUTTON CONTROL:
const onMain = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setEmailSendPage(false)
  setMainPage(true)
  setContolPage(false)
};
const onPayment = () => {
  setUserPage(true)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setEmailSendPage(false)
  setMainPage(false)
  setContolPage(false)
};
const onEmail = () => {
  setUserPage(false)
  setEmailPage(true)
  setSmsPage(false)
  setMemberPage(false)
  setEmailSendPage(false)
  setMainPage(false)
  setContolPage(false)
};
const onSend = () => {
  setUserPage(false)
  setEmailSendPage(true)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setSubPage(false)
  setMainPage(false)
  setContolPage(false)
};
const onSms = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(true)
  setMemberPage(false)
  setEmailSendPage(false)
  setMainPage(false)
  setContolPage(false)
};
const onMember = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(true)
  setEmailSendPage(false)
  setMainPage(false)
  setContolPage(false)
};
const onSubscription = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setSubPage(true)
  setEmailSendPage(false)
  setMainPage(false)
  setContolPage(false)
};
const onContol = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setEmailSendPage(false)
  setMainPage(false)
  setContolPage(true)
};

  return (
    <Container>
      <LoginBox style={access ? {display: 'none'} : {display: 'flex'}}>
        <h3>아이디와 비밀번호를 입력해주세요</h3>
        <LoginInput type='text' onChange={onId} placeholder='아이디'/>
        <LoginInput type='password' onChange={onPassword} placeholder='비밀번호'/>
        <LoginBtn onClick={onSubmit}>DB 보기</LoginBtn>
      </LoginBox>
      {access && 
        <BtnBox>
          <Btn onClick={onMain} style={mainPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메인</Btn>
          <Btn onClick={onPayment} style={userPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>결제 내역</Btn>
          <Btn onClick={onEmail} style={emailPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>이메일</Btn>
          <Btn onClick={onSend} style={emailSendPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>이메일보내기</Btn>
          <Btn onClick={onSms} style={smsPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메시지</Btn>
          <Btn onClick={onMember} style={memberPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>고객</Btn>
          <Btn onClick={onContol} style={controlPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>설정</Btn>
        </BtnBox>
      } 
      {access && mainPage && <MainAnalytics />}
      {access && userPage && <PaymentList />}
      {access && emailPage && <EmailList/>}
      {access && smsPage && <SmsList/>}
      {access && memberPage && <MemberList/>}
      {access && controlPage && <ContolList/>}
    </Container>
  )
}

export default TablePage

