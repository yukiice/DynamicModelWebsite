/*
 * @Author: your name
 * @Date: 2021-04-04 17:06:01
 * @LastEditTime: 2021-04-04 21:06:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/Modal.tsx
 */
import { memo, useEffect } from 'react';
import { useRequest } from 'umi';
import { Modal, Form } from 'antd';
import FormBuilder from './components/FormBuilder';
import ActionBuilder from './components/ActionBuilder'
function Modals(props: any) {
  // useState
  const { modelVisible, modalOnCancel, modalUrl } = props;

  // 获取接口数据
  const init = useRequest<{ data: ModalApi.Data }>(`${modalUrl}`);
  // useEffect
  useEffect(() => {
    modelVisible && init.run();
  }, [modelVisible]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <div>
      <Modal title={init?.data?.page.title} visible={modelVisible} onCancel={modalOnCancel} footer={ActionBuilder(init?.data?.layout?.actions[0]?.data)}>
        <Form {...layout}>{FormBuilder(init?.data?.layout?.tabs[0]?.data)}</Form>
      </Modal>
    </div>
  );
}

export default memo(Modals);
