import create from 'zustand'

const useImage = create(set => ({
    images: [],
    addImages: (getimage) => set(state => ({ images: getimage })),
}));

export default useImage