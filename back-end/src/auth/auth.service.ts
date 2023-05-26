import { Injectable } from '@nestjs/common';
import { User, Note } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDTO, ResetPw } from './dto';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(authDTO: AuthDTO) {
    // generate password to hashed password
    const hashedPassword = await argon.hash(authDTO.password);
    //
    // insert data to database
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPassword: hashedPassword,
          name: authDTO.name,
          thanhpho: authDTO.thanhpho,
          age: authDTO.age,
          role: authDTO.role,
        },
        select: {
          email: true,
          id: true,
          createdAt: true,
        },
      });
      return await this.signJwtToken(user.id, user.email);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException(
          'Users name with this email already exists',
        );
      } else {
        throw new NotFoundException('Invalid user');
      }
    }
  }
  async login(authDTO: AuthDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const passwordMatched = await argon.verify(
      user.hashedPassword,
      authDTO.password,
    );
    if (!passwordMatched) {
      throw new ForbiddenException('Incorrect password');
    }
    delete user.hashedPassword;
    return await this.signJwtToken(user.id, user.email);
  }

  async resetPassword(body: ResetPw) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          email: body.email,
        },
      });

      if (!user) {
        throw new ForbiddenException('User not found');
      }

      const newHashPassword = await argon.hash(body.password);

      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          hashedPassword: newHashPassword,
        },
      });

      return {
        statusCode: 200,
        message: `Password reset successfully`,
      };
    } catch (error) {
      throw new NotFoundException('Error');
    }
  }

  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '100m',
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      accessToken: jwtString,
    };
  }
}
