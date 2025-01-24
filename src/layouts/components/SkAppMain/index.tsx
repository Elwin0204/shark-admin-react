
import useBaseStyles from '@/assets/styles/base';
import useStyles from "./style";
import { KeepAlive, useKeepAliveRef } from "keepalive-for-react";
import { useAppStore, useAuthStore, useThemeStore } from '@/stores';

interface Props {
  enablePadding?: boolean;
}

const SkAppMain: React.FC<Props> = ({ enablePadding = true }) => {
  const { styles: baseStyles, cx } = useBaseStyles();
  const { styles } = useStyles();
  const location = useLocation();
  const aliveRef = useKeepAliveRef();
  const outlet = useOutlet();
  const { cacheKeys, removeCacheKey } = useAuthStore();
  const { reloadFlag } = useAppStore();
  const { pageAnimate, pageAnimateMode } = useThemeStore();
  const transitionName = pageAnimate ? pageAnimateMode : "";
  const currentCacheKey = useMemo(() => {
    return location.pathname + location.search;
  }, [location.pathname, location.search]);

  useUpdateEffect(() => {
    if(aliveRef.current && removeCacheKey) {
      aliveRef.current.destroy(removeCacheKey);
    }
  }, [removeCacheKey]);

  useUpdateEffect(() => {
    aliveRef.current?.refresh();
  }, [reloadFlag]);

  return (
    <div className={cx(baseStyles.hFull, baseStyles.flexGrow, styles.appMainBg, enablePadding ? styles.appMainPadding : "")}>
      <KeepAlive
        aliveRef={aliveRef}
        activeCacheKey={currentCacheKey}
        max={18}
        include={cacheKeys}
        cacheNodeClassName={reloadFlag ? transitionName : ""}
      >
        {outlet}
      </KeepAlive>
    </div>
  )
}

export default SkAppMain