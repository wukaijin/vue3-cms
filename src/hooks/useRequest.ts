/*
 * @Author: Carlos
 * @Date: 2023-01-27 16:53:29
 * @LastEditTime: 2023-01-28 01:01:34
 * @FilePath: /vue3-cms/src/hooks/useRequest.ts
 * @Description: null
 */
import type { Service } from '@/types'
import type { Canceler } from 'axios'
import { toRefs, watch, reactive } from 'vue'
import type { UnwrapRef, WatchSource, ComputedRef } from 'vue'

interface RequestOptions<T, P extends any[]> {
  manual?: boolean
  defaultParameters?: P
  repeatCancel?: boolean
  refreshDeps?: WatchSource<any>[]
  refreshDepsParameters?: ComputedRef<P>
  onSuccess?: (response: T, params: P) => void
  onError?: (err: any, params: P) => void
}
export interface IRequestResult<T> {
  data?: T
  loading: boolean
  cancel?: Canceler
  error?: any
}

function useRequest<T, P extends any[]>(api: Service<T, P>, options?: RequestOptions<T, P>) {
  const {
    manual = false,
    defaultParameters = [] as unknown as P,
    repeatCancel = false,
    refreshDeps,
    refreshDepsParameters,
    onSuccess,
    onError
  } = options || {}

  const result = reactive<IRequestResult<T>>({
    data: undefined,
    loading: false,
    cancel: undefined,
    error: null
  })

  async function run(...args: P) {
    result.loading = true
    if (repeatCancel) {
      result.cancel && result.cancel()
    }
    const { instance, cancel } = api(...args)
    result.cancel = cancel.value
    return instance
      .then(res => {
        result.data = res.data.data as unknown as UnwrapRef<T>
        if (typeof onSuccess === 'function') {
          onSuccess(res.data.data, args)
        }
        return res.data.data
      })
      .catch(error => {
        if (typeof onError === 'function') {
          onError(error, args)
        }
        return Promise.reject(error)
      })
      .finally(() => {
        result.loading = false
      })
  }

  if (!manual) run(...defaultParameters)

  if (refreshDeps && refreshDeps.length) {
    watch(
      refreshDeps,
      () => {
        const args = refreshDepsParameters
          ? refreshDepsParameters.value
          : defaultParameters
          ? defaultParameters
          : ([] as unknown as P)
        run(...args)
      },
      { deep: true }
    )
  }

  return {
    run,
    ...toRefs(result)
  }
}

export default useRequest
