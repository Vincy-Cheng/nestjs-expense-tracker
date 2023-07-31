import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Return the user
   * @param {string} username
   * @param {string} password
   * @returns
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    // Match the hashed password
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  /**
   * Return the access token (JWT token)
   * @param {Object} user
   * @param {number} user.id
   * @param {string} user.username
   * @returns
   */
  async login(user: { id: number; username: string }) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
