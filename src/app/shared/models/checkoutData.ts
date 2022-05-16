import { DeliveryOrderPartModelForDisplay } from './part-models/deliveryOrderPartModelForDisplay';
import { Provider } from 'src/app/shared/interfaces';

export interface CheckoutData { 
    provider: Provider;
    partModels: Array<DeliveryOrderPartModelForDisplay>;
}