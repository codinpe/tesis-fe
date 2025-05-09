// src/data/users.ts
export type UserRecord = {
    id: string;
    email: string;
    password: string;
    name: string;
  };
  
  export const users: UserRecord[] = [
    { id: "1", email: "ana@company.com", password: "Ana12345", name: "Ana Gómez" },
    { id: "2", email: "luis@company.com", password: "Luis54321", name: "Luis Pérez" },
    { id: "3", email: "maria@company.com", password: "Mari4Pass", name: "María López" },
  ];
  