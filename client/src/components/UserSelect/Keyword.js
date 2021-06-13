import React, { useEffect } from 'react';
import { Badge } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectKeywords, setKeywords } from '../../actions/userSelect';

export default function Keyword() {
  const keywords = useSelector((state) => state.userSelect.keywords);
  const selectedKeywords = useSelector(
    (state) => state.userSelect.selectedKeywords,
  );
  const dispatch = useDispatch();

  const handleClickKeyword = (e) => {
    e.stopPropagation();
    const clickedKeyword = e.currentTarget.getAttribute('value');
    // console.log(clickedKeyword);
    dispatch(selectKeywords(clickedKeyword));
  };

  const renderKeywords = keywords.map((keyword, index) => {
    return (
      <KeywordButton
        $isselected={selectedKeywords.includes(keyword)}
        key={index}
        value={keyword}
        onClick={handleClickKeyword}
      >
        {keyword}
      </KeywordButton>
    );
  });

  const renderSelectedKeywords = selectedKeywords.map((keyword, index) => {
    return (
      <DeleteBadge
        count={'X'}
        size="small"
        value={keyword}
        onClick={handleClickKeyword}
      >
        <SelectedKeywordButton>{keyword}</SelectedKeywordButton>
      </DeleteBadge>
    );
  });

  useEffect(() => {
    dispatch(setKeywords());
  }, []);

  return (
    <>
      <h1>Choose keywords!</h1>
      <Container>
        <SelectedKeywordDiv>
          <h3>Selected Word</h3>
          {renderSelectedKeywords}
        </SelectedKeywordDiv>
        <br />
        <button
          onClick={() => {
            dispatch(setKeywords());
          }}
        >
          GET OTHER KEYWORDS
        </button>
        <br />
        <KeywordDiv>{renderKeywords}</KeywordDiv>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
`;

const SelectedKeywordDiv = styled.div`
  border-radius: 1rem;
  border: 0.1rem solid #ff6f00;
  width: 80%;
  min-height: 10%;
  padding: 1rem;
`;

const KeywordDiv = styled.div`
  width: 60%;
`;

const KeywordButton = styled.button`
  border-radius: 0.5rem;
  color: black;
  margin: 0.3rem;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  line-height: 2;
  background-color: white;
  color: black;
  border: 0.1rem solid gray;

  ${(props) =>
    props.$isselected &&
    `
    background-color: #ff6f00;
    color: white;
    border: 0.1rem solid #ff6f00;
    box-shadow: 2px 4px 8px #c4c4c4;

    `}

  :hover {
    color: ${(props) => (props.$isselected ? 'white' : '#ff6f00')};
    border: 0.1rem solid #ff6f00;
    box-shadow: 2px 4px 8px #c4c4c4;
  }
`;

const SelectedKeywordButton = styled.button`
  border-radius: 0.5rem;
  color: black;
  margin: 0.3rem;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  line-height: 2;
  background-color: white;
  color: black;
  border: 0.1rem solid gray;
`;

const DeleteBadge = styled(Badge)`
  .ant-badge-count {
    background: gray;
  }
  margin: 0.5rem;
`;
