import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/users.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}

    async createUser(createUserDto: UserDto){
      const hash = await this.encryptPassword(createUserDto.password);
      const userReqBody = {
        login: createUserDto.login,
        hash 
      } 
      await this.userModel.create(userReqBody);
    }

    async encryptPassword(password: string) {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      return hash;
    }
    
    async findUserByLogin(login: string){
      return await this.userModel.findOne({login});
    }

}
