/*
 * @Author: your name
 * @Date: 2021-04-01 21:00:38
 * @LastEditTime: 2021-04-09 21:57:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/pages/BasicList/index.tsx
 */
import { memo, useState, useEffect } from 'react';
import { Table, Space, Row, Col, Pagination, Card, Button, Modal, Tooltip, Form } from 'antd';
import { message } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { useRequest, useIntl, history,useLocation} from 'umi';
import { useSessionStorageState, useToggle,useUpdateEffect } from 'ahooks';
import { stringify } from 'query-string';
//引入样式等外部文件
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './index.less';
// 引入组件
import ActionBuilder from './components/ActionBuilder';
import ColumnBuilder from './components/ColumnBuilder';
import SearchBuilder from './components/SearchBuilder';
import Modals from './Modals';
import { submitFieldAdaptor } from './helper';
function BasicList() {
  const intl = useIntl();
  const location = useLocation()
  const { confirm } = Modal;
  const [searchForm] = Form.useForm();
  // useState
  const [pageQuery, setPageQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableColumns, setTableColumns] = useSessionStorageState<BasicListApi.Field[]>(
    'basicListTableColumns',
    [],
  );
  const [searchVisible, setSearchVisible] = useToggle(false);
  // effect
  useUpdateEffect(() => {
    init.run();
  }, [pageQuery, sortQuery]);
  useUpdateEffect(()=>{
    init.run(true)
  },[location.pathname])
  useEffect(() => {
    modalUrl && setModalVisible(true);
  }, [modalUrl]);
  const init = useRequest<{ data: BasicListApi.ListData }>((values: any) => {
    if (values === true) {
      return {
        url: `${location.pathname.replace('/basic-list','')}`
      };
    }
    return {
      url: `${location.pathname.replace('/basic-list','')}?${pageQuery}${sortQuery}`,
      params: values,
      paramsSerializer: (params: any) => {
        return stringify(params, { arrayFormat: 'comma', skipEmptyString: true, skipNull: true });
      },
    };
  },
  {
    onSuccess:()=>{
      setSelectedRowKeys([])
      setSelectedRows([])
    }
  }
  );
  const request = useRequest(
    (value: any) => {
      message.loading({ content: 'Please wait a moment ......', key: 'process', duration: 0 });
      const { uri, method, ...formValues } = value;
      return {
        url: `${uri}`,
        method: method,
        data: {
          ...formValues
        },
      };
    },
    {
      manual: true,
      onSuccess: (data) => {
        message.success({
          content: data?.message,
          key: 'process',
        });
        init.run()
      },
      formatResult: (res: any) => {
        return res;
      },
    },
  );
  useEffect(() => {
    if (init?.data?.layout.tableColumn) {
      setTableColumns(ColumnBuilder(init?.data?.layout?.tableColumn, actionHandler));
    }
  }, [init?.data?.layout?.tableColumn]);
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
  const paginationChangeHandler = (page: any, per_page: any) => {
    setPageQuery(`&page=${page}&per_page=${per_page}`);
  };

  // 关闭弹窗
  const hideModal = (reload = false) => {
    setModalVisible(false);
    reload && init.run();
  };

  // 左侧选择
  const rowSelection = {
    selectedRowKeys,
    // selectedRows:selectedRows,
    onChange: (_selectedRowKeys: any, _selectedRows: any) => {
      setSelectedRowKeys(_selectedRowKeys);
      setSelectedRows(_selectedRows);
    },
  };

  // 删除弹窗的column显示
  const deleteColumn = () => {
    return tableColumns ? [tableColumns[0] || {}, tableColumns[1] || {}] : [];
  };
  // 删除弹窗内容
  function batchOverView(dataSource: BasicListApi.Field[]) {
    return (
      <Table
        rowKey="id"
        columns={deleteColumn()}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    );
  }

  // action
  function actionHandler(action: BasicListApi.Action, record: BasicListApi.Field) {
    switch (action.action) {
      case 'modal':
        // 正则处理
        setModalUrl(
          action.uri?.replace(/:\w+/g, (field) => {
            return record[field.replace(':', '')];
          }) as string,
        );
        ``;
        setModalVisible(true);
        break;
      case 'reload':
        init.run();
        break;
      case 'deletePermanently':
      case 'restore':
      case 'delete':
        const operationName = intl.formatMessage({
          id: `basic-list.list.actionHandler.operation.${action.action}`,
        });
        confirm({
          title: intl.formatMessage(
            {
              id: 'basic-list.list.actionHandler.confirmTitle',
            },
            {
              operationName: operationName,
            },
          ),
          icon: <ExclamationCircleOutlined />,
          content: batchOverView(Object.keys(record).length ? [record] : selectedRows),
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            return request.run({
              uri: action.uri,
              method: action.method,
              type: action.action,
              ids: Object.keys(record).length ? [record.id] : selectedRowKeys,
            });
          },
        });
        break;
      case 'page':
        // 对uri进行处理
        const uri = action.uri?.replace(/:\w+/g, (field) => {
          return record[field.replace(':', '')];
        }) as string;
        history.push(`/basic-list${uri}`);
        break;
      default:
        break;
    }
  }

  // search搜索事件
  const onFinish = (value: any) => {
    init.run(submitFieldAdaptor(value));
  };

  // search组件
  const searchLayout = () => {
    return (
      searchVisible && (
        <Card>
          <Form form={searchForm} labelCol={{ span: 8 }} onFinish={onFinish}>
            <Row gutter={8}>{SearchBuilder(init?.data?.layout?.tableColumn)}</Row>
            <Row>
              <Col offset={21} xs={3}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button
                    onClick={() => {
                      init.run();
                      searchForm.resetFields();
                      setSelectedRowKeys([])
                      setSelectedRows([])
                    }}
                  >
                    Clear
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Card>
      )
    );
  };
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.r}>
          <Space>
            <Tooltip title="search">
              <Button
                shape="circle"
                icon={<SearchOutlined></SearchOutlined>}
                onClick={() => {
                  setSearchVisible.toggle();
                }}
                type={searchVisible ? 'primary' : 'default'}
              ></Button>
            </Tooltip>
            {ActionBuilder(init.data?.layout.tableToolBar, actionHandler)}
          </Space>
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

  const batchToolBar = () => {
    return (
      selectedRowKeys.length > 0 && (
        <Space>{ActionBuilder(init?.data?.layout?.batchToolBar, actionHandler)}</Space>
      )
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
          columns={tableColumns}
          pagination={false}
          loading={init.loading}
          onChange={TableChange}
          rowSelection={rowSelection}
        />
        {afterTableLayout()}
      </Card>
      {/* 弹窗组件 */}
      <Modals modelVisible={modalVisible} modalOnCancel={hideModal} modalUrl={modalUrl}></Modals>
      <FooterToolbar extra={batchToolBar()} />
    </PageContainer>
  );
}

export default memo(BasicList);
