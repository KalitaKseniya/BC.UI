export interface PartForCreate {
  name: string,
  partModelId?: string,
  partModelName: string,
  amount?: number,
  pricePerDetail?: number
}

export interface BicycleForCreate {
  id?: string,
  model: string,
  serialNumber: string
}

export interface AddressForCreate {
  addressLine1: string,
  addressLine2: string,
}

export interface ProblemForCreateOrUpdateModel {
  bicycle: BicycleForCreate,
  userId?: string,
  userEmail: string,
  address: AddressForCreate,
  place: string,
  description: string,
  parts: PartForCreate[]
}
