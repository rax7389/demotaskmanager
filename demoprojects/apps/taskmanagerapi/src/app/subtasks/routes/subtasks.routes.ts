import {Express}  from 'express';
import {findAll, create}  from '../controllers/subtask.controller';

export function subTaskRouter (route:Express){
  route.get('/subtask', findAll);
  // Create a new employee
  route.post('/create', create);
  // // Retrieve a single employee with id
  // router.get('/:id', employeeController.findById);
  // // Update a employee with id
  // router.put('/:id', employeeController.update);
  // // Delete a employee with id
  // router.delete('/:id', employeeController.delete);
}