/*
 * @Author: your name
 * @Date: 2021-04-04 19:57:04
 * @LastEditTime: 2021-04-08 19:43:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/FormBuilder.tsx
 */
// import { memo } from 'react';
import { Input, Form, DatePicker, TreeSelect, Switch, InputNumber, Radio } from 'antd';
function FormBuilder(data?: BasicListApi.Field[]) {
  return (
    <>
      {(data || []).map((item) => {
        const basicAttr = {
          label: item.title,
          name: item.key,
          key: item.key,
        };
        switch (item.type) {
          case 'text':
            return (
              <Form.Item {...basicAttr}>
                <Input disabled={item?.disabled} />
              </Form.Item>
            );
          case 'datetime':
            if (item.key === 'update_time') {
              <Form.Item {...basicAttr}>
                <DatePicker showTime disabled={item?.disabled} />
              </Form.Item>;
            }
            break;
          case 'tree':
            return (
              <Form.Item {...basicAttr}>
                <TreeSelect treeData={item.data} disabled={item?.disabled} treeCheckable />
              </Form.Item>
            );
          case 'switch':
            return (
              <Form.Item {...basicAttr} valuePropName="checked">
                <Switch disabled={item?.disabled} />
              </Form.Item>
            );
          case 'number':
            return (
              <Form.Item {...basicAttr}>
                <InputNumber disabled={item?.disabled} />
              </Form.Item>
            );
          case 'textarea':
            return (
              <Form.Item {...basicAttr}>
                <Input.TextArea disabled={item?.disabled} />
              </Form.Item>
            );
          case 'radio':
            return (
              <Form.Item {...basicAttr}>
                <Radio.Group buttonStyle="solid" defaultValue={item.data[0]?.value}>
                  {(item.data || []).map((items: any) => {
                    return <Radio.Button value={item.value}>{item.name}</Radio.Button>;
                  })}
                </Radio.Group>
              </Form.Item>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

export default FormBuilder;
