import { Controller, Body, Patch, Param } from '@nestjs/common';
import { EmployeeDTO } from './dto';
import { EmployeeService } from '../services/employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Patch(':employeeId')
  async updateEmployee(@Param('employeeId') employeeId: string, @Body() updateEmployeeDTO: EmployeeDTO) {
    // Validate updateEmployeeDTO here if needed
    // ...

    const updatedEmployee = await this.employeeService.updateEmployee(employeeId, updateEmployeeDTO);
    return { message: 'Employee updated successfully', data: updatedEmployee };
  }
}
