type IndexType = string | number | symbol
type BasicType = string | number | boolean | undefined | null | symbol
export type BasicObject<K extends IndexType = string, V = unknown> = Record<K, V>
export interface PlainNode extends BasicObject {
  id: number
}
export interface TreeNode extends BasicObject {
  key: string,
  children?: this[]
}
export interface BasicObjectData<T> {
  list: T,
  total: number
}