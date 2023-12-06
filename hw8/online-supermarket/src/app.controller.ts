import { Controller, Get, Patch, Delete, Post, Param, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import {
  OrderNotFoundException,
  CustomerNotFoundException,
  EmployeeNotFoundException,
  CategoryNotFoundException,
} from './custom.exceptions';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/customers/:customerId/orders')
  async getCustomerOrders(@Param('customerId') customerId: number, @Res() res: Response) {
    try{
    console.log('GET request');
    let result =  await this.appService.getCustomerOrders(Number(customerId));
    res.status(200).json(result);
    }catch(err){
      if (err instanceof CustomerNotFoundException) {
        res.status(err.getStatus()).json({ error: err.message });
      }else{
        res.status(500).json({ error: err.message });
      }
    }
  }

  @Patch('/employees/:employeeId')
  async updateEmployee(@Param('employeeId') employeeId: number, @Body() updatedEmployee: any, @Res() res: Response) {
    try{
      console.log('PATCH request');
      let result =  await this.appService.updateEmployee(Number(employeeId), updatedEmployee);
      res.status(200).json(result);
    }catch(err){
      if (err instanceof EmployeeNotFoundException) {
        res.status(err.getStatus()).json({ error: err.message });
      }else{
        res.status(500).json({ error: err.message });
      }
    }
  }

  @Delete('/orders/:orderId')
  async deleteOrder(@Param('orderId') orderId: number,  @Res() res: Response) {
    try{
      console.log('DELETE request');
      let result =  await this.appService.deleteOrder(Number(orderId));
      res.status(200).json(result);
    }catch(err){
      if (err instanceof OrderNotFoundException) {
        res.status(err.getStatus()).json({ error: err.message });
      }else{
        res.status(500).json({ error: err.message });
      }
    }
  }

  @Post('/products')
  async createProduct(@Body() newProduct: any,  @Res() res: Response) {
    try{
      console.log('POST request');
      let result =  await this.appService.createProduct(newProduct);

      res.status(201).json(result);
    }catch(err){
      if (err instanceof CategoryNotFoundException) {
        res.status(err.getStatus()).json({ error: err.message });
      }else{
        res.status(500).json({ error: err.message });
      }
    }
  }
}
