export default () => ({
  jwtSecret: process.env.JWT_SECRET || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  SYNCHRONIZE_DB: process.env.SYNCHRONIZE_DB,
});
