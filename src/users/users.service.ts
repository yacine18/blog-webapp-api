import { CreateUserInput } from './dto/input/create-user.input';
import { User } from './entities/User';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(userInput:CreateUserInput): Promise<User> {
    
    // check if user exists with email
    const user  = await this.usersRepository.findOne({email:userInput.email})
    if(user) {
      throw new Error("User already exists!")
    }

    // hashing user's password
    const salt = await bcrypt.genSalt(10)

    const newUser = {
      name: userInput.name,
      email: userInput.email,
      password: bcrypt.hashSync(userInput.password, salt)
    }

    // save user in database
    const createdUser = this.usersRepository.create(newUser)
    return this.usersRepository.save(createdUser)
  }
}
