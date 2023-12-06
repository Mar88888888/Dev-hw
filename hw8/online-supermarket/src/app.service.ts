import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../../hw7/prisma/generated/client';
import {
  OrderNotFoundException,
  CustomerNotFoundException,
  EmployeeNotFoundException,
  CategoryNotFoundException,
} from './custom.exceptions';

@Injectable()
export class AppService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getTotalCost(orders: any[]): Promise<number> {
    let sum = 0;

    if (orders.length < 1) {
      return sum;
    }

    for (let order of orders) {
      let orderId = order.id;
      let orderPrice = await this.getOrderPrice(orderId);
      order.totalCost = orderPrice;
      sum = sum + orderPrice;
    }

    return sum;
  }

  async getCustomerOrders(custId:number){
    let orders = await this.getCustomerOrdersFromDb(custId);
    
    if(orders === null){
      throw new CustomerNotFoundException(custId);
    }
      let totalCost = await this.getTotalCost(orders);
      let response = {
        orders: orders.map((order: any) => ({
          id: order.id,
          customerId: order.customerId,
          employeeId: order.employeeId,
          address: order.orderAddress,
          deliveryCost: Number(order.deliveryCost),
          orderDate: order.orderDate,
          totalCost: order.totalCost,
        })),
        totalCost: totalCost,
      };
    
      return response;

  }

  async getOrderPrice(orderId: number): Promise<number> {
    let sum = 0;
    let delivery = Number(await this.getAttributeById('order', orderId, 'deliveryCost'));
    let orderProducts = await this.getOrderProducts(orderId);

    for (let orderProduct of orderProducts) {
      let orderProductId = orderProduct.id;
      let productId = orderProduct.productId;
      let orderProductPrice =
        (await this.getAttributeById('orderProduct', orderProductId, 'amount')) *
        (await this.getAttributeById('product', productId, 'price'));
      sum = sum + orderProductPrice;
    }

    return sum + delivery;
  }

  async deleteOrder(orderId: number): Promise<any> {
    let exists = await this.CheckIfExists('Order', orderId);

    if (exists) {
      await this.deleteManyByQuery('OrderProduct', { orderId: orderId });
      let deletedOrder = await this.deleteById('Order', orderId);
      return deletedOrder;
    } else {
      throw new OrderNotFoundException(orderId);
    }
  }

  async createProduct(product: any): Promise<any> {
    let categoryId = await this.FindByName('category', product.category);
    if (categoryId === null) {
        throw new CategoryNotFoundException(product.category);
    }
    product.category = { connect: { id: categoryId } };
    let createdInstance = await this.createInstance('Product', product);
    return createdInstance;
  }

  async getCustomerOrdersFromDb(custId: number): Promise<any> {
    try {
      let orders = await this.prisma.order.findMany({
        where: {
          customerId: Number(custId),
        },
      });

      if (orders.length === 0) {
        let customer = await this.prisma.customer.findUnique({
          where: {
            id: Number(custId),
          },
        });

        if (customer === null) {
          return null;
        }
      }

      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return null;
    }
  }

  async getOrderProducts(orderId: number): Promise<any> {
    try {
      let orderProducts = await this.prisma.orderProduct.findMany({
        where: {
          orderId: orderId,
        },
      });

      return orderProducts;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return null;
    }
  }

  async getAttributeById(model: string, id: number, attribute: string): Promise<any> {
    try {
      if (id != undefined) {
        let instance = await this.prisma[model].findUnique({
          where: {
            id: id,
          },
        });

        if (instance === null) {
          console.log(`No ${model} found with id ${id}`);
          return null;
        }

        return instance[attribute];
      }

      return null;
    } catch (error) {
      console.error(`Error fetching ${model}:`, error);
      return null;
    }
  }
  async updateEmployee(id: number, Employee: any){
    let updatedEmployee = {
        firstName: Employee.firstName,
        lastName: Employee.lastName,
        middleName: Employee.middleName,
        position: Employee.position
    };
    let exists = await this.CheckIfExists('Employee', id);
    if(exists){
      console.log('Exists')
      let result = await this.updateInstance('Employee', id, updatedEmployee);
      return result;
    }
    throw new EmployeeNotFoundException(id);
  }

  async updateInstance(model: string, id: number, updatedInstance: any): Promise<any> {
      let updated = await this.prisma[model].update({
        where: {
          id: id,
        },
        data: {
          firstName: updatedInstance.firstName,
          lastName: updatedInstance.lastName,
          middleName: updatedInstance.middleName,
          position: updatedInstance.position,
        },
      });
      return updated;
  }

  async deleteById(model: string, id: number): Promise<any> {
    try {
      let deletedInstance = await this.prisma[model].delete({
        where: {
          id: id,
        },
      });

      return deletedInstance;
    } catch (error) {
      console.error('Error deleting:', error);
      return null;
    }
  }

  async deleteManyByQuery(model: string, query: any): Promise<void> {
    await this.prisma[model].deleteMany({
      where: query,
    });
  }

  async CheckIfExists(model: string, id: number): Promise<boolean> {
    try {
      let instance = await this.prisma[model].findUnique({
        where: {
          id: id,
        },
      });
      if (instance === null) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error finding:', error);
      return false;
    }
  }

  async FindByName(model: string, name: string): Promise<number> {
    try {
      let instance = await this.prisma[model].findFirst({
        where: {
          name: name,
        },
      });

      if (instance === null) {
        return null;
      }
      return instance.id;
    } catch (error) {
      console.error('Error deleting:', error);
      return null;
    }
  }

  async createInstance(model: string, instance: any): Promise<any> {
    try {
      console.log(instance);
      let newInstance = await this.prisma[model].create({
        data: instance,
      });

      return newInstance;
    } catch (error) {
      console.error('Error creating instance:', error);
      return null;
    }
  }
}
