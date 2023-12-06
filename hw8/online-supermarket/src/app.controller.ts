import { Controller, Get, Patch, Delete, Post, Param, Body, Res, UsePipes, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import {
  OrderNotFoundException,
  CustomerNotFoundException,
  EmployeeNotFoundException,
  CategoryNotFoundException,
} from './custom.exceptions';
import {
  CheckOrderExistencePipe,
  CheckCustomerExistencePipe,
  CheckEmployeeExistencePipe,
} from './custom.pipes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService | undefined) {
    if (appService === undefined) {
      throw new Error('appService is undefined');
    }
  }

  @Get('/customers/:customerId/orders')
  @UsePipes(new CheckCustomerExistencePipe(new AppService(), new ParseIntPipe()))
  async getCustomerOrders(@Param('customerId') customerId: number, @Res() res: Response) {
    try {
      if (this.appService === undefined) {
        throw new Error('appService is undefined');
      }
      console.log('GET request');
      const result = await this.appService.getCustomerOrders(Number(customerId));
      res.status(HttpStatus.OK).json(result);
    } catch (err) {
      if (err instanceof CustomerNotFoundException) {
        throw new HttpException({ error: err.message }, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException({ error: err.message }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Patch('/employees/:employeeId')
  async updateEmployee(@Param('employeeId', new ParseIntPipe(), new CheckEmployeeExistencePipe(new AppService())) employeeId: number, @Body() updatedEmployee: any, @Res() res: Response) {
    try {
      console.log('PATCH request');
      const result = await this.appService.updateEmployee(Number(employeeId), updatedEmployee);
      res.status(HttpStatus.OK).json(result);
    } catch (err) {
      if (err instanceof EmployeeNotFoundException) {
        throw new HttpException({ error: err.message }, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException({ error: err.message }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Delete('/orders/:orderId')
  @UsePipes(new CheckOrderExistencePipe(new AppService(), new ParseIntPipe()))
  async deleteOrder(@Param('orderId') orderId: number, @Res() res: Response) {
    try {
      console.log('DELETE request');
      const result = await this.appService.deleteOrder(Number(orderId));
      res.status(HttpStatus.OK).json(result);
    } catch (err) {
      if (err instanceof OrderNotFoundException) {
        throw new HttpException({ error: err.message }, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException({ error: err.message }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Post('/products')
  async createProduct(@Body() newProduct: any, @Res() res: Response) {
    try {
      console.log('POST request');
      const result = await this.appService.createProduct(newProduct);
      res.status(HttpStatus.CREATED).json(result);
    } catch (err) {
      if (err instanceof CategoryNotFoundException) {
        throw new HttpException({ error: err.message }, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException({ error: err.message }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
