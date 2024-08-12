// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss'
const shortcuts = {
  'c-main': 'text-gray-900 dark:text-gray-300',
  'c-reverse': 'text-white dark:text-black',
  'c-fade': 'text-gray-900/50 dark:text-gray-300/50',
  'bg-main': 'bg-white dark:bg-dark-100',
  'bg-primary': 'bg-primary dark:bg-primaryDark',
  'bg-secondary': 'bg-secondary dark:bg-secondaryDark',
  'bg-danger': 'bg-danger dark:bg-dangerDark',
  'bg-success': 'bg-success dark:bg-successDark',
  'c-primary': 'text-primary dark:text-primaryDark',
  'c-secondary': 'text-secondary dark:text-secondaryDark',
  'c-danger': 'text-danger dark:text-dangerDark',
  'c-success': 'text-success dark:text-successDark',
}

export default defineConfig({
  safelist: Object.keys(shortcuts),
  shortcuts,
  theme: {
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      danger: '#dc3545',
      success: '#28a745',
      // dark
      primaryDark: '#375a7f',
      secondaryDark: '#444c56',
      dangerDark: '#bd2130',
      successDark: '#218838',
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
      const regex = /^data-([\w-]+)=?([\w]*):/
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
