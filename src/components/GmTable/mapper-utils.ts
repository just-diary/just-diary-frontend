export interface TableMapper {
  [key: string]: string | { replace: string, width?: number, slot?: (data: any) => any, hide?: boolean }
}

export interface NormalizedMapper {
  [key: string]: { replace: string, width?: number, slot?: (data: any) => any, hide?: boolean }
}

export function normalizeMapper(mapper: TableMapper): NormalizedMapper {
  const normalizedMapper: NormalizedMapper = {}
  for (const key in mapper) {
    const replacer = mapper[key as keyof typeof mapper]
    if (typeof replacer === 'object') {
      normalizedMapper[key] = replacer
    }
    else {
      normalizedMapper[key] = { replace: replacer }
    }
  }

  return normalizedMapper
}

export function processData(data: any[], mapper?: TableMapper) {
  if (!mapper) {
    return data
  }
  return data.map((item: any) => {
    const newItem: any = {}
    for (const key in mapper) {
      const replacer = mapper[key as keyof typeof mapper]
      if (typeof replacer === 'object') {
        if (!replacer.hide) {
          newItem[replacer.replace] = {
            data: replacer.slot?.(item[key]) || item[key],
            width: replacer.width,
          }
        }
      }
      else {
        newItem[replacer] = item[key]
      }
    }

    return newItem
  })
}

export function getCols(mapper: TableMapper | NormalizedMapper) {
  const cols: { label: string, keys: string[], hide: boolean }[] = []
  const normalizedMapper = normalizeMapper(mapper)
  for (const key in normalizedMapper) {
    const replacer = normalizedMapper[key as keyof typeof mapper]
    const label = replacer.replace.split('.')[0]

    const col = cols.find(col => col.label === label)
    if (col) {
      col.keys.push(key)
    }
    else {
      cols.push({ label, keys: [key], hide: replacer.hide || false })
    }
  }

  return cols
}
