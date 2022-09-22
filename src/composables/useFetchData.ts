import axios, { AxiosResponse } from 'axios'
import { ref } from 'vue'

export const useFetchData = async (url: string, config = {}) => {
  const data = ref<unknown>()
  const response = ref<AxiosResponse>()
  const error = ref<unknown>()
  const loading = ref<boolean>(false)

  const fetchData = async () => {
    loading.value = true
    try {
      const result = await axios.request({
        url,
        ...config
      })

      response.value = result
      data.value = result.data
    } catch (exception: unknown) {
      error.value = exception
    } finally {
      loading.value = false
    }
  }

  await fetchData();

  return {
    data,
    response,
    error,
    loading
  }
}
