import React, { useEffect, useState } from 'react'
import axios from 'axios'
import{Main, Head, HeadText, Body, BodyText, BodyWrap, Btn, } from '../table/style'
import SubscripPage from './SubscribeInfo';
const MemberList = () => {
  const [memberList, setMemberList] = useState([]);
  const [selectUser, setSelectUser] = useState()
  const [uniquePage, setUniquePage] = useState(false)
  const [inputEmail, setInputEmail] = useState('')
  // MEMBER DATA :
  useEffect(()=>{
    axios.post('https://api.mever.me:8080/member/list', {
    }).then((data)=>{
      setMemberList(data.data)
    });
  }, [])

// SUBSCRIBTION BUTTON FUNCTION :
const onSubscribe = (index) => {
  setSelectUser(index);
  setUniquePage(true)
    setInputEmail(memberList[index].email)

  // console.log(uniqueData[0].email);

}

console.log(inputEmail);
// UNIQUE PAGE DATA :
const [uniqueData, setUniqueData] = useState([])

useEffect(() => {
  axios.post('https://api.mever.me:8080/subscription/list', {
    email: inputEmail,
    phone: '01012341234',
  })
    .then((response) => {
      // if (response.data.length > 0 && response !== undefined && response !== null && response.data !== undefined &&response.data !== null) {
      //   setUniqueData(response.data);
      // } else {
      //   setUniqueData([]);
      // }
      setUniqueData(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

return (
  <>
    <Main>
        <Head>
          <HeadText>일자</HeadText>
          <HeadText>이름</HeadText>
          <HeadText>이메일</HeadText>
          <HeadText>전화번호</HeadText>
          <HeadText>설문 조사 결과</HeadText>
          <HeadText>내용</HeadText>
          <HeadText>email</HeadText>
        </Head>
        <BodyWrap>
          {memberList.map((list, index)=>(
            <Body key={index} style={index % 2 === 0 ? {background: 'rgba(0, 0, 0, 0.05)'} : {background: 'white'}}>
              <BodyText>2023-05-15 13:45</BodyText>
              <BodyText>{list.name}</BodyText>
              <BodyText>{list.email}</BodyText>
              <BodyText>{list.phone}</BodyText>
              <BodyText>{list.dcrp}</BodyText>
              <BodyText><Btn style={index === selectUser ? {background: 'coral', color: '#000'} : {border: 'none'}} onClick={()=>{onSubscribe(index)}}>구독 정보</Btn></BodyText>
              <BodyText><Btn >email 정보</Btn></BodyText>
              
            </Body>
          ))}
        </BodyWrap>
      </Main>
      {uniquePage && <SubscripPage uniqueData = {uniqueData} userIndex ={selectUser} setClose ={setUniquePage}/>}
    </>  
      
  )
}

export default MemberList
