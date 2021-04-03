/*
 * @Author: your name
 * @Date: 2021-04-01 21:00:38
 * @LastEditTime: 2021-04-03 16:12:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/index.tsx
 */
import { memo, useState, useEffect } from 'react';
import { Table, Space, Row, Col, Pagination, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
//引入样式等外部文件
import styles from './index.less';
// 引入组件
import ActionBuilder from './components/ActionBuilder';
import ColumnBuilder from './components/ColumnBuilder';
function BasicList() {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const init = useRequest<{ data: BasicListApi.Data }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`,
  );

  useEffect(() => {
    init.run();
  }, [page, per_page]);

  const paginationChangeHandler = (_page: any, _per_page: any) => {
    setPage(_page);
    setPerPage(_per_page);
  };

  const searchLayout = () => {};
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.r}>
          <Space>{ActionBuilder(init.data?.layout.tableToolBar)}</Space>
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
          dataSource={init?.data?.dataSource}
          columns={ColumnBuilder(init?.data?.layout?.tableColumn)}
          pagination={false}
          loading={init.loading}
        />
        {afterTableLayout()}
      </Card>
    </PageContainer>
  );
}

export default memo(BasicList);
