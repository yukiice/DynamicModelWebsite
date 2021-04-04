/*
 * @Author: your name
 * @Date: 2021-04-04 19:57:04
 * @LastEditTime: 2021-04-04 20:59:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/FormBuilder.tsx
 */
// import { memo } from 'react';
import { Input, Form } from 'antd';
function FormBuilder(data: ModalApi.Datum[] | undefined) {
  console.log(data);
  return (
      <>
      {(data || []).map((item) => {
        return (
          <Form.Item label={item.title} key={item.key}>
            <Input />
          </Form.Item>
        );
      })}
      </>
  );
}

export default FormBuilder
