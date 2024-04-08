import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// * TODO: add connection to DB
// * TODO: Add Blog entity
// * TODO: Add creating a blog endpoint
// * TODO: Add blog endpoints for retrieving all blogs
// * TODO: Add endpoint to get one blog by id
// * TODO: Add validations for the endpoints
// * TODO: Add swagger documentation
// * TODO: Add pagination for the get all blogs endpoint
// * TODO: Add redis caching for the get all blogs endpoint
// TODO: Add testing for service layer
// TODO: Add e2e testing for the blog endpoint
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
