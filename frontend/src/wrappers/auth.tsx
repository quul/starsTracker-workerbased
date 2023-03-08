import { Navigate, Outlet } from 'umi'
import useAuth from "@/services/useAuth";

export default () => {
  const { isLogin } = useAuth()
  if (isLogin) {
    return <Outlet />;
  } else{
    return <Navigate to="/login" />;
  }
}