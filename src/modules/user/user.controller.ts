import { Controller, Get, Post, Render, Req } from '@nestjs/common';
import { UserService } from './user.service';



@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  public registrant () {
    const username = Req.arguments.username;
    console.log(username);
    return this.userService.create();
  }
  

}
