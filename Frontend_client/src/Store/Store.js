import create from 'zustand'

const Store = (set, get) => ({
  textWhite: '#ffffff',
  success: false
})

const useStore = create(Store)

export default useStore
