import React, { useEffect, useState } from 'react'
import axios from 'axios'
import{Main, Head, HeadText, Body, BodyText, BodyWrap, Btn, } from '../table/style'
import SubscripPage from './SubscribeInfo';
import SendingPage from './SendingPage';
const MemberList = () => {
  const [memberList, setMemberList] = useState([]);
  const [selectUser, setSelectUser] = useState()
  const [selectEmail, setSelectEmail] = useState()
  const [uniquePage, setUniquePage] = useState(false)
  const [inputEmail, setInputEmail] = useState('')
  const [inputPhone, setInputPhone] = useState('')
  const [sendingPage, setSendingPage] = useState(false)
  const [indexEmail, setIndexEmail] = useState()
  const [checkedUsers, setCheckedUsers] = useState([])
  const checkedArr =[]
  // MEMBER DATA :
  useEffect(()=>{
    axios.post('https://api.mever.me:8080/member/list', {
    }).then((data)=>{
      setMemberList(data.data)
    });
  }, [])

  const [uniqueData, setUniqueData] = useState([])
// SUBSCRIBTION BUTTON FUNCTION :
const onSubscribe = (index) => {
  setUniquePage(true)
  setSelectUser(index);
  setInputEmail(memberList[index]?.email);
  setInputPhone(memberList[index]?.phone);

}
// SEND EMAIL BTN FUNCTION:
const onSendEmail = (index) => {
  setSelectEmail(index)
  setSendingPage(true)
  setIndexEmail(index)
}

// UNIQUE PAGE DATA :

useEffect(() => { 
  axios.post('https://api.mever.me:8080/subscription/list', {
    email: inputEmail,
    phone: inputPhone,
  })
    .then((response) => {

      setUniqueData(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
}, [inputEmail,inputPhone]);

const onCheck =(index) => {
!checkedArr.includes(index)?checkedArr.push(index):checkedArr.splice(checkedArr.indexOf(index), 1)
}
// console.log(checkedUsers);

const onSendList = () => {
  console.log(checkedArr);
  setSendingPage(true)
  setCheckedUsers(checkedArr)
}
return (
  <>
      <Btn onClick={onSendList}>Send List</Btn>
    <Main>
        <Head>
          <HeadText>선택</HeadText>
          <HeadText>일자</HeadText>
          <HeadText>이름</HeadText>
          <HeadText>이메일</HeadText>
          <HeadText>전화번호</HeadText>
          <HeadText>설문 조사 결과</HeadText>
          <HeadText>내용</HeadText>
          <HeadText>이메일</HeadText>
        </Head>
        <BodyWrap>
          {memberList.map((list, index)=>(
            <Body key={index} style={index % 2 === 0 ? {background: 'rgba(0, 0, 0, 0.05)'} : {background: 'white'}}>
              <BodyText>
                <input type="checkbox" onChange={()=>{onCheck(index)}}/>
              </BodyText> <BodyText>2023-05-15 13:45</BodyText>
              <BodyText>{list.name}</BodyText>
              <BodyText>{list.email}</BodyText>
              <BodyText>{list.phone}</BodyText>
              <BodyText>{list.dcrp}</BodyText>
              <BodyText><Btn style={index === selectUser ? {background: 'coral', color: '#000'} : {border: 'none'}} onClick={()=>{onSubscribe(index)}}>구독 정보</Btn></BodyText>
              <BodyText><Btn style={index === selectEmail ? {background: 'coral', color: '#000'} : {border: 'none'}} onClick={()=>{onSendEmail(index)}}>이메일 예약</Btn></BodyText>
              
            </Body>
          ))}
        </BodyWrap>
      </Main>
      {uniquePage && <SubscripPage uniqueData = {uniqueData} userIndex ={selectUser} setClose ={setUniquePage}/>}
      {sendingPage && <SendingPage memberList = {memberList} emailIndex ={indexEmail} setClose ={setSendingPage} setUserIndex ={setSelectEmail} checkedUsers = {checkedUsers}/>}
    </>  
      
  )
}

export default MemberList