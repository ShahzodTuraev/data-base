import React, { useState } from 'react'
import { Btn, BtnBox, Container, LoginBox, LoginBtn, LoginInput } from './style'
import PaymentList from '../components/PaymentList'
import EmailList from '../components/EmailList'
import SmsList from '../components/SmsList'
import MemberList from '../components/MemberList '
const TablePage = () => {
// PAGES' DISPLAY STATES : 
  const [access, setAccess] = useState(false)
  const [userPage, setUserPage] = useState(true)
  const [emailPage, setEmailPage] = useState(false)
  const [smsPage, setSmsPage] = useState(false)
  const [memberPage, setMemberPage] = useState(false)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  // SUBSCRIPTION BUTTON STATES :



  // LOGIN PAGE FUNCTIONS:
  const onId = (e) => {
    setId(e.target.value)
  }
  const onPassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = () => {
    if(id === 'ceo' && password === '1111')setAccess(true)
  }

// PAGE BUTTON CONTROL:
const onPayment = () => {
  setUserPage(true)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
};
const onEmail = () => {
  setUserPage(false)
  setEmailPage(true)
  setSmsPage(false)
  setMemberPage(false)
};
const onSms = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(true)
  setMemberPage(false)

};
const onMember = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(true)
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
          <Btn onClick={onPayment} style={userPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>결제 내역</Btn>
          <Btn onClick={onEmail} style={emailPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>이메일</Btn>
          <Btn onClick={onSms} style={smsPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메시지</Btn>
          <Btn onClick={onMember} style={memberPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>고객</Btn>
        </BtnBox>
      } 
      {access && userPage && <PaymentList/>}
      {access && emailPage && <EmailList/>}
      {access && smsPage && <SmsList/>}
      {access && memberPage && <MemberList/>}
    </Container>
  )
}

export default TablePage
