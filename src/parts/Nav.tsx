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
        <a href={props.path} class={`transition-all duration-200 group items-center justify-center flex rounded-50% ${active('bg-hl rounded-lg', 'bg-third hover:bg-light hover:rounded-lg')}  lh-none w-48px h-48px`}>
          <div class={`flex ${props.icon} w-[25px] h-[25px] ${active('text-white', 'c-hl')} group-hover:text-white`} />
        </a>
      </GmTooltip>
    </div>
  )
}

export default function Nav() {
  const [state, actions] = useAppState()
  return (
    <nav class="bg-main fixed left-0 h-full w-60px b-r b-[var(--gmc-border)] z-1 flex flex-col justify-between">
      <div class="flex flex-col items-center py-3 text-gray-200 gap-2">
        <NavItem path="/" icon="i-ri-home-4-line" label="主页" />
        <NavItem path="/about" icon="i-ri-quill-pen-line" label="写日记" />
      </div>
      <div class="flex flex-col items-center py-3 text-gray-200 gap-2">
        <GmButton variant="ghost" onClick={() => { actions.setIsDark(!state.isDark) }}>
          <div class="flex i-ri-contrast-2-line w-[25px] h-[25px]" />
        </GmButton>
      </div>

    </nav>
  )
}
