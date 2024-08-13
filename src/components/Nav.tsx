import { useLocation } from '@solidjs/router'
import { Icon } from '@iconify-icon/solid'
import GmTooltip from './GmTooltip'

function NavItem(props: { path: string, icon: string, _label: string }) {
  const location = useLocation()
  const active = (activeClass: string, fallbackClass: string) => {
    return location.pathname === props.path ? activeClass : fallbackClass
  }
  return (
    <li>
      <GmTooltip content={props._label} placement="right">
        <a href={props.path} class={`transition group items-center justify-center flex rounded-lg ${active('bg-blue', 'bg-gray-100')} hover:bg-blue lh-none w-48px h-48px`}>
          <Icon class={`transition ${active('color-white', 'color-blue')}  group-hover:color-white`} icon={props.icon} width="25px" height="25px" />
        </a>
      </GmTooltip>
    </li>
  )
}

export default function Nav() {
  return (
    <nav class="bg-second fixed left-0 h-full w-60px b-r z-1">
      <ul class="container flex flex-col items-center py-3 text-gray-200 gap-2">
        <NavItem path="/" icon="ri:home-4-line" _label="Home" />
        <NavItem path="/about" icon="ri:quill-pen-line" _label="About" />
      </ul>
    </nav>
  )
}
