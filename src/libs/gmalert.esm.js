var alertCss = ".gmal{--gmal-alert-bg:#fff;--gmal-overlay-bg:#00000080;--gmal-border-c:#00000017}.gmal-overlay{z-index:0;background:var(--gmal-overlay-bg);animation-duration:.3s;position:fixed;inset:0}.gmal-alert{z-index:1;background:var(--gmal-alert-bg);border-radius:16px;flex-direction:column;justify-content:space-between;width:94%;max-width:550px;min-height:172px;margin:0 auto;animation-duration:.25s;display:flex;position:fixed;top:45%;left:0;right:0;overflow:hidden;transform:translateY(-50%)}.gmal-alert .gmal-progress{pointer-events:none;opacity:0}.gmal-alert-btn-group{justify-content:center;margin-top:1rem;display:flex;position:relative}.gmal-alert-btn-group:after{border-top-width:1px!important}.gmal-alert-btn-group .gmal-alert-btn{cursor:pointer;background:0 0;border:0;width:100%;height:48px;padding:.8em 1em;font-size:1em;font-weight:500;position:relative}.gmal-alert-btn-group .gmal-alert-btn:nth-child(2):after{border-left-width:1px}.gmal-alert-btn-group .gmal-alert-btn:hover{background-image:linear-gradient(#0000000a,#0000000a)}.gmal-hairline:after{box-sizing:border-box;pointer-events:none;content:\" \";border:0 solid var(--gmal-border-c);position:absolute;inset:-50%;transform:scale(.5)}.gmal-alert-content{z-index:1;color:inherit;justify-content:center;padding:1.5em 1em;font-size:1.125em;display:flex;overflow:auto}.gmal-alert-title{color:inherit;text-align:center;max-width:100%;margin:0;padding:1em 1em 0;font-size:1.75em;font-weight:600;position:relative}@keyframes gmal-alert-in{0%{opacity:0;transform:translateY(-50%)scale(.6)}to{opacity:1;transform:translateY(-50%)scale(1)}}@keyframes gmal-alert-out{to{opacity:0;transform:translateY(-50%)scale(.6)}}@keyframes gmal-shake{0%{transform:translateY(-50%)}25%{transform:translate(-8px)translateY(-50%)}50%{transform:translate(8px)translateY(-50%)}75%{transform:translate(-8px)translateY(-50%)}to{transform:translateY(-50%)}}@keyframes gmal-fade-out{to{opacity:0}}@keyframes gmal-fade-in{0%{opacity:0}to{opacity:1}}";

const EventHandler = {
  on(element, type, listener, options) {
    element.addEventListener(type, listener, options);
  },
  off(element, type, callback) {
    element.removeEventListener(type, callback);
  }
};

const noop = () => {};
const isServer = () => typeof window === 'undefined';
const doc = isServer() ? undefined : window.document;

function cn(className) {
  return `gmal-${className}`;
}
function newEl(tag, ...className) {
  if (!doc) return {};
  const $el = doc.createElement(tag);
  $el.classList.add(...className);
  return $el;
}
function newDiv(...className) {
  return newEl('div', ...className);
}
function getContainer() {
  let $root = querySelector(`.gmal`);
  if (!$root) {
    $root = newDiv('gmal');
    doc?.body.append($root);
  }
  return $root;
}

// 用于修改样式的工具类，并且可以减少回流重绘，后面代码中会频繁用到
function changeStyle(el, arr) {
  const original = el.style.cssText.split(';');
  original.pop();
  el.style.cssText = `${original.concat(arr).join(';')};`;
}

// 用于重置样式
function resetStyle(el, arr) {
  arr.forEach(item => {
    el.style.removeProperty(item);
  });
}

// 用于设置滚动条
function bodyScroll(lock = true) {
  if (!doc) return;
  const $body = doc.body;
  if (lock) {
    // set padding
    changeStyle($body, ['overflow: hidden', `padding-right: ${window.innerWidth - doc.documentElement.clientWidth}px`]);
  } else {
    resetStyle($body, ['overflow', 'padding-right']);
  }
}

// 用于获取元素
function querySelector(selector, $el = doc) {
  return $el.querySelector(selector);
}

// inject style
function injectStyle(css) {
  // SSR
  if (isServer()) {
    return;
  }
  let $style = querySelector(`#${cn('style')}`);
  if (!$style) {
    $style = newEl('style');
    $style.id = cn('style');
    document.head.append($style);
  }
  $style.innerHTML += css;
}

function animationendHandle($el, handle) {
  const animationend = e => {
    handle(e.animationName);
  };
  EventHandler.on($el, 'animationend', animationend);
}
function changeAnimation($el, animationName) {
  resetStyle($el, ['animation-name']);
  // 强制重绘
  // eslint-disable-next-line no-unused-expressions
  $el.offsetHeight;
  changeStyle($el, [`animation-name:${animationName}`]);
}

var main = ".gmal{z-index:2019;color:var(--gmal-text);word-break:normal;word-wrap:break-word;--gmal-text:#5a5a5a;height:0;font:16px/1.3 Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Heiti SC,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;position:fixed}.gmal *{box-sizing:border-box}.gmal-close{cursor:pointer;opacity:.3;border-radius:5px;font-size:1.5em;transition:all .2s;display:flex}.gmal-close:hover{background:var(--gmal-border-c);opacity:.5}.gmal-progress{position:absolute;inset:0;overflow:hidden}.gmal-progress .gmal-progress-bar{background:var(--gmal-bar-bg);width:0;height:100%;display:flex}";

injectStyle(main);
/**
 * 消息容器
 */
class Msg {
  conf = {
    timeout: 2500
  };
  id = 0;
  insts = (() => new Map())();
  constructor(core, conf) {
    this.conf = {
      ...this.conf,
      ...conf
    };
    this.core = core;
  }
  config(config) {
    this.conf = {
      ...this.conf,
      ...config
    };
  }
  fire(conf) {
    const oMsg = this.mkMsg(conf);
    this.sT(oMsg, conf?.timeout);
    return oMsg;
  }

  // 设置定时
  sT(oMsg, timeout) {
    if (timeout === 0) return;
    timeout = timeout || this.conf.timeout;
    const {
      $el
    } = oMsg;
    const p = this.mkP(oMsg, timeout);
    p.resume();
    $el.onmouseenter = p.pause;
    $el.onmouseleave = p.resume;
  }

  // 设置进度
  mkP(oMsg, timeout) {
    const {
      $el
    } = oMsg;
    const $progress = newDiv(cn('progress'));
    const $progressBar = newDiv(cn('progress-bar'));
    $progress.append($progressBar);
    $el.append($progress);
    $progressBar.ontransitionend = () => {
      oMsg.close(-1);
    };
    const get = () => {
      return $progressBar.clientWidth / $progress.clientWidth;
    };
    const pause = () => {
      changeStyle($progressBar, ['transition:none', `width:${get() * 100}%`]);
    };
    const resume = () => {
      changeStyle($progressBar, ['width:100%', `transition:width ${timeout * (1 - get())}ms linear`]);
    };
    return oMsg.progress = {
      pause,
      resume
    };
  }

  // 关闭多余消息, 打开新消息
  mkMsg(conf) {
    const id = this.id++;
    const props = {
      ...this.conf,
      ...conf,
      content: conf.content || '',
      onClosed: status => {
        conf?.onClosed && conf.onClosed(status);
      },
      beforeClose: async status => {
        if (conf?.beforeClose) {
          const res = await conf.beforeClose(status);
          if (!res) return false;
        }
        this.insts.delete(id);
        return true;
      }
    };
    const inst = this.core(props);

    // 重定义open和close方法
    let opened = false;
    const open = () => {
      if (opened) return;
      opened = true;
      inst.open();
    };

    // 设置样式
    if (props.className) {
      inst.$el.classList.add(...props.className);
    }
    if (props.style) {
      changeStyle(inst.$el, props.style);
    }

    // 关闭其他消息
    const nextInst = this.insts.values().next().value;
    if (nextInst) {
      nextInst.progress?.pause();
      nextInst.close(-2);
    }
    const oMsg = {
      ...inst,
      open
    };
    this.insts.set(id, oMsg);
    open();
    return oMsg;
  }
}
function getArgs(args) {
  const result = {};
  let firstStr = false;
  const assignArg = arg => {
    switch (typeof arg) {
      case 'string':
        if (firstStr) {
          result.text = arg;
        } else {
          result.content = arg;
          firstStr = true;
        }
        break;
      case 'number':
        result.timeout = arg;
        break;
      case 'object':
        Object.assign(result, arg);
        break;
    }
  };
  for (let index = 0; index < 4; index++) {
    const element = args[index];
    assignArg(element);
  }
  return result;
}
function MakeMsg(core, callback, conf) {
  if (isServer()) {
    const empty = () => {};
    empty.config = noop;
    return empty;
  }
  callback();
  const $msg = new Msg(core, conf);
  const res = (...args) => {
    return $msg.fire(getArgs(args));
  };
  res.config = $msg.config.bind($msg);
  return res;
}

function SpinIcon(size = '1em') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><g stroke="currentColor"><circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="2"><animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/></circle><animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></g></svg>`;
}

function Button(text, onClick) {
  const $btn = newEl('button', cn('hairline'));
  $btn.textContent = text;
  let isPending = false;
  $btn.onclick = async () => {
    if (isPending) return;
    isPending = true;
    // 优化点击后的体验
    setTimeout(() => {
      if (isPending) $btn.innerHTML = SpinIcon('1.4em');
    }, 50);
    await onClick();
    $btn.textContent = text;
    isPending = false;
  };
  $btn.classList.add(cn('alert-btn'));
  return $btn;
}

// 0 已经关闭 1 关闭中 2 打开中 3 已经打开
let overLayStatus = 0;
function overLaySwitch(open) {
  let $overlay = querySelector(`.${cn('overlay')}`);
  if (!$overlay) {
    $overlay = newDiv(cn('overlay'));
    getContainer().append($overlay);
    animationendHandle($overlay, e => {
      if (e === cn('fade-in')) {
        overLayStatus = 3;
      }
      if (e === cn('fade-out')) {
        overLayStatus = 0;
        bodyScroll(false);
        changeStyle($overlay, ['display: none']);
      }
    });
  }
  if (open) {
    if (overLayStatus > 1) {
      return $overlay;
    }
    bodyScroll();
    overLayStatus = 2;
    changeAnimation($overlay, cn('fade-in'));
    changeStyle($overlay, ['display: block']);
  } else {
    if (overLayStatus < 2) {
      return $overlay;
    }
    overLayStatus = 1;
    changeAnimation($overlay, cn('fade-out'));
  }
  return $overlay;
}
function GmAlert(props) {
  const $wrapper = newDiv(cn('alert'));
  let isPending = false;
  if (props.content) {
    $wrapper.innerHTML = `<div class="${cn('alert-title')}">${props.content}</div>`;
  }
  if (props.text || props.html) {
    const $text = newDiv(cn('alert-content'));
    if (props.html) {
      if (typeof props.html === 'string') {
        $text.innerHTML = props.html;
      } else {
        $text.append(props.html);
      }
    } else {
      $text.textContent = props.text;
    }
    $wrapper.append($text);
  }
  let overlayClick;
  const shake = () => {
    changeAnimation($wrapper, cn('shake'));
  };
  const close = async status => {
    if (isPending) {
      shake();
      return;
    }
    isPending = true;
    const ifColose = await props.beforeClose(status);
    if (!ifColose) {
      isPending = false;
      shake();
      return;
    }
    const $overlay = querySelector(`.${cn('overlay')}`);
    if (status !== -2) {
      overLaySwitch(false);
    }
    EventHandler.off($overlay, 'click', overlayClick);
    changeAnimation($wrapper, cn('alert-out'));
    return new Promise(resolve => {
      animationendHandle($wrapper, e => {
        if (e === cn('alert-out')) {
          $wrapper.remove();
          props.onClosed(status);
          resolve();
        }
      });
    });
  };
  overlayClick = () => {
    close(-3);
  };
  const open = () => {
    EventHandler.on(overLaySwitch(true), 'click', overlayClick);
    getContainer().append($wrapper);
    changeAnimation($wrapper, cn('alert-in'));
  };
  if (props.cancelLabel || props.confirmLabel) {
    const $buttons = newDiv(cn('alert-btn-group'), cn('hairline'));
    props.cancelLabel && $buttons.append(Button(props.cancelLabel, async () => {
      await close(2);
    }));
    props.confirmLabel && $buttons.append(Button(props.confirmLabel, async () => {
      await close(1);
    }));
    $wrapper.append($buttons);
  }
  return {
    close,
    open,
    $el: $wrapper
  };
}
const alert = MakeMsg(GmAlert, () => {
  injectStyle(alertCss);
}, {
  timeout: 0,
  confirmLabel: '确定'
});

var msgCss = ".gmal{--gmal-msg-bg:#000000b3;--gmal-msg-c:#fff}.gmal-msg{z-index:2;width:max-content;margin:0 auto;animation-duration:.25s;position:fixed;top:45%;left:0;right:0;transform:translateY(-50%)}.gmal-msg .gmal-progress{pointer-events:none;opacity:0}.gmal-msg-main{box-sizing:border-box;color:var(--gmal-msg-c);background:var(--gmal-msg-bg);border-radius:4px;flex-direction:column;justify-content:center;align-items:center;min-width:100px;max-width:168px;padding:12px 15px;display:flex;position:relative}.gmal-msg-main .gmal-icon{margin:10px;font-size:1.8em;line-height:1;display:block}.gmal-msg-content{text-align:center}@keyframes gmal-alert-in{0%{opacity:0;transform:translateY(-50%)scale(.6)}to{opacity:1;transform:translateY(-50%)scale(1)}}@keyframes gmal-alert-out{to{opacity:0;transform:translateY(-50%)scale(.6)}}";

function GmMessage(props) {
  const $wrapper = newDiv(cn('msg'));
  const $main = newDiv(cn('msg-main'));
  $main.innerHTML = `<div class=${cn('msg-content')}>${props.content}</div>`;
  $wrapper.append($main);
  let icon = props.icon || '';
  if (icon === 'loading') {
    icon = SpinIcon();
  }
  const $icon = newDiv(cn('icon'));
  $icon.innerHTML = icon;
  icon && $main.prepend($icon);
  const open = () => {
    getContainer().append($wrapper);
    changeAnimation($wrapper, cn('alert-in'));
  };
  const close = async status => {
    await props.beforeClose(status);
    changeAnimation($wrapper, cn('alert-out'));
    return new Promise(resolve => {
      animationendHandle($wrapper, e => {
        if (e === cn('alert-out')) {
          $wrapper.remove();
          props.onClosed(status);
          resolve();
        }
      });
    });
  };
  return {
    open,
    close,
    $el: $wrapper
  };
}
const message = MakeMsg(GmMessage, () => {
  injectStyle(msgCss);
});

var ntcCss = ".gmal{--gmal-notice-bg:#e2e7ec;--gmal-notice-c:#333;--gmal-bar-bg:#0000000f}.gmal-notice{z-index:2;color:var(--gmal-notice-c);background:var(--gmal-notice-bg);animation-duration:.3s;position:fixed;left:0;right:0}.gmal-notice .gmal-notice-main{z-index:1;flex-direction:column;align-items:normal;display:flex;position:relative}.gmal-notice .gmal-notice-main .gmal-notice-content{text-align:center;padding:1.15em;font-weight:600}@keyframes gmal-open{0%{transform:translateY(var(--y))}to{transform:translateY(0)}}@keyframes gmal-close{0%{transform:translateY(0)}to{transform:translateY(var(--y))}}";

function GmNotice(props) {
  const $wrapper = newDiv(cn('notice'));
  changeStyle($wrapper, [props.bottom ? 'bottom:0' : 'top:0', props.bottom ? '--y:100%' : '--y:-100%', props.background ? `background:${props.background}` : '', props.color ? `color:${props.color}` : '']);
  $wrapper.innerHTML = `<div class="${cn('notice-main')}"><div class="${cn('notice-content')}">${props.content}</div></div>`;
  const open = () => {
    getContainer().append($wrapper);
    changeAnimation($wrapper, cn('open'));
  };
  const close = async status => {
    await props.beforeClose(status);
    changeAnimation($wrapper, cn('close'));
    return new Promise(resolve => {
      animationendHandle($wrapper, animationName => {
        if (animationName === cn('close')) {
          $wrapper.remove();
          props.onClosed(status);
          resolve();
        }
      });
    });
  };
  return {
    open,
    close,
    $el: $wrapper
  };
}
const notice = MakeMsg(GmNotice, () => {
  injectStyle(ntcCss);
});

export { alert, message, notice };
