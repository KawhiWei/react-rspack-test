export interface IEntity<T> {
  id: T;
}

export interface IServerReturn<T> {
  result: T;
  success: boolean;
  errorMessage: string;
  type: number;
}

export interface IServerPageReturn<T> {
  /**
   * 总行数
   */
  total: number;

  /**
   * 数据数组
   */
  data: Array<T>
}