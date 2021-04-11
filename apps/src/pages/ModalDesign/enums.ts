/*
 * @Author: your name
 * @Date: 2021-04-11 18:22:19
 * @LastEditTime: 2021-04-11 18:22:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/ModalDesign/enum.ts
 */
export const fieldType = [
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Switch', value: 'switch' },
  { label: 'Radio', value: 'radio' },
  { label: 'Datetime', value: 'datetime' },
];

export const buttonType = [
  { label: 'Primary', value: 'primary' },
  { label: 'Default', value: 'default' },
  { label: 'Danger', value: 'danger' },
  { label: 'Dashed', value: 'dashed' },
];

export const buttonAction = [
  { label: 'Modal', value: 'modal' },
  { label: 'Page', value: 'page' },
  { label: 'Reload', value: 'reload' },
  { label: 'Reset', value: 'reset' },
  { label: 'Cancel', value: 'cancel' },
  { label: 'Submit', value: 'submit' },
  { label: 'Delete', value: 'delete' },
  { label: 'Disable', value: 'disable' },
  { label: 'DeletePermanently', value: 'deletePermanently' },
  { label: 'Restore', value: 'restore' },
];

export const httpMethod = [
  { label: 'Get', value: 'get' },
  { label: 'Post', value: 'post' },
  { label: 'Put', value: 'put' },
];