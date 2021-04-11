import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification ,message} from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { ResponseError } from 'umi-request';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { currentMenu as queryCurrentMenu } from './services/ant-design-pro/api';
// import { BookOutlined, LinkOutlined } from '@ant-design/icons';

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  currentMenu?: any;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchUserMenu?: () => Promise<API.CurrentMenu | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrentUser();
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  const fetchMenu = async () => {
    try {
      const currentMenu = await queryCurrentMenu();
      return currentMenu;
    } catch (error) {
      message.error('菜单列表渲染失败');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    const currentMenu = await fetchMenu();
    return {
      fetchUserInfo,
      currentUser,
      currentMenu,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // menuDataRender: () => {
    //   return initialState?.currentMenu;
    // },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
    iconfontUrl:"//at.alicdn.com/t/font_2112134_uyx99817ji.js",
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error: ResponseError) => {
  console.log(error, '这是报错信息');
  switch (error.name) {
    case 'BizError':
      if (error.data.message) {
        notification.error({
          message: error.data.message,
        });
      }
      break;
    case 'ResponseError':
      if (error.data.message) {
        notification.error({
          message: error.response.status,
          description: error.response.statusText,
        });
      }
      break;
    case 'TypeError':
      if (error.data.message) {
        notification.error({
          message: '当前网络繁忙，请稍后再试',
        });
      }
      break;
    default:
      if (error.data.message) {
        notification.error({
          message: '服务器繁忙或出现了错误,请联系管理员',
        });
      }
      break;
  }
  throw error;
};

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  errorHandler,
};
