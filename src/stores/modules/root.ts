// rootStore.ts
import create from 'zustand';
import { combine } from 'zustand/middleware';
import useAppStore from './app';
import useTabStore from './tab';
import useAuthStore from './auth';
import useUserStore from './user';

export const useRootStore = create(
  combine(
    {
      app: useAppStore.getState(),
      tab: useTabStore.getState(),
      auth: useAuthStore.getState(),
      user: useUserStore.getState(),
    },
    (set, get) => ({
      logout: () => {
        // 调用各个子store的清除方法
        get().user.resetUser();
        get().auth.resetAuth();
      }
    })
  )
);

export default useRootStore;