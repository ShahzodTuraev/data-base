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
  const [emailSendPage, setEmailSendPage] = useState(false)
  const [smsSendPage, setSmsSendPage] = useState(false)

  const [smsPage, setSmsPage] = useState(false)
  const [memberPage, setMemberPage] = useState(false)
  const [subPage, setSubPage] = useState(false)
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
  setEmailSendPage(false)
  setSmsSendPage(false)
};
const onSmsSend = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setEmailSendPage(false)
  setSmsSendPage(true)
};
const onEmail = () => {
  setUserPage(false)
  setEmailPage(true)
  setSmsPage(false)
  setMemberPage(false)
  setEmailSendPage(false)
  setSmsSendPage(false)
};
const onSend = () => {
  setUserPage(false)
  setEmailSendPage(true)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setSubPage(false)
  setSmsSendPage(false)

};
const onSms = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(true)
  setMemberPage(false)
  setEmailSendPage(false)
  setSmsSendPage(false)

};
const onMember = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(true)
  setEmailSendPage(false)
  setSmsSendPage(false)
};
const onSubscription = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setSubPage(true)
  setEmailSendPage(false)
  setSmsSendPage(false)
};
const MailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('address', to);
    formData.append('title', subject);
    formData.append('content', text);
    formData.append('file', file);

    axios.post('https://api.mever.me:8080/send/mail', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data);
        // 메일 전송 성공 시 동작할 코드 작성
      })
      .catch((error) => {
        console.error(error);
        // 메일 전송 실패 시 동작할 코드 작성
      });
  };

  return (
    <form id="mailForm" encType="multipart/form-data" onSubmit={handleSubmit}>
    <div>
      <label htmlFor="to">받는 사람:</label>
      <input type="email" id="to" name="address" required />
    </div>
    <div>
      <label htmlFor="subject">제목:</label>
      <input type="text" id="subject" name="title" required />
    </div>
    <div>
      <label htmlFor="text">본문:</label>
      <textarea id="text" name="content" required></textarea>
    </div>
    <div>
      <label htmlFor="file">첨부 파일:</label>
      <input type="file" id="file" name="file" />
    </div>
    <button type="submit">전송</button>
  </form>
  );
};
const SmsForm = () => {
  const [msg, setMsg] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', "");
    formData.append('phone', "");
    formData.append('content', msg);
    formData.append('type', "sms");

    axios.post('http://link.smsceo.co.kr/sendsms_utf8.php', formData, {
     
    })
      .then((response) => {
        console.log(response.data);
        // 메일 전송 성공 시 동작할 코드 작성
      })
      .catch((error) => {
        console.error(error);
        // 메일 전송 실패 시 동작할 코드 작성
      });
  };

  return (
    <form id="smsForm" method="POST" action={handleSubmit}>
    <div>
      <label htmlFor="msg">메시지:</label>
      <input type="text" id="msg" name="msg" value="" />
    </div>
    <div>
      <label htmlFor="phone">전화번호:</label>
      <input type="text" name="phone" value="" />
    </div>
    <div>
      <label htmlFor="callback">콜백 번호:</label>
      <input type="hidden" name="callback" value="01072818209" />
    </div>
    <div>
      <label htmlFor="send_date">전송 날짜:</label>
      <input type="date" name="send_date" value="" />
    </div>
    <input
      type="hidden"
      name="userkey"
      value="BzxQZV1sDzVSYAdmUX4HOFZmB3QAM1MuA34="
    />
    <input type="hidden" name="userid" value="mever" />
    <input
      type="hidden"
      name="return_url"
      value="http://localhost:8080/send/sms/success?email=test@tst.com&phone=01012341234&url=http://localhost:8080/"
    />
    <input type="hidden" name="return_var" value="" />
    <button type="submit">전송</button>
  </form>
  );
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
          <Btn onClick={onSend} style={emailSendPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>이메일보내기</Btn>
          <Btn onClick={onSmsSend} style={emailSendPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>문자보내기</Btn>
          <Btn onClick={onSms} style={smsPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메시지</Btn>
          <Btn onClick={onMember} style={memberPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>고객</Btn>
        </BtnBox>
<<<<<<< HEAD
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
      {access && emailSendPage && <Main>
        <MailForm />
      </Main>}
      {access && smsSendPage && <Main>
        <SmsForm />
      </Main>}
=======
      } 
      {access && userPage && <PaymentList/>}
      {access && emailPage && <EmailList/>}
      {access && smsPage && <SmsList/>}
      {access && memberPage && <MemberList/>}
>>>>>>> 5ebc2f433aa290af34e58df535735034f8173f31
    </Container>
  )
}

export default TablePage
