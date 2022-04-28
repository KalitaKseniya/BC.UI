export interface User{
  id: string,
  userName: string,
  email: string,
  firstName: string,
  secondName: string,
  role: string
}

export interface UserForCreationDto{
  email: string,
  firstName: string,
  secondName: string,
  password: string,
  passwordConfirm: string,
  role: string
}

export interface UserForUpdateDto{
  email: string,
  firstName: string,
  secondName: string,
}

export interface Role{
  id: string,
  name: string
}

export interface PasswordChangeDto{
  oldPassword: string,
  newPassword: string
}

export interface UserForAuthenticationDto{
  email: string
  password: string
}

export interface ServerAuthResponse{
  minutesToExpire: number,
  role: string,
  token: string
}

export interface Part{
  id: string,
  name: string,
}

export interface Manufacturer{
  id: string,
  name: string,
}

export interface PartDto{
  name: string,
}

export interface ManufacturerDto{
  name: string,
}

export interface PartModel{
  id: string,
  name: string,
  part: Part,
  manufacturer: Manufacturer,
  price: number,
  availableQuantity: number,
  imageUrl: string
}

export interface PartModelForCreationOrUpdateDto{
  name: string,
  partId: string,
  manufacturerId: string,
  price: number,
  availableQuantity: number,
  imageUrl: string
}
