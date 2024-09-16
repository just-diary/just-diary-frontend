import { Table } from 'jige-ui'
import { For, Show } from 'solid-js'
import type { DataType, HeaderType } from 'jige-ui'
import type { JSX } from 'solid-js'

import { GmContextMenu } from '../GmContextMenu'
import GmPaginator from '../GmPaginator'
import GmScroll from '../GmScroll'
import { processData } from './mapper-utils'
import type { TableMapper } from './mapper-utils'
import './table.scss'

function Loading() {
  return (
    <div class="absolute left-0 top-0 w-full h-full flex-center backdrop-blur-2 bg-main-b z-2">
      <div class="i-ri-loader-2-line text-30px animate-spin c-hl op-85" />
    </div>
  )
}

function TH(props: { head: HeaderType }) {
  return (
    <th colspan={props.head.colspan} rowspan={props.head.rowspan} class="b-b b-r bg-quote b-border">
      {props.head.data}
    </th>
  )
}

function TableMain(props: { data: DataType[], height?: string, maxHeight?: string, rowActions?: (row: DataType) => JSX.Element }) {
  let ref!: HTMLDivElement

  return (

    <Show
      when={props.data?.length}
      fallback={(
        <div class="color-text-2 w-full flex-center flex-col h-full py-8 select-none">
          <div class="i-ri-archive-line w-50px h-50px" />
          <div>
            暂无数据
          </div>

        </div>
      )}
    >
      <Table data={props.data} class="h-full">
        <Table.Head ref={ref}>
          {head => <TH head={head} />}
        </Table.Head>

        <GmScroll
          height={props.height}
          maxHeight={props.maxHeight}
          onScroll={(e) => {
            if (ref) {
              ref.scrollLeft = e.target.scrollLeft
            }
          }}
        >
          <Table.Body>
            {(row) => {
              return (
                <Show
                  when={props.rowActions}
                  fallback={(
                    <tr class="hover:bg-hover">
                      <For each={Object.keys(row)}>
                        {key => (
                          <td class="b-b b-r b-border p-1 break-words">
                            <div>{row[key]}</div>
                          </td>
                        )}
                      </For>
                    </tr>
                  )}
                >
                  <GmContextMenu>
                    <GmContextMenu.Trigger as="tr" class="hover:bg-hover">
                      <For each={Object.keys(row)}>
                        {key => (
                          <td class="b-b b-r b-border p-1 break-words">
                            <div>{row[key]}</div>
                          </td>
                        )}
                      </For>
                    </GmContextMenu.Trigger>
                    <GmContextMenu.Content>
                      {props.rowActions!(row)}
                    </GmContextMenu.Content>
                  </GmContextMenu>
                </Show>

              )
            }}
          </Table.Body>
        </GmScroll>
      </Table>
    </Show>
  )
}

export function GmTable(props: {
  data: DataType[]
  mapper?: TableMapper
  pagination?: {
    total: number
    pageSize: number
    onPageClick: (page: number) => void
    currPage: number
  }
  loading?: boolean
  height?: string
  maxHeight?: string
  rowActions?: (row: DataType) => JSX.Element
}) {
  return (
    <div>
      <div class="table-wrapper min-h-100px bg-second">
        <Show when={props.loading}>
          <Loading />
        </Show>
        <div class="table-inner">
          <TableMain
            data={processData(props.data, props.mapper)}
            height={props.height}
            maxHeight={props.maxHeight}
            rowActions={props.rowActions}
          />
        </div>
      </div>
      <Show when={props.pagination}>
        <div class="flex items-center justify-between px-2 py-1 b b-t-none b-border bg-quote">
          <div class="flex-center c-text-2">
            <span>
              共
              {props.pagination!.total}
              条数据
            </span>
          </div>
          <GmPaginator {...props.pagination!} hideOnSinglePage />
        </div>
      </Show>
    </div>
  )
}
