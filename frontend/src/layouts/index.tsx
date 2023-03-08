import { Link, Outlet } from 'umi';
import styles from './index.less';
import { Layout as antLayout } from "antd";

export default function Layout() {

  return (
    <div id={"main"} >
      <Outlet />
    </div>
  );
}
