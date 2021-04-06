/*
 * @Author: your name
 * @Date: 2021-04-04 17:06:01
 * @LastEditTime: 2021-04-06 11:04:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/Modal.tsx
 */
import { memo, useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { Modal, Form, Input } from 'antd';
import moment from 'moment';
import FormBuilder from './components/FormBuilder';
import ActionBuilder from './components/ActionBuilder';
function Modals(props: any) {
  const { modelVisible, modalOnCancel, modalUrl } = props;

  // 改变Form
  const [form] = Form.useForm();
  // 获取接口数据
  const init = useRequest<{ data: ModalApi.Data }>(`${modalUrl}`, {
    manual: true,
  });

  // 表单提交请求
  const request = useRequest(
    (value) => {
      const { uri, method, ...formValues } = value;
      return {
        url: `https://public-api-v2.aspirantzhang.com${uri}`,
        method: method,
        data: {
          ...formValues,
          'X-API-KEY': 'antd',
          create_time: moment(formValues.create_time).format(),
          update_time: moment(formValues.update_time).format(),
        },
      };
    },
    {
      manual: true,
    },
  );
  // useEffect
  useEffect(() => {
    // 清空表单内容
    form.resetFields();
    modelVisible && init.run();
  }, [modelVisible]);

  // 类型过滤器
  const typeFilter = (data: ModalApi.Data) => {
    if (data?.layout?.tabs && data?.dataSource) {
      const result = {};
      data.layout.tabs.forEach((tap) => {
        tap.data.forEach((item) => {
          switch (item.type) {
            case 'datetime':
              result[item.key] = moment(data.dataSource[item.key]);
              break;
            default:
              result[item.key] = data.dataSource[item.key];
              break;
          }
        });
      });
      // 如果存在需要过滤的属性的返回值
      return result;
    }
    // 默认返回值
    return {};
  };
  // 表单赋值
  useEffect(() => {
    init.data && form.setFieldsValue(typeFilter(init.data));
  }, [init.data]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  // 表单确认提交
  const onFinish = (value: any) => {
    // 这一步拿到数据
    request.run(value);
  };

  const actionHandler = (action: ModalApi.Action) => {
    //  1.表单提交 2.拿到数据  3.发送请求
    switch (action.action) {
      case 'submit':
        form.setFieldsValue({ uri: action.uri, method: action.method });
        form.submit();
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Modal
        title={init?.data?.page.title}
        visible={modelVisible}
        onCancel={modalOnCancel}
        footer={ActionBuilder(init?.data?.layout?.actions[0]?.data, actionHandler)}
        maskClosable={false}
      >
        <Form
          {...layout}
          form={form}
          initialValues={{
            create_time: moment(),
            update_time: moment(),
            status: true,
          }}
          onFinish={onFinish}
        >
          {FormBuilder(init?.data?.layout?.tabs[0]?.data)}
          <Form.Item name="uri" key="uri" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="method" key="method" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default memo(Modals);
