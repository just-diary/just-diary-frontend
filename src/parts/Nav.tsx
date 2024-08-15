import { useLocation } from '@solidjs/router'
import GmTooltip from '../components/GmTooltip'
import GmButton from '~/components/GmButton'
import useAppState from '~/states/app-state'

function NavItem(props: { path: string, icon: string, label: string }) {
  const location = useLocation()
  const active = (activeClass: string, fallbackClass: string) => {
    return location.pathname === props.path ? activeClass : fallbackClass
  }
  return (
    <div>
      <GmTooltip content={props.label} placement="right">
        <a href={props.path} class={`transition group items-center justify-center flex rounded-lg ${active('bg-theme', 'bg-third')} hover:bg-theme lh-none w-48px h-48px`}>
          <div class={`flex ${props.icon} w-[25px] h-[25px] ${active('text-white', 'c-theme')} group-hover:text-white`} />
        </a>
      </GmTooltip>
    </div>
  )
}

export default function Nav() {
  const [state, actions] = useAppState()
  return (
    <nav class="bg-second fixed left-0 h-full w-60px b-r b-c z-1 flex flex-col justify-between">
      <div class="flex flex-col items-center py-3 text-gray-200 gap-2">
        <NavItem path="/" icon="i-ri-home-4-line" label="Home" />
        <NavItem path="/about" icon="i-ri-quill-pen-line" label="About" />
      </div>
      <div class="flex flex-col items-center py-3 text-gray-200 gap-2">
        <GmButton variant="ghost" onClick={() => { actions.setIsDark(!state.isDark) }}>
          <div class="flex i-ri-contrast-2-line w-[25px] h-[25px]" />
        </GmButton>
      </div>

    </nav>
  )
}
