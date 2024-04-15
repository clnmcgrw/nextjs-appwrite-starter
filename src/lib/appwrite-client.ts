import { Client, Account, Databases, Storage } from 'appwrite';
import { type Models } from 'appwrite';

export { ID } from 'appwrite';

const client = new Client();
client
  .setEndpoint(process.env['NEXT_PUBLIC_APPWRITE_ENDPOINT'] as string)
  .setProject(process.env['NEXT_PUBLIC_APPWRITE_PROJECT_ID'] as string);


export const account: Account = new Account(client);

// Shim'd account recovery
// see - https://github.com/appwrite/sdk-for-web/issues/92
// @ts-ignore
account.updateRecovery = (
  userId: string,
  secret: string,
  password: string,
  passwordAgain: string,
): Promise<Models.Token> => {
  if (!userId || !secret || !password || !passwordAgain) {
    throw new Error('Missing argument');
  }

  const apiPath = '/account/recovery';
  const payload: {[key: string]: string} = {};

  if (typeof userId !== 'undefined') {
    payload['userId'] = userId;
  }
  if (typeof secret !== 'undefined') {
    payload['secret'] = secret;
  }
  if (typeof password !== 'undefined') {
    payload['password'] = password;
  }
  if (typeof passwordAgain !== 'undefined') {
    payload['passwordAgain'] = password;
  }

  const uri = new URL(client.config.endpoint + apiPath);
  return client.call('put', uri, {
      'content-type': 'application/json',
  }, payload);
};
