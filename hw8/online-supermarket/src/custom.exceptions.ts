import { HttpStatus, HttpException } from '@nestjs/common';

export class OrderNotFoundException extends HttpException {
  constructor(orderId: number) {
    super(`Order with ID ${orderId} not found`, HttpStatus.NOT_FOUND);
  }
}

export class CustomerNotFoundException extends HttpException {
  constructor(customerId: number) {
    super(`Customer with ID ${customerId} not found`, HttpStatus.NOT_FOUND);
  }
}

export class EmployeeNotFoundException extends HttpException {
  constructor(employeeId: number) {
    super(`Employee with ID ${employeeId} not found`, HttpStatus.NOT_FOUND);
  }
}

export class CategoryNotFoundException extends HttpException {
  constructor(categoryName: string) {
    super(`Category with name ${categoryName} not found`, HttpStatus.FORBIDDEN);
  }
}
