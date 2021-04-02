import { memo, useState } from 'react';
import { Table, Tag, Space, Row, Col, Button, Pagination } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import styles from './index.less';
function BasicList() {
  // useState
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const init = useRequest<{ data: BasicListApi.Data }>(
    {
      url:`https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`,
      method:'GET'
    }
  );
  console.log(init)
  // 翻页方法
  const pageNationchangeHandle = (page, pageSize) => {
    console.log(page, pageSize);
  };
  // 组件-------------------
  const searchLayout = () => {};
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={12} sm={12}>
          1
        </Col>
        <Col xs={12} sm={12} className={styles.r}>
          <Space>
            <Button type="primary">add</Button>
            <Button type="primary">add2</Button>
          </Space>
        </Col>
      </Row>
    );
  };
  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={12} sm={12}>
          ...
        </Col>
        <Col xs={12} sm={12} style={styles.r}>
          <Pagination
            total={init?.data?.meta?.total || 0}
            current={init?.data?.meta?.page || 1}
            pageSize={init?.data?.meta?.per_page || 10}
            showSizeChanger
            showQuickJumper
            onChange={pageNationchangeHandle}
            onShowSizeChange={pageNationchangeHandle}
            showTotal={(total) => `Total ${total} items`}
          />
        </Col>
      </Row>
    );
  };
  return (
    <div>
      <PageContainer>
        {searchLayout()}
        {beforeTableLayout()}
        <Table
          columns={init?.data?.layout?.tableColumn.filter((item: any) => {
            return item.hideInColumn !== true;
          })}
          dataSource={init?.data?.dataSource}
          pagination={false}
          loading={init.loading}
        />
        {afterTableLayout()}
      </PageContainer>
    </div>
  );
}

export default memo(BasicList);
