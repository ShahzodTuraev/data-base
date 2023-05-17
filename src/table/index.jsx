import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Body, BodyText, BodyWrap, Btn, BtnBox, Container, Head, HeadText, LoginBox, LoginBtn, LoginInput, Main } from './style'
const TablePage = () => {
  const [users, setUsers] = useState([])
  const [emailList, setEmailList] = useState([])
  const [smsList, setSmsList] = useState([])
  const [memberList, setMemberList] = useState([])
// PAGES' DISPLAY STATES : 
  const [access, setAccess] = useState(false)
  const [userPage, setUserPage] = useState(true)
  const [emailPage, setEmailPage] = useState(false)
  const [emailSendPage, setEmailSendPage] = useState(false)
  const [smsPage, setSmsPage] = useState(false)
  const [memberPage, setMemberPage] = useState(false)
  const [subPage, setSubPage] = useState(false)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  // MAIN PAYMENT USERS INFO DATA :
  useEffect(()=>{
    axios.post(`https://api.mever.me:8080/paymentList?email=test@naver.com`, {
    }).then((data)=>{
      setUsers(data.data)
    });
  }, [])
  console.log(users);
  // EMAIL SENDING CONTENT DATA :
  useEffect(()=>{
    axios.post('https://api.mever.me:8080/send/list?type=mail', {
    }).then((data)=>{
      setEmailList(data.data)
    });
  }, [])
  // SMS SENDING CONTENT DATA :
  useEffect(()=>{
    axios.post('https://api.mever.me:8080/send/list?type=sms', {
    }).then((data)=>{
      setSmsList(data.data)
    });
  }, [])
  // MEMBER DATA :
  useEffect(()=>{
    axios.post('https://api.mever.me:8080/member/list', {
    }).then((data)=>{
      setMemberList(data.data)
    });
  }, [])
  // SUBSCRIPTION DATA :
   useEffect(()=>{
    axios.post('https://api.mever.me:8080/subscription/list', {
    }).then((data)=>{
      setSubscription(data.data)
    });
  }, [])

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
  setEmailSendPage(false)
};
const onEmail = () => {
  setUserPage(false)
  setEmailPage(true)
  setSmsPage(false)
  setMemberPage(false)
  setEmailSendPage(false)
};
const onSend = () => {
  setUserPage(false)
  setEmailSendPage(true)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setSubPage(false)

};
const onSms = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(true)
  setMemberPage(false)
  setEmailSendPage(false)

};
const onMember = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(true)
  setEmailSendPage(false)
};
const onSubscription = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setSubPage(true)
  setEmailSendPage(false)
};

// SEARCHING FUNCTION: 
const dateRef = useRef()
const nameRef = useRef()
const emailRef = useRef()
const phoneRef = useRef()
const survayRef = useRef()
const productRef = useRef()
const priceRef = useRef()

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
          <Btn onClick={onSend} style={emailSendPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>이메일보내기</Btn>
          <Btn onClick={onSms} style={smsPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메시지</Btn>
          <Btn onClick={onMember} style={memberPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>고객</Btn>
        </BtnBox>
      }
      
      {access && userPage &&
      
      <Main>
        <Head>
          <HeadText>일자</HeadText>
          <HeadText>이름</HeadText>
          <HeadText>이메일</HeadText>
          <HeadText>전화번호</HeadText>
          <HeadText>설문 조사 결과</HeadText>
          <HeadText>상품명</HeadText>
          <HeadText>상품 가격</HeadText>
        </Head>
        <Head>
          <input ref={dateRef} type="text" />
          <input ref={nameRef} type="text" />
          <input ref={emailRef} type="text" />
          <input ref={phoneRef} type="text" />
          <input ref={survayRef} type="text" />
          <input ref={productRef} type="text" />
          <input ref={priceRef} type="text" />
        </Head>
        <BodyWrap>
          {users.map((user, index)=>(
            <Body key={index} style={index % 2 === 0 ? {background: 'rgba(0, 0, 0, 0.05)'} : {background: 'white'}}>
              <BodyText>{user.approvedAt}</BodyText>
              <BodyText>{user.name}</BodyText>
              <BodyText>{user.email}</BodyText>
              <BodyText>{user.phone}</BodyText>
              <BodyText>{user.dcrp}</BodyText>
              <BodyText>{user.orderName}</BodyText>
              <BodyText>{`${user.totalAmount?user.totalAmount:0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</BodyText>
            </Body>
          ))}
        </BodyWrap>
      </Main>}
      {/* EMAIL LIST */}
      {access && emailPage &&
      <Main>
        <Head>
          <HeadText>일자</HeadText>
          <HeadText>이메일</HeadText>
          <HeadText>제목</HeadText>
          <HeadText>내용</HeadText>
          <HeadText>전화번호</HeadText>
        </Head>
        <BodyWrap>
          {emailList.map((list, index)=>(
            <Body key={index} style={index % 2 === 0 ? {background: 'rgba(0, 0, 0, 0.05)'} : {background: 'white'}}>
              <BodyText>{list.date}</BodyText>
              <BodyText>{list.email}</BodyText>
              <BodyText>{list.title}</BodyText>
              <BodyText>{list.content}</BodyText>
              <BodyText>{list.phone}</BodyText>
            </Body>
          ))}
        </BodyWrap>
      </Main>}
      {/* SMS LIST */}
      {access && smsPage &&
      <Main>
        <Head>
          <HeadText>일자</HeadText>
          <HeadText>이메일</HeadText>
          <HeadText>내용</HeadText>
          <HeadText>전화번호</HeadText>
        </Head>
        <BodyWrap>
          {smsList.map((list, index)=>(
            <Body key={index} style={index % 2 === 0 ? {background: 'rgba(0, 0, 0, 0.05)'} : {background: 'white'}}>
              <BodyText>{list.date}</BodyText>
              <BodyText>{list.email}</BodyText>
              <BodyText>{list.content}</BodyText>
              <BodyText>{list.phone}</BodyText>
            </Body>
          ))}
        </BodyWrap>
      </Main>}
       {/* MEMBER LIST */}
      {access && memberPage &&
      <Main>
        <Head>
          <HeadText>일자</HeadText>
          <HeadText>이름</HeadText>
          <HeadText>이메일</HeadText>
          <HeadText>전화번호</HeadText>
          <HeadText>설문 조사 결과</HeadText>
          <HeadText>내용</HeadText>
        </Head>
        <BodyWrap>
          {memberList.map((list, index)=>(
            <Body key={index} style={index % 2 === 0 ? {background: 'rgba(0, 0, 0, 0.05)'} : {background: 'white'}}>
              <BodyText>2023-05-15 13:45</BodyText>
              <BodyText>{list.name}</BodyText>
              <BodyText>{list.email}</BodyText>
              <BodyText>{list.phone}</BodyText>
              <BodyText>{list.dcrp}</BodyText>
              <BodyText>{list.survay}</BodyText>
            </Body>
          ))}
        </BodyWrap>
      </Main>}
         {/* SUBSCRIPTION LIST */}
      {access && subPage &&
      <Main>
        <Head>
          <HeadText>이메일</HeadText>
          <HeadText>전화번호</HeadText>
          <HeadText>고객명</HeadText>
          <HeadText>상품명</HeadText>
          <HeadText>결제기간</HeadText>
          <HeadText>구독상태</HeadText>
          <HeadText>구독 시작일</HeadText>
          <HeadText>다음 결제일</HeadText>
          <HeadText>결제 활성화</HeadText>
        </Head>
        <BodyWrap>
          {subscription.map((list, index)=>(
            <Body key={index} style={index % 2 === 0 ? {background: 'rgba(0, 0, 0, 0.05)'} : {background: 'white'}}>
              <BodyText>{list.email}</BodyText>
              <BodyText>{list.phone}</BodyText>
              <BodyText>{list.name}</BodyText>
              <BodyText>{list.orderName}</BodyText>
              <BodyText>{list.period}</BodyText>
              <BodyText>{list.status}</BodyText>
              <BodyText>{list.approvedAt}</BodyText>
              <BodyText>{list.requestedAt}</BodyText>
              <Btn onClick={onSubscription} style={subPage ? {color: '#fff', background: 'skyblue'} : {color: '#fff'}}>취소</Btn>
              
            </Body>
          ))}
        </BodyWrap>
      </Main>}
      {access && emailSendPage &&
      <Main>
            <br></br>
        <form >
      <label>Name</label>
      <input type="text" name="user_name" />
      <br></br>
      <br></br>
      <label>Email</label>
      <input type="email" name="user_email" />
      <br></br>
      <br></br>
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
      </Main>}
    </Container>
  )
}

export default TablePage
