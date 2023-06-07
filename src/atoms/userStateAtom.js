import { atom } from 'recoil';
export const userStateAtom = atom({
    key: 'userStateAtom',
    default: {
        name: '',
        email: '',
        role: 'Guest',
        isAuth: false,
    }
})