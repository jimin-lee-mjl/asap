import React from 'react';
import { Button } from 'antd';

const tagsData = [
  'Modvies',
  'Bodoks',
  'Mussic',
  'Spdorts',
  'Movies',
  'Modvies',
  'Bodoks',
];

export default function Keyword() {
  const [selectedTags, setSelectedTags] = React.useState([]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Noto Sans KR',
      }}
    >
      <h1>원하는 키워드를 선택해주세요</h1>
      <div style={{ display: 'flex' }}>
        {tagsData.map((tag) => (
          <Button
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => setSelectedTags(tag, checked)}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
}
