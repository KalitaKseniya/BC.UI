import { Manufacturer, Part } from "../../interfaces";

export interface DeliveryOrderPartModelForDisplay{
  id: string,
  name: string,
  part: Part,
  manufacturer: Manufacturer,
  purchasePrice: number,
  quantity: number,
  imageUrl: string,
  isChecked: boolean
}
