/*
 * @Author: your name
 * @Date: 2021-04-04 17:06:01
 * @LastEditTime: 2021-04-12 17:31:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/Modal.tsx
 */
import { memo, useEffect } from 'react';
// import { useRequest } from 'umi';
import {} from 'react';
import { SchemaForm, SchemaMarkupField as Field, createFormActions } from '@formily/antd';
import { Modal } from 'antd';
import { Input, FormCard, ArrayTable } from '@formily/antd-components';

const modalAction = createFormActions();

function Modals(props: any) {
  const { modelVisible, modalOnCancel, modalSubmitHandler, modalState} = props;

  useEffect(() => {
    if (modelVisible === false) {
      modalAction.reset();
    }
  }, [modelVisible]);

  useEffect(() => {
    // 赋值
    if (modalState.values) {
      modalAction.setFormState((state) => {
        state.values = {
          data: modalState.values,
        };
      });
    }
    if (modalState.type === 'switch') {
      modalAction.setFieldState('data', (state) => {
        state.props['x-component-props'] = {
          operations: false,
          renderAddition: () => null,
        };
      });

      modalAction.setFormState((state) => {
        state.values = {
          data: [
            {
              title: 'Enabled',
              value: 1,
            },
            {
              title: 'Disabled',
              value: 0,
            },
          ],
        };
      });
    } else {
      modalAction.setFieldState('data', (state) => {
        state.props['x-component-props'] = {};
      });
    }
  }, [modalState]);
  // 表单提交请求
  // const request = useRequest(
  //   (value) => {
  //     message.loading({ content: 'Please wait a moment ......', key: 'process', duration: 0 });
  //     const { uri, method, ...formValues } = value;
  //     return {
  //       url: `${uri}`,
  //       method: method,
  //       data: {
  //         ...formValues,
  //       },
  //     };
  //   },
  //   {
  //     manual: true,
  //     onSuccess: (data) => {
  //       modalOnCancel(true);
  //       message.success({
  //         content: data?.message,
  //         key: 'process',
  //       });
  //     },
  //     formatResult: (res: any) => {
  //       return res;
  //     },
  //   },
  // );
  return (
    <div>
      <Modal
        visible={modelVisible}
        onCancel={modalOnCancel}
        onOk={() => {
          modalAction.submit();
        }}
        maskClosable={false}
        forceRender
        focusTriggerAfterClose={false}
      >
        <SchemaForm
          components={{ ArrayTable, Input }}
          actions={modalAction}
          onSubmit={modalSubmitHandler}
        >
          <FormCard title="Fields" name="fieldsCard">
            <Field name="data" type="array" x-component="ArrayTable">
              <Field type="object">
                <Field title="Title" name="title" x-component="Input"></Field>
                <Field title="Value" name="value" x-component="Input"></Field>
              </Field>
            </Field>
          </FormCard>
        </SchemaForm>
      </Modal>
    </div>
  );
}

export default memo(Modals);
