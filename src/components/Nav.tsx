import { useLocation } from '@solidjs/router'
import { Icon } from '@iconify-icon/solid'

function NavItem(props: { path: string, icon: string, _label: string }) {
  return (
    <li>
      <a href={props.path} class="group items-center justify-center flex rounded-lg bg-gray-100 hover:bg-blue lh-none w-48px h-48px">
        <Icon class="color-blue group-hover:color-white" icon={props.icon} width="25px" height="25px" />
      </a>
    </li>

  )
}

export default function Nav() {
  const location = useLocation()
  const active = (path: string) =>
    path === location.pathname
      ? 'border-sky-600'
      : 'border-transparent hover:border-sky-600'
  return (
    <nav class="bg-base fixed left-0 h-full w-60px b-r">
      <ul class="container flex flex-col items-center py-3 text-gray-200 gap-2">
        <NavItem path="/" icon="ri:home-4-line" _label="Home" />
        <NavItem path="/about" icon="ri:quill-pen-line" _label="About" />
      </ul>
    </nav>
  )
}
