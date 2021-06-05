import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function OrderHistory() {
  const [data, setData] = useState([]);

  // const url = '/api/user/<int:user_id>/'

  const fakeDataUrl =
    'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

  useEffect(() => {
    axios.get(fakeDataUrl).then((res) => {
      console.log('!!!', res.data.results);
      setData(user.order_history);
    });
  }, []);

  const user = {
    order_history: [
      '2021-05-31 10:15:48.321923+00:00, 30.00',
      '2021-05-31 10:21:17.013279+00:00, 20.00',
      '2021-05-41 10:21:17.013279+00:00, 20.00',
      '2021-05-51 10:21:17.013279+00:00, 20.00',
      '2021-05-61 10:21:17.013279+00:00, 20.00',
      '2021-05-71 10:21:17.013279+00:00, 20.00',
      '2021-05-81 10:21:17.013279+00:00, 20.00',
      '2021-05-91 10:21:17.013279+00:00, 20.00',
      '2021-05-01 10:21:17.013279+00:00, 20.00',
      '2021-05-11 10:21:17.013279+00:00, 20.00',
      '2021-05-21 10:21:17.013279+00:00, 20.00',
      '2021-06-31 10:21:17.013279+00:00, 20.00',
    ],
  };

  return (
    <Container>
      <h2>Order History</h2>
      <ScrollingList>
        {data.map((el) => {
          const [time, price] = el.split(',');
          return (
            <HistoryCard>
              <span>{time.split('.')[0].split(' ')[0]}</span>
              <span>${price}</span>
            </HistoryCard>
          );
        })}
      </ScrollingList>
    </Container>
  );
}

const Container = styled.div`
  border: solid 0.1rem #ff6f00;
  border-radius: 0.8rem;
  padding: 2rem 1rem;
  grid-area: history;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const ScrollingList = styled.div`
  width: 80%;
  height: 30rem;
  overflow: auto;
  margin-top: 2rem;
`;

const HistoryCard = styled.div`
  border-radius: 0.5rem;
  border: gray solid 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.2rem;
  padding: 2rem;

  width: 90%;
  height: 5rem;
  margin: 1rem auto;

  cursor: pointer;

  :hover {
    border: solid 0.1rem #ff6f00;
    box-shadow: 0 0 10px #ffecb3;
  }
`;
