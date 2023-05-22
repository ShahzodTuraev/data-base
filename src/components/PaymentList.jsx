import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Main, Head, HeadText, Body, BodyText, BodyWrap, SearchBox } from '../table/style';

const PaymentList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');

  useEffect(() => {
    axios.post(`https://api.mever.me:8080/paymentList?email=test@naver.com`, {}).then((data) => {
      setUsers(data.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchType = (e) => {
    setSearchType(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.phone && user.phone.includes(searchTerm))
  );

  const filteredUsersByType = filteredUsers.filter((user) => {
    switch (searchType) {
      case 'name':
        return user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase());
      case 'email':
        return user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase());
      case 'phoneNumber':
        return user.phone && user.phone.includes(searchTerm);
      case 'orderName':
        return user.orderName && user.orderName.toLowerCase().includes(searchTerm.toLowerCase());
      case 'price':
        return (
          user.totalAmount &&
          user.totalAmount.toString().includes(searchTerm) 
        );
      default:
        return true;
    }
  });

  return (
    <Main>
      <SearchBox>
        <div>
        <select value={searchType} onChange={handleSearchType}>
            <option value="name">이름</option>
            <option value="email">메일</option>
            <option value="phoneNumber">전화번호</option>
            <option value="orderName">상품명</option>
            <option value="price">상품 가격</option>
          </select>
          <input type="text" value={searchTerm} onChange={handleSearch} placeholder="검색어를 입력하세요" />
        </div>
      </SearchBox>
      <Head>
        <HeadText>일자</HeadText>
        <HeadText>이름</HeadText>
        <HeadText>이메일</HeadText>
        <HeadText>전화번호</HeadText>
        <HeadText>설문 조사 결과</HeadText>
        <HeadText>상품명</HeadText>
        <HeadText>상품 가격</HeadText>
      </Head>
      <BodyWrap>
        {filteredUsersByType.map((user, index) => (
          <Body
            key={index}
            style={index % 2 === 0 ? { background: 'rgba(0, 0, 0, 0.05)' } : { background: 'white' }}
          >
            <BodyText>{user.approvedAt}</BodyText>
            <BodyText>{user.name}</BodyText>
            <BodyText>{user.email}</BodyText>
            <BodyText>{user.phone}</BodyText>
            <BodyText>{user.dcrp}</BodyText>
            <BodyText>{user.orderName}</BodyText>
            <BodyText>
              {`${user.totalAmount ? user.totalAmount : 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
            </BodyText>
          </Body>
        ))}
      </BodyWrap>
    </Main>
  );
};

export default PaymentList;