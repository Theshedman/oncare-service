export const TYPES = {
  // controllers
  AuthController: Symbol.for('AuthController'),
  UserController: Symbol.for('UserController'),

  // services
  UserService: Symbol.for('UserService'),
  AuthService: Symbol.for('AuthService'),
  RedisService: Symbol.for('RedisService'),

  // repositories
  UserRepository: Symbol.for('UserRepository'),
  BaseRepository: Symbol.for('BaseRepository'),
  Utils: Symbol.for('Utils'),

  // middlewares
  AuthMiddleware: Symbol.for('AuthMiddleware'),
  CacheMiddleware: Symbol.for('CacheMiddleware'),

  // server
  App: Symbol.for('App'),

  // models
  ModelClass: Symbol('ModelClass'),

  // Utils
  TokenUtil: Symbol('TokenUtil'),
}
