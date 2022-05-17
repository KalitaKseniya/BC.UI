import { Injectable } from '@angular/core';
import { Provider } from '../interfaces';
import { DeliveryOrderPartModelForDisplay } from '../models/part-models/deliveryOrderPartModelForDisplay';

@Injectable({
  providedIn: 'root'
})
export class DeliveryOrderCalculationService {

  constructor() { }

  isWeightAllowed(provider: Provider, partModels: DeliveryOrderPartModelForDisplay []): boolean {
    let totalWeight = this.calculateTotalWeight(partModels);
    return totalWeight >= provider.minWeightInKgToDeliver;
  }

  calculateTotalPrice(provider: Provider, partModels: DeliveryOrderPartModelForDisplay []){
    let deliveryPrice = this.calculateDeliveryPrice(provider, partModels);
    let partModelsPrice = this.calculatePartModelsPrice(partModels);

    return deliveryPrice + partModelsPrice;
  }

  calculateDeliveryPrice(provider: Provider, partModels: DeliveryOrderPartModelForDisplay []) {
    let totalWeight = this.calculateTotalWeight(partModels);

    let deliveryPrice  = totalWeight * provider.pricePerKg;
    
    return deliveryPrice;
  }

  calculatePartModelsPrice(partModels: DeliveryOrderPartModelForDisplay []) {
    let partModelsPrice = 0
    
    partModels.forEach(pm => {
      partModelsPrice += pm.purchasePrice * pm.quantity;
    });
    
    return partModelsPrice;
  }

  calculateTotalWeight(partModels: DeliveryOrderPartModelForDisplay []){
    let totalWeight = 0
    
    partModels.forEach(pm => {
      totalWeight += pm.weightInKg * pm.quantity; 
    });

    return totalWeight;
  }
}
