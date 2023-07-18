import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const employeeRouter: Router = Router();

employeeRouter.get('/',     middlewares.employee.GET,  controller.employee_controller.getEmployee)
              .get('/:id',  middlewares.employee.GET,  controller.employee_controller.getEmployeeById)
              .post('/',    middlewares.employee.POST, controller.employee_controller.addEmployee)
              .put('/:id',  middlewares.employee.PUT,  controller.employee_controller.updateEmployee)

export {employeeRouter};