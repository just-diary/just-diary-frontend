// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss'

const shortcuts = {
  'b-c': 'b-gray-3 dark:b-dark-3',
  'c-main': 'text-gray-9 dark:text-gray-3',
  'c-reverse': 'text-white dark:text-black',
  'c-fade': 'text-gray-9/50 dark:text-gray-3/50',
  'bg-main': 'bg-gray-1 dark:bg-dark-200',
  'bg-second': 'bg-white dark:bg-dark',
  'bg-third': 'bg-[#e1e1e1] dark:bg-[#555]',
  'bg-hover': 'bg-gray-2 dark:bg-[#7b7b7b]',
  'bg-theme': 'bg-theme dark:bg-themeDark',
  'c-theme': 'text-theme dark:text-themeDark',
}

export default defineConfig({
  safelist: Object.keys(shortcuts),
  shortcuts,
  theme: {
    colors: {
      theme: '#375a7f',
      // dark
      themeDark: '#007bff',
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
