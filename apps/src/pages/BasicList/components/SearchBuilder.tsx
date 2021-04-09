/*
 * @Author: your name
 * @Date: 2021-04-08 14:22:05
 * @LastEditTime: 2021-04-09 22:02:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/SearchBuilder.tsx
 */
import { Input, Form, DatePicker, TreeSelect, Col, Select } from 'antd';
import moment from 'moment';
function SearchBuilder(data?: BasicListApi.Field[]) {
  const { Option } = Select;
  return (
    <>
      {(data || []).map((item) => {
        const basicAttr = {
          label: item.title,
          name: item.key
        }
        switch (item.type) {
          case 'text':
            return (
              <Col  key={item.key}>
                <Form.Item {...basicAttr}>
                  <Input disabled={item?.disabled} />
                </Form.Item>
              </Col>
            );
          case 'datetime':
            return (
              <Col  key={item.key}>
                <Form.Item {...basicAttr}>
                  <DatePicker.RangePicker
                    showTime
                    disabled={item?.disabled}
                    ranges={{
                      Today: [moment().startOf('day'), moment().endOf('day')],
                      'Last 7 Days': [moment().subtract(7, 'd'), moment()],
                      'Last 30 Days': [moment().subtract(30, 'days'), moment()],
                      'Last Month': [
                        moment().subtract(1, 'months').startOf('month'),
                        moment().subtract(1, 'months').endOf('month'),
                      ],
                    }}
                  />
                </Form.Item>
              </Col>
            );
          case 'tree':
            return (
              <Col  key={item.key}>
                <Form.Item {...basicAttr}>
                  <TreeSelect treeData={item.data} disabled={item?.disabled} treeCheckable />
                </Form.Item>
              </Col>
            );
          case 'switch':
            return (
              <Col   key={item.key}>
                <Form.Item {...basicAttr} valuePropName="checked">
                  <Select>
                    {(item.data || []).map((items: any) => {
                      return (
                        <Option value={items.value} key={items.value}>
                          {items.title}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

export default SearchBuilder;
