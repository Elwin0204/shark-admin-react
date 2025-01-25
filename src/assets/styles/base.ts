import { createStyles } from 'antd-style'

export default createStyles(({ css }) => {
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
    flexColCenter: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
    flexColStretch: css`
      display: flex;
      flex-direction: column;
      align-items: stretch;
    `,
    flexShrink0: css`
      flex-shrink: 0;
    `,
    flexGrow: css`
      flex-grow: 1;
    `,
    flex1Hidden: css`
      flex: 1;
      overflow: hidden;
    `,
    justifyEnd: css`
      justify-content: flex-end;
    `,
    justifyBetween: css`
      justify-content: space-between;
    `,
    iFlexYCenter: css`
      display: inline-flex;
      align-items: center;
    `,
    relative: css`
      position: relative;
    `,
    absolute: css`
      position: absolute;
    `,
    textCenter: css`
      text-align: center;
    `,
    ellipsisText: css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,
    textIcon: css`
      font-size: 1.125rem;
      line-height: 1;
    `,
    textIconSmall: css`
      font-size: 1rem;
      line-height: 1;
    `,
    textIconLarge: css`
      font-size: 1.5rem;
      line-height: 1;
    `,
    overflowHidden: css`
      overflow: hidden;
    `,
    overflowYAuto: css`
      overflow-y: auto;
    `,
    nowrapHidden: css`
      overflow: hidden;
      white-space: nowrap;
    `,
    alignMiddle: css`
      vertical-align: middle;
    `,
    cursorPointer: css`
      cursor: pointer;
    `,
    transitionAll300: css`
      transition-property: all;
      transition-timing-function: cubic-bezier(.4,0,.2,1);
      transition-duration: .3s;
    `,
    settingItem: css`
      gap: 23.5px;
    `
  }
})