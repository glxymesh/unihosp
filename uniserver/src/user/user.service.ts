import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as crypto from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import excludePassword from 'src/utils/excludePassword';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private prismaService: PrismaService) {
    this.logger.debug('Initialized');
  }

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput, include?: { patient: boolean, }) {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
      include
    })
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const response = await this.prismaService.user.findMany({
      ...params,
    });
    return response.map((user) => excludePassword(user, ['password']));
  }

  async usersAddAuthToken(userId: string, refreshToken: string) {
    const expireIn = 2592000000;
    return this.prismaService.refreshTokens.create({
      data: {
        authToken: Buffer.from(refreshToken, 'utf-8'),
        expireIn: new Date(Date.now() + expireIn),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async removeAuthToken(refreshTokenId: string) {
    this.logger.log(refreshTokenId);
    return this.prismaService.refreshTokens.delete({
      where: {
        id: refreshTokenId,
      },
    }).catch((err) => ({
      reason: err,
      statusCode: 401
    }));
  }

  async refreshTokens(userId: string) {
    return this.prismaService.refreshTokens.findMany({ where: { userId } });
  }

  async createUser(data: Prisma.UserCreateInput) {
    try {
      const user = await this.prismaService.user.create({ data });
      return excludePassword(user, ['password']);
    } catch (err) {
      this.logger.debug(err.message);
    }
  }

  async verifyMailAndContact(email: string, contact: string) {
    try {
      await this.prismaService.verificationMailRequest.deleteMany({
        where: {
          OR: [{ email: email }, { contact: email }],
        },
      });
      const mailCreate =
        await this.prismaService.verificationMailRequest.create({
          data: {
            id: crypto.randomBytes(64).toString('hex'),
            expireAt: new Date(Date.now() + 600000),
            code: Math.round(Math.random() * 1000000),
            contact,
            email,
          },
        });
      this.logger.debug(JSON.stringify(mailCreate));
      return {
        uri: mailCreate.id,
        code: mailCreate.code,
      };
    } catch (err) {
      this.logger.debug(err.message);
    }
  }

  getAndDeleteVerifyMailById(id: string) {
    return this.prismaService.verificationMailRequest.delete({
      where: {
        id,
      },
    });
  }

  getAndDeleteVerifyMailByEmail(email: string, contact: string) {
    return this.prismaService.verificationMailRequest.delete({
      where: {
        email: email,
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    });
  }
}
