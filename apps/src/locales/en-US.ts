/*
 * @Author: your name
 * @Date: 2021-04-01 20:53:06
 * @LastEditTime: 2021-04-07 15:42:46
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/src/locales/en-US.ts
 */
import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';
import pages from './en-US/pages';
import basicList from './en-US/basicList'
export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
  ...basicList
};
