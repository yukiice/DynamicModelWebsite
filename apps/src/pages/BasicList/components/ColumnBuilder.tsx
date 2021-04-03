/*
 * @Author: your name
 * @Date: 2021-04-03 15:39:46
 * @LastEditTime: 2021-04-03 16:16:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/ColumnBuilder.tsx
 */

import { Tag, Space } from 'antd';
import moment from 'moment';
import ActionBuilder from './ActionBuilder';
const ColumnBuilder = (tableColumn: BasicListApi.TableColumn[] | undefined) => {
  const newColumns: BasicListApi.TableColumn[] = [];
  (tableColumn || []).forEach((row) => {
    if (!row.hideInColumn) {
      switch (row.type) {
        case 'datetime':
          row.render = (value: any) => {
            return moment(value).format('YYYY-MM-DD hh:mm:ss');
          };
          break;
        case 'switch':
          row.render = (value: any) => {
            const option = (row.data || []).find((item) => {
              return item.value === value;
            });
            return <Tag color={value ? 'blue' : 'red'}>{option?.title}</Tag>;
          };
          break;
        case 'actions':
          row.render = (value: any) => {
            return <Space>{ActionBuilder(row.actions)}</Space>;
          };
          break;
        default:
          break;
      }
      newColumns.push(row);
    }
  });
  // 组合id cloumns
  const idColumn :BasicListApi.TableColumn[] = [{
    title:'ID',
    dataIndex:'id',
    key:'id',
    sorter:true
  }]
  return idColumn.concat(newColumns)
};

export default ColumnBuilder;
