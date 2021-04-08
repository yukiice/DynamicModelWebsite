/*
 * @Author: your name
 * @Date: 2021-04-06 11:28:32
 * @LastEditTime: 2021-04-08 17:31:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/helper.ts
 */
import moment from 'moment';

export const submitFieldAdaptor = (formValues: any) => {
  const result = formValues;
  Object.keys(formValues).forEach((key) => {
    if (moment.isMoment(formValues[key])) {
      result[key] = moment(formValues[key]).format();
    }
    if (Array.isArray(formValues[key])) {
      result[key] = formValues[key].map((items: any) => {
        if (moment.isMoment(items)) {
          return moment(items).format();
        }
        return items;
      });
    }
  });
  return result;
};

// 类型过滤器
export const typeFilter = (data: BasicListApi.PageData) => {
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
