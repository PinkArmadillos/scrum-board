import { createContext } from 'react';

export const userContext = createContext({ user: {}, setUser: () => { } });
export const teamContext = createContext({ team: 0, setTeam: () => { } });