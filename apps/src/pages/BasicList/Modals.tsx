/*
 * @Author: your name
 * @Date: 2021-04-04 17:06:01
 * @LastEditTime: 2021-04-04 22:20:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/Modal.tsx
 */
import { memo, useEffect } from 'react';
import { useRequest } from 'umi';
import { Modal, Form } from 'antd';
import moment from 'moment';
import FormBuilder from './components/FormBuilder';
import ActionBuilder from './components/ActionBuilder';
function Modals(props: any) {
  // useState
  const { modelVisible, modalOnCancel, modalUrl } = props;

  // 改变Form
  const [form] = Form.useForm();
  // 获取接口数据
  const init = useRequest<{ data: ModalApi.Data }>(`${modalUrl}`);
  // useEffect
  useEffect(() => {
    // 清空表单内容
    form.resetFields()
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

  return (
    <div>
      <Modal
        title={init?.data?.page.title}
        visible={modelVisible}
        onCancel={modalOnCancel}
        footer={ActionBuilder(init?.data?.layout?.actions[0]?.data)}
        maskClosable={false}
      >
        <Form {...layout} form={form} initialValues={
          {
            create_time:moment(),
            update_time:moment(),
            status:true
          }
        }>
          {FormBuilder(init?.data?.layout?.tabs[0]?.data)}
        </Form>
      </Modal>
    </div>
  );
}

export default memo(Modals);
