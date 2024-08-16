import { useLocation } from '@solidjs/router'
import { FloatingUiPort } from 'jige-ui'
import GmTooltip from '../components/GmTooltip'
import GmButton from '~/components/GmButton'
import useAppState from '~/states/app-state'
import GmSlider from '~/components/GmSlider'

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

        <FloatingUiPort placement="right" trigger="click">
          <FloatingUiPort.Trigger>
            <GmButton variant="ghost">
              <div class="flex i-ri-settings-5-fill w-[25px] h-[25px]" />
            </GmButton>
          </FloatingUiPort.Trigger>
          <FloatingUiPort.Content zindex={1} class="rounded drop-shadow p-2 bg-white dark:bg-[#111] dark:text-white m-2 ml-0 ani-tips">
            <div class="flex flex-col p-2">
              <div class="mb-1">
                <span>主题设置</span>
                (
                <span>
                  hue:
                  {' '}
                  {state.hue}
                </span>
                )

              </div>
              <div class="w-200px">
                <GmSlider
                  max={360}
                  value={state.hue}
                  step={5}
                  onChange={
                    (v) => {
                      actions.setHue(v)
                    }
                  }
                />
              </div>
            </div>
            <FloatingUiPort.Arrow class="bg-white dark:bg-[#111] dark:text-white" size={8} />
          </FloatingUiPort.Content>

        </FloatingUiPort>
      </div>

    </nav>
  )
}
