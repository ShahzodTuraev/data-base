import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;
const Main = styled.div`
  max-width: 70vw;
  width: 100%;
  height: 95vh;
  overflow-y: scroll;
  border: 1px solid coral;
  border-radius: 10px;
`
const Head = styled.div`
display: flex;
position: sticky;
top: 0px;
width: 100%;
justify-content: space-around;
background-color: coral;
`
const HeadText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  flex: 1;
  text-align: center;
`;
const Body = styled.div`
display: flex;
justify-content: space-around;
align-items: center;


&:hover{
  background: rgba(0, 0, 0, 0.1);
}
`;
const BodyText = styled.p`
font-size: 1rem;
flex: 1;
text-align: center;
display: flex;
justify-content: center;
`;
const BodyWrap = styled.div`
display: flex;
flex-direction: column-reverse;
`;
const LoginBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform:translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 400px;
  height: 300px;
  color: #fff;
  background: #0E3B68;
  border-radius: 10px;
`;
const LoginInput = styled.input`
  height: 40px;
  width: 260px;
  border-radius: 8px;
  margin-bottom: 20px;
  outline: 0;
  padding:0 20px;
  font-size: 1rem;
`;
const LoginBtn = styled.div`
  height: 40px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  background: #1CBCFF;
  cursor: pointer;
`;
const BtnBox = styled.div`
  position: fixed;
  top: 2rem;
  left: 2rem;
`;
const Btn = styled.div`
  width: 150px;
  height: 40px;
  font-size: 1.2rem;
  font-weight: 550;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 8px;
  margin: 10px 0;
  background: #1CBCFF;
  color: #fff;
  cursor: pointer;
`;
const SearchBox = styled.div`
  text-align: center;
  margin-top:0.3rem;
  margin-bottom: 0.3rem;

  select {
    background: coral;
    color: black;
    font-weight: bold;
    font-size: 16px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 4px;
    margin-right: 8px;
  }

  input {
    background: coral;
    color: black;
    font-size: 16px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 4px;
  }
`;
const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export {Container, Main, Head, HeadText, Body, BodyText, BodyWrap, LoginBox, LoginBtn, LoginInput, 
  BtnBox, Btn, Dropdown, SearchBox }