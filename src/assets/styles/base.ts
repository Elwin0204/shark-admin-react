import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  return {
    hFull: css`
      height: 100%;
    `,
    wFull: css`
      width: 100%;
    `,
    sizeFull: css`
      width: 100%;
      height: 100%;
    `,
    flex: css`
      display: flex;
    `,
    flexCol: css`
      display: flex;
      flex-direction: column;
    `,
    flexCenter: css`
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    flexYCenter: css`
      display: flex;
      align-items: center;
    `,
    flexRowBetween: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    flexShrink0: css`
      flex-shrink: 0;
    `,
    flexGrow: css`
      flex-grow: 1;
    `,
    textCenter: css`
      text-align: center;
    `,
    textIcon: css`
      font-size: 1.125rem;
      line-height: 1;
    `,
    overflowHidden: css`
      overflow: hidden;
    `,
    overflowYAuto: css`
      overflow-y: auto;
    `,
    transitionAll300: css`
      transition-property: all;
      transition-timing-function: cubic-bezier(.4,0,.2,1);
      transition-duration: .3s;
    `
  }
})