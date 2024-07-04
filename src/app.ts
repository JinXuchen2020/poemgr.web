import { AuthService } from "./services/authService";
import { IUserTokenModel } from "./models";
import { getLoginUser } from "./services/user";
import { PathAccess } from "./constant";
import { JwtService } from "./services/jwtService";
import { Outlet } from "umi";

/**
 *
 * 页面渲染时，函数执行顺序：
 * 1：render
 * 2：patchRoutes
 * 3：getInitialState
 * 4：onRouteChange
 */

const authService = new AuthService();

export const getInitialState = async () => {
  // await authService.setActiveAccount();
  // let user = authService.getAccount();
  // if (user === null) {
  //   await authService.login();
  // }
  if (!JwtService.getAccessToken()) {
    if (!window.location.href.endsWith('login')){
      window.location.href = 'login';
    }
  }
  else{
    const user = undefined;
    const { data } = await getLoginUser();
    const userProfile: IUserTokenModel = {
      user: data,
      token: user ?? JwtService.getAccessToken()!,
    };
  
    return userProfile;
  }  
};

export const patchClientRoutes = ({ routes }: { routes: any[] }) => {
  PathAccess.forEach((t) => {
    let result = routes[0].routes.filter((c: any) => c.path.includes(t.path));
    result.forEach(c=> c['access'] = t.access)
  });
};
