// @ts-ignore
import Cookies from "js-cookie"

export default () => {
  const authKey: string = Cookies.get<string>('authKey') || ""
  let isLogin = false
  if (authKey) {
    isLogin = true
  }
  return { isLogin, authKey }
}