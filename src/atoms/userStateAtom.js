import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';


const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // This key is used as a prefix in localStorage
  storage: localStorage, // Configuration for localStorage (default)
});


const userState = atom({
  key: 'userState', // Unique ID for the atom
  default: false, // Default value (initial state)
  effects_UNSTABLE: [persistAtom], // Attach the persist effect
});

export default userState;