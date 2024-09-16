import { Paginator } from 'jige-ui'
import { isNumber } from 'radash'
import { Show, createMemo } from 'solid-js'

import './paginator.scss'

function Pager(props: {
  page: number
  currPage: number
  onPageClick: (page: number) => void
}) {
  const isCurrent = createMemo(() => props.page === props.currPage)
  return (
    <div
      classList={{
        'hover:bg-hover px-2 py-1 cursor-pointer h-full flex-center': true,
        'bg-third c-text': isCurrent(),
        'c-text-2': !isCurrent(),
      }}
      onClick={() => { !isCurrent() && props.onPageClick(props.page) }}
    >
      {props.page}
    </div>
  )
}

function PagerBlank(props: { onPageClick: (page: number) => void, left: boolean, currPage: number }) {
  return (
    <div
      class="px-2 py-1 cursor-pointer h-full flex-center"
      onClick={() => {
        props.onPageClick(props.left ? props.currPage - 2 : props.currPage + 2)
      }}
    >
      <div classList={{
        'i-ri-more-fill': true,
        'hover:i-ri-arrow-left-double-line': props.left,
        'hover:i-ri-arrow-right-double-line ': !props.left,
      }}
      />
    </div>
  )
}

export default function GmPaginator(props: {
  currPage: number
  total: number
  pageSize: number
  onPageClick: (page: number) => void
  hideOnSinglePage?: boolean
}) {
  return (
    <div
      class="flex-center b rounded-md b-border paginator text-sm h-28px select-none"
      classList={{
        'op-0': props.hideOnSinglePage && props.total <= props.pageSize,
      }}
    >
      <Paginator {...props}>
        <Paginator.Pager>
          {(page) => {
            return (
              <Show
                when={isNumber(page)}
                fallback={(
                  <PagerBlank
                    onPageClick={props.onPageClick}
                    left={page === 'space-left'}
                    currPage={props.currPage}
                  />
                )}
              >
                <Pager page={page as number} {...props} />
              </Show>
            )
          }}
        </Paginator.Pager>
      </Paginator>
    </div>
  )
}
