import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export class JwtService {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  // 生成 JWT
  generateToken(payload: object, expiresIn: string | number = '1h'): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  // 验证 JWT
  verifyToken(token: string): object | string {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return 'Invalid token';
    }
  }

  // 生成随机密钥
  static generateRandomSecretKey(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }
}