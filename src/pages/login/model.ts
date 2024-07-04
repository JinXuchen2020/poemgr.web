import { IUserRspModel } from "@/models";
import { ConnectProps, Dispatch, Effect } from "umi";
import { IModelState, ModelEffect, ModelReducer } from "@/utils";
import { login } from "@/services/user";

export const ModelName = "loginModel";

export interface LoginModelState extends IModelState<IUserRspModel, IUserRspModel> {
  token: string | undefined;
}

export interface PageProps extends ConnectProps {
  dispatch: Dispatch;
  pageState: LoginModelState;
}

interface LoginModelEffect extends ModelEffect {
  login: Effect
}

interface IndexModelType {
  namespace: string;
  state: LoginModelState;
  effects: LoginModelEffect;
  reducers: ModelReducer<IUserRspModel>;
}

const initState = (): LoginModelState => ({
  loading: false,
  pageTitle: undefined,
  modelList: undefined,
  currentModel: undefined,
  isEditing: false,
  token: undefined,
});

const IndexModel: IndexModelType = {
  namespace: ModelName,
  state: initState(),
  effects: {
    *initState({ payload }, { call, put, select }) {
      yield put({
        type: "update",
        payload: initState(),
      });
    },
    *login({ payload }, { call, put }) {
      yield put({ type: "update", payload: { loading: true } });
      const { data } = yield call(login, payload.userEmail);
      yield put({
        type: "update",
        payload: {
          token: data,
          loading: false,
          isEditing: false,
        },
      });
    },
  },
  reducers: {
    update: (state, action) => ({ ...state, ...action.payload }),
  },
};

export default IndexModel;
