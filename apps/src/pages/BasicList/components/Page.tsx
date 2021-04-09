/*
 * @Author: your name
 * @Date: 2021-04-07 16:38:16
 * @LastEditTime: 2021-04-09 20:19:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/Page.tsx
 */
import { memo, useEffect } from 'react';
import { Row, Col, Tabs, Card, Form, Space, Tag, message, Input, Spin } from 'antd';
import { useLocation, useRequest, history } from 'umi';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import { typeFilter, submitFieldAdaptor } from '../helper';
import '../index.less';
import FormBuilder from './FormBuilder';
import ActionBuilder from './ActionBuilder';
function Page() {
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const location = useLocation();
  const init = useRequest<{ data: BasicListApi.PageData }>(
    `${location.pathname.replace(
      '/basic-list',
      '',
    )}`,
    {
      // manual:true,
      onError: () => {
        history.goBack();
        message.error(' Error please contact the administrator');
      },
    },
  );
  // 表单提交请求
  const request = useRequest(
    (value) => {
      message.loading({ content: 'Please wait a moment ......', key: 'process', duration: 0 });
      const { uri, method, ...formValues } = value;
      return {
        url: `${uri}`,
        method: method,
        data: {
          ...submitFieldAdaptor(formValues)
        },
      };
    },
    {
      manual: true,
      onSuccess: (data) => {
        message.success({
          content: data?.message,
          key: 'process',
        });
      },
      formatResult: (res: any) => {
        return res;
      },
    },
  );
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
  };
  // 表单赋值
  useEffect(() => {
    init.data && form.setFieldsValue(typeFilter(init.data));
  }, [init.data]);
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
        history.goBack();
        break;
      case 'cancel':
        message.error('错误');
        history.goBack();
        break;
      case 'reset':
        form.resetFields();
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <PageContainer>
        {init.loading ? (
          <Spin tip="loading.........."></Spin>
        ) : (
          <>
            <Form
              form={form}
              {...layout}
              initialValues={{
                create_time: moment(),
                update_time: moment(),
                status: true,
              }}
              onFinish={onFinish}
            >
              <Row gutter={24}>
                <Col span={18}>
                  <div className="card-container">
                    <Tabs type="card">
                      {(init.data?.layout?.tabs || []).map((item) => {
                        return (
                          <TabPane key={item.title} tab={item.title}>
                            <Card>{FormBuilder(item.data)}</Card>
                          </TabPane>
                        );
                      })}
                    </Tabs>
                  </div>
                </Col>
                {/* 右边 */}
                <Col span={6}>
                  {(init.data?.layout?.actions || []).map((item) => {
                    return (
                      <Card key={item.title}>
                        <Space>{ActionBuilder(item.data, actionHandler)}</Space>
                      </Card>
                    );
                  })}
                </Col>
              </Row>

              <FooterToolbar
                extra={
                  <Space>{ActionBuilder(init.data?.layout.actions[0].data, actionHandler)}</Space>
                }
              ></FooterToolbar>
              <Form.Item name="uri" key="uri" hidden>
                <Input />
              </Form.Item>
              <Form.Item name="method" key="method" hidden>
                <Input />
              </Form.Item>
            </Form>
            <Tag>
              Update Time :{' '}
              {moment(form.getFieldValue('update_time')).format('YYYY-MM-DD HH:mm:ss')}
            </Tag>
          </>
        )}
      </PageContainer>
    </div>
  );
}

export default memo(Page);
