/*
 * @Author: your name
 * @Date: 2021-04-01 21:00:38
 * @LastEditTime: 2021-04-03 11:06:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/index.tsx
 */
import { memo, useState, useEffect } from 'react';
import { Table, Space, Row, Col, Button, Pagination, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import styles from './index.less';
function BasicList() {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const init = useRequest<{ data: BasicListApi.Data }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`,
  );

  useEffect(() => {
    init.run();
  }, [page, per_page]);

  const searchLayout = () => {};
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.r}>
          <Space>
            <Button type="primary">Add</Button>
            <Button type="primary">Add2</Button>
          </Space>
        </Col>
      </Row>
    );
  };
  const paginationChangeHandler = (_page: any, _per_page: any) => {
    setPage(_page);
    setPerPage(_per_page);
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
          columns={init?.data?.layout?.tableColumn.filter((item) => item.hideInColumn !== true)}
          pagination={false}
          loading={init.loading}
        />
        {afterTableLayout()}
      </Card>
    </PageContainer>
  );
}

export default memo(BasicList);
