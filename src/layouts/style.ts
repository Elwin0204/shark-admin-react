import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseTopBarHeight, baseTabsBarHeight, baseZindex, baseNavBarHeight, baseColorWhite, baseBoxShadow, basePadding, baseLeftMenuWidth, baseTransition } = token
  return {
    sharkAdminWrapper: css`
      position: relative;
      width: 100%;
      height: 100%;
      & .layout-container-horizontal {
        position: relative;
        &.fixed {
          padding-top: calc(${baseTopBarHeight}px + ${baseTabsBarHeight}px);
        }

        &.fixed.no-tabs-bar {
          padding-top: ${baseTopBarHeight}px;
        }

        .sk-main {
          width: 88%;
          margin: auto;
        }

        .fixed-header {
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          z-index: ${baseZindex} - 2;
          width: 100%;
          overflow: hidden;
        }

        .tag-view-show {
          background: ${baseColorWhite};
          box-shadow: ${baseBoxShadow};
        }

        .nav-bar-container {
          .fold-unfold {
            display: none;
          }
        }

        .main-padding {
          .app-main-container {
            margin-top: ${basePadding}px;
            margin-bottom: ${basePadding}px;
            background: ${baseColorWhite};
          }
        }
      }

      & .layout-container-vertical {
        position: relative;
        .mask {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: ${baseZindex} - 1;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #000;
          opacity: 0.5;
        }
        &.fixed {
          padding-top: calc(${baseNavBarHeight}px + ${baseTabsBarHeight}px);
        }

        &.fixed.no-tabs-bar {
          padding-top: ${baseNavBarHeight}px;
        }

        .sk-main {
          position: relative;
          min-height: 100%;
          margin-left: ${baseLeftMenuWidth}px;
          background: #f6f8f9;
          transition: ${baseTransition};
        }
      }

      &.mobile {
        .layout-container-vertical {
          .el-scrollbar.side-bar-container.is-collapse {
            width: 0;
            .sk-collapse.is-collapse {
              width: 20px;
            }
          }

          .sk-main {
            width: 100%;
            margin-left: 0;
          }
        }

        .sk-main {
          .fixed-header {
            left: 0 !important;
            width: 100% !important;
          }
        }
      }
    `,
  }
})