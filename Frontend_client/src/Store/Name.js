import create from 'zustand'

const useName = create(set => ({
    names: "",
    addNames: (getname) => set(state => ({ names: getname })),
}));

export default useName