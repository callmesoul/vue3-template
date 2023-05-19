declare interface Pagination {
  page: number
  pageSize: number
  loading?: boolean
  nothing?: boolean
  totalPages?: number
  isRefreshing?: boolean
  refreshing?: boolean
  [key: string]: any
}
