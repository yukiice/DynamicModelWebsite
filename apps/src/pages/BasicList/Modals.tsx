/*
 * @Author: your name
 * @Date: 2021-04-04 17:06:01
 * @LastEditTime: 2021-04-07 16:29:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/Modal.tsx
 */
import { memo, useEffect} from 'react';
import { useRequest } from 'umi';
import { Modal, Form, Input,message } from 'antd';
import moment from 'moment';
import FormBuilder from './components/FormBuilder';
import ActionBuilder from './components/ActionBuilder';
import { typeFilter, submitFieldAdaptor } from './helper';
function Modals(props: any) {
  const { modelVisible, modalOnCancel, modalUrl } = props;

  // 改变Form
  const [form] = Form.useForm();
  // 获取接口数据
  const init = useRequest<{ data: BasicListApi.PageData }>(`https://public-api-v2.aspirantzhang.com${modalUrl}?X-API-KEY=antd`, {
    manual: true,
    // 错误捕捉
    onError:()=>{
      modalOnCancel()
    }
  });

  // 表单提交请求
  const request = useRequest(
    (value) => {
      message.loading({content:'Please wait a moment ......',key:'process',duration:0})
      const { uri, method, ...formValues } = value;
      return {
        url: `https://public-api-v2.aspirantzhang.com${uri}`,
        method: method,
        data: {
          ...submitFieldAdaptor(formValues),
          'X-API-KEY': 'antd',
        },
      };
    },
    {
      manual: true,
      onSuccess:(data)=>{
        modalOnCancel(true)
        message.success({
          content:data?.message,
          key:'process'
        })
      },
      formatResult:(res:any)=>{
        return res
      }
    },
  );
  // useEffect
  useEffect(() => {
    // 清空表单内容
    form.resetFields();
    modelVisible && init.run();
  }, [modelVisible]);

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

  const actionHandler = (action: BasicListApi.Action) => {
    //  1.表单提交 2.拿到数据  3.发送请求
    switch (action.action) {
      case 'submit':
        form.setFieldsValue({ uri: action.uri, method: action.method });
        form.submit();
        break;
        case 'cancel':
          modalOnCancel()
          break;
          case 'reset':
          form.resetFields()
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
        footer={ActionBuilder(init?.data?.layout?.actions[0]?.data, actionHandler,request?.loading)}
        maskClosable={false}
        forceRender
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
