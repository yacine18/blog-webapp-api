import { signJwt } from './../utils/jwt.utils';
import { LoginUserInput } from './dto/input/login-user.input';
import { CreateUserInput } from './dto/input/create-user.input';
import { User } from './entities/User';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CookieOptions } from 'express';
import Ctx from 'src/types/context.type';



const cookieOptions: CookieOptions = {
  domain: 'localhost',
  secure: true, 
  sameSite: 'strict',
  httpOnly: true,
  path: '/',
};

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

  async login({email, password}: LoginUserInput, context:Ctx): Promise<User> {
    const user = await this.usersRepository.findOne({email})

    if(!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Email or Password incorrect!")
    }

    const jwt = signJwt(user.id.toString())

    context.res.cookie('token', jwt, cookieOptions)

    return user
  }
}


