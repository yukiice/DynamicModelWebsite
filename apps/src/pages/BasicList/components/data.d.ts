/*
 * @Author: your name
 * @Date: 2021-04-04 19:41:35
 * @LastEditTime: 2021-04-04 20:17:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/data.d.ts
 */
declare module ModalApi {
  export interface Page {
    title: string;
    type: string;
  }

  export interface Datum2 {
    id: number;
    parent_id: number;
    name: string;
    create_time: Date;
    delete_time?: any;
    status: number;
    value: number;
    title: string;
    depth: number;
  }

  export interface Datum {
    title: string;
    dataIndex: string;
    key: string;
    type: string;
    data: Datum2[];
  }

  export interface Tab {
    name: string;
    title: string;
    data: Datum[];
  }

  export interface Datum3 {
    component: string;
    text: string;
    type: string;
    action: string;
    uri: string;
    method: string;
  }

  export interface Action {
    name: string;
    title: string;
    data: Datum3[];
  }

  export interface Layout {
    tabs: Tab[];
    actions: Action[];
  }

  export interface Data {
    page: Page;
    layout: Layout;
  }

  export interface RootObject {
    success: boolean;
    message: string;
    data: Data;
  }
}
