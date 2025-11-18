import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => ({
  container: css`
    height: 100vh;
    position: relative;
    background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
    background-size: 400% 400%;
    animation: gradientAnimate 15s ease infinite;
    @keyframes gradientAnimate {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    };
  `,
  dialog: {
    width: 450,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(100px)',
    borderRadius: 10,
    position: 'absolute',
    zIndex: '2',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 8px 16px 0 rgba(128, 128, 128, 0.2)'
  },
  dialogInner: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  switchTip: {
    textAlign: 'right',
    marginTop: '12px',
    fontSize: '14px',
    color: '#000',
    a: {
      color: '#1890ff',
      cursor: 'pointer',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  form: {
    position: 'relative',
    maxWidth: '100%',
    padding: '30px 50px',
    overflow: 'hidden',
  },
  formItem: {
    paddingRight: 0,
    margin: '20px 0',
    color: '#454545',
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: 2,
  },
  input: {
    height: 50,
    fontSize: token.fontSize,
    color: token.colorText,
    background: '#f6f4fc',
    border: 0,
    caretColor: token.colorText,
  },
  titleTips: {
    lineHeight: '23px',
    marginTop: 29,
    fontSize: 20,
    fontWeight: 400,
    color: 'rgba(14, 18, 26, 1)',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  loginBtn: {
    width: '100%',
    height: 50,
    marginTop: 5,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: '1'
  },
  wave: {
    position: 'relative',
    marginBottom: -7,
    width: '100%',
    minHeight: 133,
    maxHeight: 200,
  },
  parallax: css`
    @keyframes move-forever {
      0% {
        transform: translate3d(-90px, 0, 0);
      }
      100% {
        transform: translate3d(85px, 0, 0);
      }
    }

    & > use {
      animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5)
      infinite;
    }

    /* 選擇一個use */
    & > use:nth-child(1) {
      /* 延遲2S執行 */
      animation-delay: -2s;
      /* 7s內執行完畢 */
      animation-duration: 7s;
    }

    & > use:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
    }

    & > use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }

    & > use:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
    }
  `,
  shark: css`
    @keyframes swim {
      0% {
        transform: translate(0, 0) scaleX(1);
      }
      50% {
        transform: translate(calc(100vw - 80px), 0) scaleX(1);
      }
      50.1% {
        transform: translate(calc(100vw - 80px), 0) scaleX(-1);
      }
      100% {
        transform: translate(0, 0) scaleX(-1);
      }
    }
    position: absolute;
    bottom: 150px;
    left: 10px;
    animation: swim 13s infinite linear;
  `
}))