// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss'

const shortcuts = {
  'flex-center': 'flex items-center justify-center',
}

export default defineConfig({
  safelist: Object.keys(shortcuts),
  shortcuts,
  theme: {
    colors: {
      'main': 'var(--gmc-main)',
      'main-b': 'var(--gmc-main-b)',
      'second': 'var(--gmc-second)',
      'third': 'var(--gmc-third)',
      'body': 'var(--gmc-body)',
      'border': 'var(--gmc-border)',
      'hl': 'var(--gmc-hl)',
      'hover': 'var(--gmc-hover)',
      'heavy': 'var(--gmc-heavy)',
      'text': 'var(--gmc-text)',
      'text-2': 'var(--gmc-text-2)',
      'quote': 'var(--gmc-quote)',
      'bg': 'var(--gmc-bg)',
    },
  },
  rules: [
    // 添加一个规则来重置 input 元素的样式
    ['reset-input', {
      'all': 'unset',
      'box-sizing': 'border-box',
      'appearance': 'none',
      '-webkit-appearance': 'none',
      'outline': 'none',
    }],
  ],
  variants: [
    // 通用变体处理器
    (matcher: any) => {
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      const regex = /^data-([\w-]+)=?(\w*):/
      const match = matcher.match(regex)

      // 如果没有匹配到 data-xxx: 前缀，返回原始 matcher
      if (!match)
        return matcher

      // 提取 data- 后的属性名和可选的值部分
      const attribute = match[1]
      const value = match[2] ? match[2].trim() : null

      // 返回修改后的 matcher 和 selector
      return {
        matcher: matcher.replace(regex, ''),
        selector: s => value
          ? `${s}[data-${attribute}="${value}"]` // 匹配指定属性名和值
          : `${s}[data-${attribute}]`, // 仅匹配指定属性名
      }
    },
  ],
  presets: [presetUno(), presetIcons()],
})
