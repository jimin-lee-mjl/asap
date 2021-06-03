import React from 'react';
import { Form, Radio, InputNumber, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['XS', 'S', 'M', 'L', 'XL'];
const defaultCheckedList = [];

export default function Personal() {
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);

  const onChange = (list) => {
    setCheckedList(list);
  };

  return (
    <>
      <h1 style={{ marginBottom: '30px' }}>엘리스님의 정보를 입력해주세요</h1>
      <Form>
        {/* <Form.Item name="name" label="이름" rules={[{ required: true }]}>
          <Input />
        </Form.Item> */}
        <Form.Item name="gender" label="성별" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio.Button value="a">MEN</Radio.Button>
            <Radio.Button value="b">WOMEN</Radio.Button>
            <Radio.Button value="c">UNISEX</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="age" label="나이" rules={[{ required: true }]}>
          <InputNumber min={1} max={100} keyboard={true} defaultValue={20} />
        </Form.Item>
        <Form.Item name="size" label="사이즈" rules={[{ required: true }]}>
          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={onChange}
          />
        </Form.Item>
      </Form>
    </>
  );
}
