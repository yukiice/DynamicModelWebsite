/*
 * @Author: your name
 * @Date: 2021-04-04 19:57:04
 * @LastEditTime: 2021-04-07 16:31:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/FormBuilder.tsx
 */
// import { memo } from 'react';
import { Input, Form, DatePicker, TreeSelect,Switch } from 'antd';
function FormBuilder(data?: BasicListApi.Field[]) {
  return (
    <>
      {(data || []).map((item) => {
        switch (item.type) {
          case 'text':
            return (
              <Form.Item label={item.title} name={item.key} key={item.key}>
                <Input disabled={item?.disabled} />
              </Form.Item>
            );
          case 'datetime':
            return (
              <Form.Item label={item.title} name={item.key} key={item.key}>
                <DatePicker showTime disabled={item?.disabled} />
              </Form.Item>
            );
          case 'tree':
            return (
              <Form.Item label={item.title} name={item.key} key={item.key}>
                <TreeSelect treeData={item.data} disabled={item?.disabled} treeCheckable />
              </Form.Item>
            );
            case "switch":
              return (
                <Form.Item label={item.title} name={item.key} key={item.key} valuePropName="checked">
                <Switch  disabled={item?.disabled} />
              </Form.Item>
              )
          default:
            return null;
        }
      })}
    </>
  );
}

export default FormBuilder;
