/*
 * @Author: your name
 * @Date: 2021-04-01 21:00:38
 * @LastEditTime: 2021-04-06 17:44:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/index.tsx
 */
import { memo, useState, useEffect } from 'react';
import { Table, Space, Row, Col, Pagination, Card, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
//引入样式等外部文件
import styles from './index.less';
// 引入组件
import ActionBuilder from './components/ActionBuilder';
import ColumnBuilder from './components/ColumnBuilder';
import Modals from './Modals';
function BasicList() {
  // useState
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [sortQuery, setSortQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  // effect
  useEffect(() => {
    init.run();
  }, [page, per_page, sortQuery]);
  const init = useRequest<{ data: BasicListApi.ListData }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}${sortQuery}`,
  );
  // 表格事件
  const TableChange = (_: any, __: any, sorter: any) => {
    if (sorter.order === undefined) {
      setSortQuery('');
    } else {
      const orderBy = sorter.order === 'ascend' ? 'asc' : 'desc';
      setSortQuery(`&sort=${sorter.order}&order=${orderBy}`);
    }
  };
  // 翻页事件
  const paginationChangeHandler = (_page: any, _per_page: any) => {
    setPage(_page);
    setPerPage(_per_page);
  };

  // 关闭弹窗
  const hideModal = (reload = false) => {
    setModalVisible(false);
    reload && init.run();
  };

  // action
  const actionHandler = (action: BasicListApi.Action, record: any) => {
    switch (action.action) {
      case 'modal':
        // 正则处理

        setModalUrl(
          action.uri?.replace(/:\w+/g, (field) => {
            return record[field.replace(':', '')];
          }) as string,
        );
        setModalVisible(true);
        break;
        case "reload":
          init.run()
          break;
      default:
        break;
    }
  };

  const searchLayout = () => {};
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setModalVisible(true);
                setModalUrl(
                  `https://public-api-v2.aspirantzhang.com/api/admins/add?X-API-KEY=antd`,
                );
              }}
            >
              add
            </Button>
            {/* 管理员ADD */}

            <Button
              type="default"
              onClick={() => {
                setModalVisible(true);
                setModalUrl(
                  `https://public-api-v2.aspirantzhang.com/api/admins/206?X-API-KEY=antd`,
                );
              }}
            >
              adminAdd
            </Button>
          </Space>
        </Col>
        <Col xs={24} sm={12} className={styles.r}>
          <Space>{ActionBuilder(init.data?.layout.tableToolBar, actionHandler)}</Space>
        </Col>
      </Row>
    );
  };

  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.r}>
          <Pagination
            total={init?.data?.meta?.total || 0}
            current={init?.data?.meta?.page || 1}
            pageSize={init?.data?.meta?.per_page || 10}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            onChange={paginationChangeHandler}
            onShowSizeChange={paginationChangeHandler}
          />
        </Col>
      </Row>
    );
  };

  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          rowKey="id"
          dataSource={init?.data?.dataSource}
          columns={ColumnBuilder(init?.data?.layout?.tableColumn, actionHandler, false)}
          pagination={false}
          loading={init.loading}
          onChange={TableChange}
        />
        {afterTableLayout()}
      </Card>
      {/* 弹窗组件 */}
      <Modals modelVisible={modalVisible} modalOnCancel={hideModal} modalUrl={modalUrl}></Modals>
    </PageContainer>
  );
}

export default memo(BasicList);
