
/**
 * @author Elwin
 * @description tab配置
 */
import { create } from 'zustand' 

interface TabState {
  activeFirstLevelMenuKey: string;
  setActiveFirstLevelMenuKey: (key?: string) => void;
}

const useTabStore = create<TabState>()(
  (set) => ({
    activeFirstLevelMenuKey: "",
    setActiveFirstLevelMenuKey: (key?: string) => set(() => ({ activeFirstLevelMenuKey: key })),
  }),
)

export default useTabStore

