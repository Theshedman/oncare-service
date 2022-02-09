import bcrypt from 'bcryptjs';
import 'reflect-metadata';
import { container } from '../../../../app/configs/inversity.config';
import { TYPES } from '../../../../app/configs/types';
import { IUserModel } from '../../../../app/models';
import { DbAccess } from '../../../../app/repositories';
import { IUserService } from '../../../../app/services/users/userService.interface';
import { TestUserRepository, TestBaseRepository } from '../../../fixtures';

jest.mock('bcryptjs');

describe('User Service Unit Test', () => {
  const bcryptMock = bcrypt as jest.Mocked<any>;
  let testUserService: IUserService;

  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();

    container.rebind<DbAccess>(TYPES.BaseRepository).to(TestBaseRepository);
    container.rebind<DbAccess>(TYPES.UserRepository).to(TestUserRepository);

    testUserService = container.get<IUserService>(TYPES.UserService);
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

  afterAll((done) => {
    done();
  })

  it('should be defined', () => {

    expect(testUserService).toBeDefined();
  });

  it('should create a new user', async () => {
    bcryptMock.hash.mockResolvedValueOnce('1S896xPD#$')

    const userData: IUserModel = {
      id: '23widh23-323d',
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User',
      password: 'Asdc#21dB0',
      phone: '09087235321',
      role: 'user'
    }

    const newUser = await testUserService.create(userData);

    expect(newUser).toBeDefined();
  });

  it('should not create a new user if email is invalid', async () => {
    bcryptMock.hash.mockResolvedValueOnce('1S896xPD#$')

    const userData: IUserModel = {
      id: '23widh23-323d',
      email: 'test@example',
      first_name: 'Test',
      last_name: 'User',
      password: 'Asdc#21dB0',
      phone: '09087235321',
      role: 'user',
    }

    try {
      await testUserService.create(userData);
    } catch (e: any) {
      const errorMessage = 'Invalid email address';
      expect(e.message).toContain(errorMessage);
    }
  });

  it('should fail validation if user email already exists ', async () => {


    const userData: IUserModel = {
      id: '23widh23-323d',
      email: 'john.doe@gmail.com',
      first_name: 'John',
      last_name: 'Doe',
      password: 'Asdc#21dB0',
      phone: '08130096255',
      role: 'user'
    }

    try {
      await testUserService.create(userData);
    } catch (e: any) {
      const errorMessage = 'User already exists';

      expect(e.message).toBe(errorMessage);
    }

  });

  it('should fail validation if user phone already exists ', async () => {


    const userData: IUserModel = {
      id: '23widh23-323d',
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User',
      password: 'Asdc#21dB0',
      phone: '08130096255',
      role: 'user'
    }

    try {
      await testUserService.create(userData);
    } catch (e: any) {
      const errorMessage = 'User already exists';

      expect(e.message).toBe(errorMessage);
    }

  });

  it('should get one user', async () => {
    const user = await testUserService.findOne({ email: 'john.doe@gmail.com' });

    expect(user).not.toBeFalsy();
    expect(user.phone).toBe('08130096255');
  });

  it('should update user', async () => {
    const updateData = {
      email: 'user@updated.com',
      phone: '08140835726'
    }
    const user = await testUserService.update('aa8d227f-73c9-4ff2-8109-c88531f84be3', updateData);

    expect(user.email).toBe('user@updated.com');
    expect(user.phone).toBe('08140835726');
  });
});
