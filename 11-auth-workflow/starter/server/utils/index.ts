import { createJWT, isTokenValid, attachCookiesToResponse } from './jwt';
import createTokenUser from './createTokenUser';
import checkPermissions from './checkPermissions';
import sendVerificationEmail from './sendVerificationEmail';

export default {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  sendVerificationEmail,
};
