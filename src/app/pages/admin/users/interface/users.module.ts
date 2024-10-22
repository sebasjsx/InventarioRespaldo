export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    phone: string;
    profileId: number;
    username: string;
    surname: string;
    status: boolean;
}

export interface UserRegister {
    id?: number | null;
    name: string;
    email: string;
    age: number | null;
    phone: string;
    username: string;
    surname: string;
    status?: boolean;
    resource?: string[]; 
}

export interface UserData {
    message: string;
    data: {
      content: User[];
      totalElements: number;
    };
}

