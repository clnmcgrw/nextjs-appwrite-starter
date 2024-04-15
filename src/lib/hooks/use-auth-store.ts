import { create } from 'zustand';
import { ID, account } from '@/lib/appwrite-client';
import passwordStrength from '@/lib/utils/pw-strength';
import { RECOVERY_REDIRECT, EMAIL_VERIFY_REDIRECT } from '@/lib/config';
import * as i18n from '@/lib/i18n';
import { type Models } from 'appwrite';

type AuthErrors = {
  login?: string | false
  signup?: string | false
  recovery?: string | false
  verify?: string | false
}

type UserPrefs = any // todo - update once using this feature

type AuthStore = {
  user: Models.User<UserPrefs> | null
  session: Models.Session | null
  errors: AuthErrors
  ready: boolean
  loading: boolean
  recovering: boolean
  logInViaEmail: (email: string, password: string) => Promise<void>
  signUpViaEmail: (email: string, password: string, verify: string) => Promise<void>
  getAccount: () => Promise<void>
  getSession: (id?: string) => Promise<void>
  getCurrentAuth: () => Promise<void>
  createRecovery: (email: string) => Promise<void>
  confirmRecovery: (id: string, secret: string, password: string, verify: string) => Promise<void>
  logOut: () => Promise<void>
  isLoggedIn: () => boolean
}

// TODO - proper i18n + better errors
const { errors: authErrors } = i18n.EN.auth;
const getAppwriteError = (e: any) => e.message || authErrors.generic;


// Account store
export const useAuthStore = create<AuthStore>((set, get) => {
  // Get a user account
  const getAccount = async () => {
    const user = await account.get();
    set({ user });
  };

  // Get a user's session
  const getSession = async (id: string = 'current') => {
    const session = await account.getSession(id);
    set({ session });
  };

  // Get user account + session
  const getCurrentAuth = async () => {
    const { ready, user, session } = get();
    if (ready || (user && session)) return;
    try {
      const session = await account.getSession('current');
      const user = await account.get();
      console.log('current auth: ', { user, session });
      set({ user, session, ready: true });
    } catch (e: any) {
      // don't set error, it throws when no user/session exists
      set({ ready: true });
    }
  };

  // Login (aka create session)
  const logInViaEmail = async (email: string, password: string) => {
    if (!email || !password) {
      set(store => ({ errors: { ...store.errors, login: authErrors.missing } }));
      return;
    }
    set(store => ({
      loading: true,
      errors: { ...store.errors, login: false },
    }));
    try {
      const session = await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      set({ session, user, loading: false });
    } catch (e: any) {
      set(store => ({
        loading: false,
        errors: { ...store.errors, login: getAppwriteError(e) },
      }));
    }
  };

  // SignUp = create account & start a session
  const signUpViaEmail = async (email: string, password: string, verify: string) => {
    if (!email || !password || !verify) {
      set(store => ({ errors: { ...store.errors, signup: authErrors.missing } }));
      return;
    }
    if (password !== verify) {
      set(store => ({ errors: { ...store.errors, signup: authErrors.verifyPassword } }));
      return;
    }
    const strength = passwordStrength(password);
    if (strength.id < 2) {
      set(store => ({ errors: { ...store.errors, signup: authErrors.strength } }));
      return;
    }
    set(store => ({
      loading: true,
      errors: { ...store.errors, signup: false },
    }));
    try {
      const user = await account.create(ID.unique(), email, password);
      const session = await account.createEmailPasswordSession(email, password);
      set({ user, session, loading: false });
    } catch (e: any) {
      set(store => ({
        loading: false,
        errors: { ...store.errors, signup: getAppwriteError(e) },
      }));
    }
  };

  const verifyEmail = async () => {
    try {
      await account.createVerification(EMAIL_VERIFY_REDIRECT);
    } catch (e) {
      set(store => ({ errors: { ...store.errors, verify: getAppwriteError(e) } }));
    }
  };

  // Recover password - get recovery link via email
  const createRecovery = async (email: string) => {
    if (!email) {
      set(store => ({
        errors: { ...store.errors, recovery: authErrors.missing },
      }));
      return;
    }
    set(store => ({
      loading: true,
      errors: { ...store.errors, recovery: false },
    }));
    try {
      const recovery = await account.createRecovery(email, RECOVERY_REDIRECT);
      console.log('recovery: ', recovery);
      set({ loading: false, recovering: true });
    } catch (e: any) {
      set(store => ({
        loading: false,
        errors: { ...store.errors, recovery: getAppwriteError(e) },
      }));
    }
  };

  // Recover password - confirm new password value
  const confirmRecovery = async (id: string, secret: string, password: string, verify: string) => {
    if (!password || !verify) {
      set(store => ({ errors: { ...store.errors, recovery: authErrors.missing } }));
      return;
    }
    if (password !== verify) {
      set(store => ({ errors: { ...store.errors, recovery: authErrors.verifyPassword } }));
      return;
    }
    const strength = passwordStrength(password);
    if (strength.id < 2) {
      set(store => ({ errors: { ...store.errors, recovery: authErrors.strength } }));
      return;
    }
    set(store => ({
      loading: true,
      errors: { ...store.errors, recovery: false },
    }));
    try {
      // @ts-ignore
      const recovery = await account.updateRecovery(id, secret, password, verify);
      console.log('confirmed recovery: ', recovery);
      set({ loading: false, recovering: false });
    } catch (e: any) {
      set(store => ({
        loading: false,
        errors: { ...store.errors, recovery: getAppwriteError(e) },
      }));
    }
  };

  // Log out a user
  const logOut = async () => {
    const sessionId = get().session?.$id;
    if (!sessionId) return;

    await account.deleteSession(sessionId);
    set({ user: null, session: null });
  };

  // check logged in status
  const isLoggedIn = () => {
    const { user, session } = get();
    return Boolean(user && session);
  };

  return {
    user: null,
    session: null,
    errors: {
      login: false,
      signup: false,
      recover: false,
    },
    ready: false,
    loading: false,
    recovering: false,
    
    getAccount,
    getSession,
    getCurrentAuth,
    logInViaEmail,
    signUpViaEmail,
    verifyEmail,
    createRecovery,
    confirmRecovery,
    logOut,
    isLoggedIn,
  };
});
