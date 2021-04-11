/*
 * @Author: your name
 * @Date: 2021-04-04 17:06:01
 * @LastEditTime: 2021-04-11 21:49:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/Modal.tsx
 */
import { memo, useEffect } from 'react';
import { useRequest } from 'umi';
import { Modal, Form, Input, message, Tag, Spin } from 'antd';
import moment from 'moment';
function Modals(props: any) {
  const { modelVisible, modalOnCancel, modalUrl } = props;

  // 表单提交请求
  const request = useRequest(
    (value) => {
      message.loading({ content: 'Please wait a moment ......', key: 'process', duration: 0 });
      const { uri, method, ...formValues } = value;
      return {
        url: `${uri}`,
        method: method,
        data: {
          ...formValues
        },
      };
    },
    {
      manual: true,
      onSuccess: (data) => {
        modalOnCancel(true);
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

        break;
      case 'cancel':

        break;
      case 'reset':

        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Modal
        visible={modelVisible}
        onCancel={modalOnCancel}
        maskClosable={false}
        forceRender
      >
        modalOk
      </Modal>
    </div>
  );
}

export default memo(Modals);
