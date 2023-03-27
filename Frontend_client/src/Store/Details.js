import create from 'zustand';

const useEmail = create(set => ({
    emails: "",
    addEmails: (getemail) => set(state => ({ emails: getemail })),
}));

const usePhone = create(set => ({
    phones: 0,
    addPhones: (getphone) => set(state => ({ phones: getphone })),
}));

export { useEmail, usePhone }