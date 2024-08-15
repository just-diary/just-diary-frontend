// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss'

const shortcuts = {
  'c-text': 'text-[var(--gmc-text)]',
  'c-text-2': 'text-[var(--gmc-text-2)]',
  'c-heavy': 'text-[var(--gmc-heavy)]',
  'bg-body': 'bg-[var(--gmc-body)]',
  'bg-main': 'bg-[var(--gmc-main)]',
  'bg-second': 'bg-[var(--gmc-second)]',
  'bg-third': 'bg-[var(--gmc-third)]',
  'bg-hover': 'bg-[var(--gmc-hover)]',
  'bg-hl': 'bg-[var(--gmc-hl)]',
  'bg-light': 'bg-[var(--gmc-light)]',
  'c-hl': 'text-[var(--gmc-hl)]',
}

export default defineConfig({
  safelist: Object.keys(shortcuts),
  shortcuts,
  theme: {

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
    (matcher) => {
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
