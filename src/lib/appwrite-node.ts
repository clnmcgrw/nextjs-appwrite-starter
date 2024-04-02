import { Client, Account } from 'node-appwrite';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_KEY } from '@/lib/config';

export const {
  NEXT_PUBLIC_APPWRITE_ENDPOINT = '',
  NEXT_PUBLIC_APPWRITE_PROJECT_ID = '',
  NEXT_APPWRITE_API_KEY = '',
} = process.env;

const createSessionClient = async() => {
  const client = new Client()
    .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(NEXT_PUBLIC_APPWRITE_PROJECT_ID);
  const session = cookies().get(SESSION_COOKIE_KEY);
  if (!session || !session.value) {
    throw new Error('No session');
  }
  client.setSession(session.value);
  return {
    getAccount: () => new Account(client),
  };
};

export const createAdminClient = () => {
  const client = new Client()
    .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(NEXT_APPWRITE_API_KEY);
  return {
    getAccount: () => new Account(client),
  };
};

export const getLoggedInUser = async () => {
  const { getAccount } = await createSessionClient();
  return getAccount();
};

export const signUpWithEmail = () => {

};