export interface ICreateUserRequest {
  body: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birthdate: string;
    bio: string;
    password: string;
    isAdvertiser: boolean
    isAdm: boolean
    address: {
      cep: string;
      state: string;
      city: string;
      street: string;
      number: string;
      complement?: string;
    };
  };
}

export interface IUpdateUserRequest {
  body: {
    name?: string;
    email?: string;
    cpf?: string;
    phone?: string;
    birthdate?: string;
    bio?: string;
    password?: string;
    id: string;
  };
}

export interface ILoginRequest {
  body: {
    email: string;
    password: string;
  };
}
