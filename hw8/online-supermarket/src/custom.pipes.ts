import { PipeTransform, Injectable, ArgumentMetadata, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerNotFoundException, OrderNotFoundException } from './custom.exceptions';

@Injectable()
export class CheckOrderExistencePipe implements PipeTransform {
  constructor(private readonly appService: AppService, private readonly parseIntPipe: ParseIntPipe) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const orderId = await this.parseIntPipe.transform(value, metadata);

    const entityExists = await this.appService.CheckIfExists('Order', orderId);

    if (!entityExists) {
      throw new OrderNotFoundException(orderId);
    }

    return orderId;
  }
}


export class CheckCustomerExistencePipe implements PipeTransform {
    constructor(private readonly appService: AppService, private readonly parseIntPipe: ParseIntPipe) {}

    async transform(value: any, metadata: ArgumentMetadata) {
      const customerId = await this.parseIntPipe.transform(value, metadata);
  
      const entityExists = await this.appService.CheckIfExists('Customer', customerId);
  
      if (!entityExists) {
        throw new CustomerNotFoundException(customerId);
      }
  
      return customerId;
    }
}


export class CheckEmployeeExistencePipe implements PipeTransform {
    constructor(private readonly appService: AppService) {}

    async transform(value: number, metadata: ArgumentMetadata) {    
        const entityExists = await this.appService.CheckIfExists('Employee', value);
    
        if (!entityExists) {
          throw new CustomerNotFoundException(value);
        }
    
        return value;
    }
}

