import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";
import { ICreateAddress } from "../interfaces/address.interfaces";

export const createAddress = async (address: ICreateAddress) => {
  const { cep, state, city, district, number, complement } = address;

  const addressesRepository = AppDataSource.getRepository(Address);

  if (!complement) {
    const addressToRegister = {
      cep,
      state,
      city,
      district,
      number,
    };

    addressesRepository.create(addressToRegister);
    const newAddress = await addressesRepository.save(addressToRegister);

    return newAddress;
  }

  const addressToRegister = {
    cep,
    state,
    city,
    district,
    number,
    complement,
  };

  addressesRepository.create(addressToRegister);
  const newAddress = await addressesRepository.save(addressToRegister);

  return newAddress;
};
