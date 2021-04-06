/*
 * @Author: your name
 * @Date: 2021-04-03 15:41:08
 * @LastEditTime: 2021-04-06 14:41:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/components/ActionBuilder.tsx
 */
import { Button } from 'antd';

// 导入类型
import type { ButtonType } from 'antd/lib/button';
const ActionBuilder = (actions: BasicListApi.Action[] | undefined, actionHandler: BasicListApi.ActionHandler) => {
  return (actions || []).map((action) => {
    if (action.component === 'button') {
      return (
        <Button
          key={action?.text}
          type={action?.type as ButtonType}
          onClick={() => {
            actionHandler(action);
          }}
        >
          {action.text}
        </Button>
      );
    }
    return null;
  });
};

export default ActionBuilder;
