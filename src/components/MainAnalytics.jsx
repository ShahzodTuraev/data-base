import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Main, Head, HeadText, Body, BodyText, BodyWrap, Btn,ChartContainer,DoughnutChart, } from './mainStyle';
import { Chart, registerables } from 'chart.js';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import Spinner from './Spinner';

Chart.register(...registerables);
const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '도넛 차트',
    },
  },
};
const MainAnalytics = () => {
  const [chartData, setChartData] = useState(null);
  const [analyticsList, setAnalyticsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const group = 'art1';
  const [chartKey, setChartKey] = useState(Date.now()); // key attribute added
  const [title, setTitle] = useState('');

  useEffect(() => {
    setLoading(true);

    axios
    .post('https://api.mever.me:8080/analyticsList', null, {
      params: {
        group: group,
      },
    })
    .then((response) => {
      let filteredList = response.data;
      setAnalyticsList(filteredList);
      const users =  filteredList.map((item) => item.users)
      const newUsers =  filteredList.map((item) => item.newUsers)
      const pageTitle  =  filteredList.map((item) => item.page_title)

      setTitle(pageTitle[0]);
      

      if (filteredList.length > 0) {
        const barChartData = {
          labels: filteredList.map((item) => item.start_ymd),
          datasets: [
            {
              label: '사이트 방문자 수',
              data: filteredList.map((item) => item.users),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderWidth: 1,
            },
            {
              label: '신규 방문자 수',
              data: filteredList.map((item) => item.newUsers),
              backgroundColor: 'rgba(192, 75, 192, 0.6)',
              borderWidth: 1,
            },
          ],
        };
      
          const doughnutChartData = {
                labels: ['재방문 유저', '신규 유저'],
                datasets: [
                  {
                    label: 'count',
                    data: [ users, newUsers],
                    backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                    hoverOffset: 4,
                    borderWidth: 0,
                  },
                ],
              };

        setChartData({ barChartData, doughnutChartData });
      }

      setLoading(false);

      console.log(filteredList);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
}, [group]);

  const renderChart = () => {
    if (chartData) {
      return <Bar data={chartData.barChartData} key={chartKey} />;
    } else {
      return null;
    }
  };
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '방문 사용자',
      },
    },
  };
  const renderDoughnutChart = () => {
    if (chartData && chartData.doughnutChartData) {
      return <Doughnut data={chartData.doughnutChartData} options={doughnutOptions} />;
    } else {
      return null;
    }
  };

  const resetChart = () => {
    setChartData(null);
    setChartKey(Date.now());
  };

  return (
    <Main>
      <Head>
        <HeadText>{title}</HeadText>
      </Head>
      <Body>
        <BodyText>시간대별 평균 페이지 머문 시간</BodyText>
        {analyticsList.map((item, index) => (
          <BodyWrap key={index}>
            <BodyText>통계 기간: {item.start_ymd} ~ {item.end_ymd}</BodyText>
            <BodyText>평균 페이지 머문 시간: {item.avgSessions}</BodyText>
            <BodyText>페이지 조회 수: {item.page_views}</BodyText>
            <BodyText>기간 내 방문자 수: {item.users}</BodyText>
            <BodyText>신규 방문자 수: {item.newUsers}</BodyText>
          </BodyWrap>
        ))}
        <BodyWrap>
          {loading ? (
            <Spinner />
          ) : (
            <>
              {renderChart()}
            </>
          )}
        </BodyWrap>
        <BodyWrap>
          {loading ? (
            <Spinner />
          ) : (
            <>
              {renderDoughnutChart()}
            </>
          )}
        </BodyWrap>
        <Btn onClick={resetChart}>통계 초기화</Btn>
      </Body>
    </Main>
  );
};

export default MainAnalytics;
