export default function createPropsParams(props: string[]): string {
  const params: Set<string> = new Set<string>()

  for (const prop of props) {
    const path = prop.split('.')
    let i = 0
    let param = 'props'
    while (i < path.length) {
      if (i === path.length - 1) {
        if (path[i] === '*') {
          param += '=true'
        } else {
          param += `[]=${path[i]}`
        }
      } else {
        param += `[${path[i]}]`
      }
      i++
    }
    params.add(param)
  }
  return Array.from(params).join('&')
}
