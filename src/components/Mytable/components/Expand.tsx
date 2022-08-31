import { VNodeChild } from 'vue'
type IProp = {
    render: (row: Record<string, any>, index: number) => VNodeChild
    row: Record<string, any>
    index: number
}
const renderDom = (props: IProp) => {
    const { row, index, render } = props
    return render && render(row, index)
}
export default renderDom
