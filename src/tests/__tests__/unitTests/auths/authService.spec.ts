import bcrypt from 'bcryptjs';
import 'reflect-metadata';
import { container } from '../../../../app/configs/inversity.config';
import { TYPES } from '../../../../app/configs/types';
import { IAuthService } from '../../../../app/middlewares';
import { DbAccess } from '../../../../app/repositories';
import { IJwtPayload } from '../../../../app/services/auths/auth.interface';
import {
  TestBaseRepository
} from '../../../fixtures';

jest.mock('bcryptjs');

describe('Auth Service Unit Test', () => {
    const bcryptMock = bcrypt as jest.Mocked<any>;
    let testAuthService: IAuthService;

    beforeEach(() => {
      // create a snapshot so each unit test can modify
      // it without breaking other unit tests
      container.snapshot();

      container.rebind<DbAccess>(TYPES.BaseRepository).to(TestBaseRepository);

      testAuthService = container.get<IAuthService>(TYPES.AuthService);
    });

    afterEach(() => {

      // Restore to last snapshot so each unit test
      // takes a clean copy of the application container
      container.restore();

      // Clear all mocks after each test
      bcryptMock.hash.mockClear();
      bcryptMock.compare.mockClear();

      // Clear all mocks after each test
      jest.clearAllMocks();
    });

    it('should be defined', () => {

      expect(testAuthService).toBeDefined();
    });

    it('should fail login if the email does not exist', async () => {
      const userData = {
        email: 'david23@wrong.com',
        password: '13Jmsl*2#',

      }

      try {
        await testAuthService.login(userData.email, userData.password);
      } catch (e: any) {
        const errorMessage = 'Invalid email or password';

        expect(e.message).toEqual(errorMessage);
        expect(e.code).toBe(401);
      }
    });

    it('should not login with invalid email', async () => {
      bcryptMock.compare.mockResolvedValueOnce(true);

      try {
        await testAuthService.login('error@test', '13Jmsl*2#');
      } catch (e: any) {
        expect(e.message).toBeDefined();
      }
    });

    it('should not login with invalid password', async () => {
      bcryptMock.compare.mockResolvedValueOnce(false);

      try {
        await testAuthService.login('john.doe@gmail.com', 'wrongPass');
      } catch (e: any) {
        const errorMessage = 'Invalid email or password';
        expect(e.message).toEqual(errorMessage);
      }
    });

    it('should generate JWT token', async () => {
      const userData: IJwtPayload = {
        id: 'a1e70e05-259b-44c5-94a0-60471004fa72',
        email: 'john.doe@gmail.com',
      }
      const token = testAuthService.generateJwtToken(userData);

      expect(token).toBeDefined();
    });

    it('should throw error generating JWT token if id is not provided', async () => {
      const userData: IJwtPayload | any = {
        email: 'john.doe@gmail.com',
      }

      try {
        testAuthService.generateJwtToken(userData);
      } catch (e: any) {
        expect(e.message).toBeTruthy();
        expect(e.code).toBeTruthy();
      }
    });

    it('should decode JWT token', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE2NDQ0Mjc4OTMsImF1ZCI6ImZhOTY5NTU1LWUzYzItNGU3Yi1hMGQ4LWE5MDNiMmYxMjdlNiJ9.aMnc314NZ8vRPWjtrR4qGGXiCnGnkmyUdmUlAol5ze8';
      const decodedToken: IJwtPayload | any = testAuthService.decodeJwtToken(token);

      expect(decodedToken).toBeDefined();
      expect(decodedToken.email).toBe('test@example.com');
      expect(decodedToken.aud).toBe('fa969555-e3c2-4e7b-a0d8-a903b2f127e6');
    });

    it('should throw error while decoding JWT token', async () => {
      const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.RODj4OzgVPibzheJS2XdD6G3T6XXgEvwtaUfQhh5tYY';

      try {
        testAuthService.decodeJwtToken(wrongToken);
      } catch (e: any) {
        expect(e.message).toBeTruthy();
        expect(e.code).toBeTruthy();
      }

    });
  }
)

