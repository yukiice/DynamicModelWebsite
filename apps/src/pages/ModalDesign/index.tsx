/*
 * @Author: your name
 * @Date: 2021-04-10 17:50:42
 * @LastEditTime: 2021-04-12 15:27:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/ModalDesign/index.tsx
 */
import { useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormEffectHooks,
  createFormActions,
} from '@formily/antd';
import { Button } from 'antd';
import { Input, FormCard, ArrayTable, Select, Checkbox } from '@formily/antd-components';
import { IFormEffect, IFieldState } from '@formily/react/lib';
import * as enums from './enums';
import { schemaExample } from './initialValues';
import 'antd/dist/antd.css';
import Modals from './Modals';

const modelDesignActions = createFormActions();

const ModalDesign = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentFieldPath, setCurrentFieldPath] = useState('');

  const onSubmit = (values: any) => {
    console.log(values);
  };

  // 弹窗提交事件
  const modalSubmitHandler = (value: any) => {
    setModalVisible(false)
    modelDesignActions.setFieldValue(currentFieldPath,value)
  };
  const { onFieldValueChange$, onFieldChange$ } = FormEffectHooks;
  const modelDesignEffect: IFormEffect = (_, actions) => {
    // 点击data按钮弹窗展现
    onFieldChange$('fieldsCard.fields.*.data').subscribe((state) => {
      if (state.active === true) {
        setCurrentFieldPath(state.path as string);
        setModalVisible(true);
      }
    });
    // 表格操作联动
    onFieldValueChange$('fieldsCard.fields.*.type').subscribe((state) => {
      // if (state.value === 'number') {
      //   actions.setFieldValue(
      //     FormPath.transform(state.path, /\d/g, (index) => {
      //       return `fieldsCard.fields.${parseInt(index) - 1}.listSorter`;
      //     }),
      //     true,
      //   );
      // }
      if (state.value === 'switch' || state.value === 'radio') {
        actions.setFieldState(state.path.replace('type', 'data'), (state: IFieldState) => {
          state.editable = true;
          state.required = true;
        });
      } else {
        actions.setFieldState(state.path.replace('type', 'data'), (state: IFieldState) => {
          state.editable = false;
          state.required = false;
        });
      }
    });
  };
  return (
    <PageContainer>
      <SchemaForm
        components={{ Input, ArrayTable, Select, Checkbox, Button }}
        effects={modelDesignEffect}
        initialValues={schemaExample}
        onSubmit={onSubmit}
        actions={modelDesignActions}
      >
        <FormCard title="Basic" name="basicCard">
          <Field title="Route Name" name="routeName" x-component="Input" />
        </FormCard>

        <FormCard title="Fields" name="fieldsCard">
          <Field name="fields" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Name" name="name" x-component="Input" />
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.fieldType} />
              <Field
                title="Data"
                name="data"
                x-component="Button"
                x-component-props={{
                  children: 'Data',
                  onClick: () => {},
                }}
              />
              <Field title="List Sorter" name="listSorter" x-component="Checkbox" />
              <Field title="Hide InColumn" name="hideInColumn" x-component="Checkbox" />
              <Field title="Edit Disabled" name="editDisabled" x-component="Checkbox" />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="List Action">
          <Field name="listAction" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.buttonType} />
              <Field title="Action" name="action" x-component="Select" enum={enums.buttonAction} />
              <Field title="Uri" name="uri" x-component="Input" />
              <Field title="Method" name="method" x-component="Select" enum={enums.httpMethod} />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="Add Action">
          <Field name="addAction" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.buttonType} />
              <Field title="Action" name="action" x-component="Select" enum={enums.buttonAction} />
              <Field title="Uri" name="uri" x-component="Input" />
              <Field title="Method" name="method" x-component="Select" enum={enums.httpMethod} />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="Edit Action">
          <Field name="editAction" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.buttonType} />
              <Field title="Action" name="action" x-component="Select" enum={enums.buttonAction} />
              <Field title="Uri" name="uri" x-component="Input" />
              <Field title="Method" name="method" x-component="Select" enum={enums.httpMethod} />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="Table Toolbar">
          <Field name="tableToolbar" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.buttonType} />
              <Field title="Action" name="action" x-component="Select" enum={enums.buttonAction} />
              <Field title="Uri" name="uri" x-component="Input" />
              <Field title="Method" name="method" x-component="Select" enum={enums.httpMethod} />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="Batch Toolbar">
          <Field name="batchToolbar" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.buttonType} />
              <Field title="Action" name="action" x-component="Select" enum={enums.buttonAction} />
              <Field title="Uri" name="uri" x-component="Input" />
              <Field title="Method" name="method" x-component="Select" enum={enums.httpMethod} />
            </Field>
          </Field>
        </FormCard>

        <FormCard title="Batch Toolbar - Trashed">
          <Field name="batchToolbarTrashed" type="array" x-component="ArrayTable">
            <Field type="object">
              <Field title="Title" name="title" x-component="Input" />
              <Field title="Type" name="type" x-component="Select" enum={enums.buttonType} />
              <Field title="Action" name="action" x-component="Select" enum={enums.buttonAction} />
              <Field title="Uri" name="uri" x-component="Input" />
              <Field title="Method" name="method" x-component="Select" enum={enums.httpMethod} />
            </Field>
          </Field>
        </FormCard>
      </SchemaForm>
      <FooterToolbar
        extra={
          <Button
            onClick={() => {
              modelDesignActions.submit();
            }}
          >
            Subimt
          </Button>
        }
      ></FooterToolbar>

      {/* 弹窗组件 */}
      <Modals
        modelVisible={modalVisible}
        modalOnCancel={() => {
          setModalVisible(false);
        }}
        modalSubmitHandler={modalSubmitHandler}
      ></Modals>
    </PageContainer>
  );
};

export default ModalDesign;
