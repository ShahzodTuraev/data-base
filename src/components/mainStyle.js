import styled from "styled-components";
import { Bar, Doughnut } from 'react-chartjs-2';

export const ChartContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const DoughnutChart = styled(Doughnut)`
  border: 1px solid black;
  border-radius: 10px;
  font-weight: bold;
`;

export const Main = styled.div`
  max-width: 70vw;
  width: 100%;
  height: 95vh;
  overflow-y: scroll;
  border: 1px solid coral;
  border-radius: 10px;
`;

export const Head = styled.div`
  
  position: sticky;
  top: 0px;
  width: 100%;
  justify-content: space-around;
  background-color: coral;
`;

export const HeadText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  flex: 1;
  text-align: center;
`;

export const Body = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const BodyText = styled.p`
  font-size: 1.4rem;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
`;

export const BodyWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export const Btn = styled.div`
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
  background: #1cbcff;
  color: #fff;
  cursor: pointer;
`;
export const InputContainer = styled.div`
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;