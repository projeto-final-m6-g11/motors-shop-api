export interface ICreateAddress {
  cep: string;
  state: string;
  city: string;
  district: string;
  number: string;
  complement?: string;
}

export interface IUpdateAddress {
  cep?: string;
  state?: string;
  city?: string;
  district?: string;
  number?: string;
  complement?: string;
  id: string;
}
