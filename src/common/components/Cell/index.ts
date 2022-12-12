import CellComponent, { type CellProps } from './cell'
import CellGroup from './Group'

interface ICell {
  (props: CellProps): JSX.Element
  Group: typeof CellGroup
}

const Cell = CellComponent as ICell

Cell.Group = CellGroup

export default Cell
