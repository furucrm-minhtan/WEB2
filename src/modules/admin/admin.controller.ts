import { Body, Controller, Get, Post, Render } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get()
  @Render('admin')
  async root() {
    return {};
  }
}
