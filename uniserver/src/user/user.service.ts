import { Injectable, Logger } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import * as crypto from "crypto";
import { PrismaService } from "src/database/prisma.service";

function exclude<User, Key extends keyof User>(
  obj: User,
  keys: Key[],
): Omit<User, Key> {
  for (const key of keys) {
    delete obj[key];
  }
  return obj;
}


@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private prismaService: PrismaService) {
    this.logger.debug('Initialized');
  }

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
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
    return response.map((user) => exclude(user, ['password']));
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
    return this.prismaService.refreshTokens.delete({
      where: {
        id: refreshTokenId,
      },
    });
  }

  async refreshTokens(userId: string) {
    return this.prismaService.refreshTokens.findMany({ where: { userId } });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  async verifyMailAndContact(email: string, contact: string) {
    const mailCreate = await this.prismaService.verificationMailRequest.create({
      data: {
        id: crypto.randomBytes(64).toString("hex"),
        expireAt: new Date(Date.now() + 600000),
        code: Math.round(Math.random() * 1000000),
        contact,
        email
      }
    });
    return {
      uri: mailCreate.id,
      code: mailCreate.code
    }
  }

  getAndDeleteVerifyMailById(id: string) {
    return this.prismaService.verificationMailRequest.delete({
      where: {
        id
      }
    });
  }

  getAndDeleteVerifyMailByEmail(email: string, contact: string) {
    return this.prismaService.verificationMailRequest.delete({
      where: {
        email: email
      }
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

