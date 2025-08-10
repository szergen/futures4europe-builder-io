import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { members } from '@wix/members';
import { items } from '@wix/data';
import { currentMember, authentication } from '@wix/site-members';
import { contacts } from '@wix/crm';
import { site } from '@wix/site';
import { files } from '@wix/media';
import { marketingConsent } from '@wix/marketing';

export const getWixClientData = async () => {
  const { NEXT_PUBLIC_WIX_CLIENT_ID } = process.env;

  if (!NEXT_PUBLIC_WIX_CLIENT_ID) {
    throw new Error(
      'Missing required environment variable: NEXT_PUBLIC_WIX_CLIENT_ID'
    );
  }

  const wixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({ clientId: NEXT_PUBLIC_WIX_CLIENT_ID }),
  });

  // const tokens = await wixClient.auth.generateVisitorTokens();
  // wixClient.auth.setTokens(tokens);

  return wixClient;
};

export const getWixClientMarketing = async () => {
  const {
    NEXT_PUBLIC_WIX_API_KEY,
    NEXT_PUBLIC_WIX_SITE_ID,
    NEXT_PUBLIC_WIX_ACCOUNT_ID,
  } = process.env;

  const wixClient = createClient({
    modules: { marketingConsent },
    auth: ApiKeyStrategy({
      apiKey: NEXT_PUBLIC_WIX_API_KEY,
      siteId: NEXT_PUBLIC_WIX_SITE_ID,
      // accountId: NEXT_PUBLIC_WIX_ACCOUNT_ID,
    }),
  });

  // const tokens = await wixClient.auth.generateVisitorTokens();
  // wixClient.auth.setTokens(tokens);

  return wixClient;
};

export const getWixClientMember = async () => {
  const NEXT_PUBLIC_WIX_CLIENT_ID = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
  // console.log('NEXT_PUBLIC_WIX_CLIENT_ID', NEXT_PUBLIC_WIX_CLIENT_ID);

  if (!NEXT_PUBLIC_WIX_CLIENT_ID) {
    throw new Error(
      'Missing required environment variable: NEXT_PUBLIC_WIX_CLIENT_ID'
    );
  }

  const wixClient = createClient({
    modules: { members },
    auth: OAuthStrategy({ clientId: NEXT_PUBLIC_WIX_CLIENT_ID }),
    // host: site.host(),
  });

  return wixClient;
};

export const getWixClientServerData = async () => {
  const {
    NEXT_PUBLIC_WIX_API_KEY,
    NEXT_PUBLIC_WIX_SITE_ID,
    NEXT_PUBLIC_WIX_ACCOUNT_ID,
  } = process.env;

  // if (!NEXT_PUBLIC_WIX_API_KEY || !NEXT_PUBLIC_WIX_SITE_ID) {
  //   throw new Error('Missing required environment variables for Wix client.');
  // }

  const wixClientServer = createClient({
    modules: { items, contacts, files, members },
    auth: ApiKeyStrategy({
      apiKey: NEXT_PUBLIC_WIX_API_KEY,
      siteId: NEXT_PUBLIC_WIX_SITE_ID,
      // accountId: NEXT_PUBLIC_WIX_ACCOUNT_ID,
    }),
  });

  return wixClientServer;
};

export const getWixClientForAuthetication = async (
  email: string,
  password: string
) => {
  // const { NEXT_PUBLIC_WIX_API_KEY, NEXT_PUBLIC_WIX_SITE_ID, NEXT_PUBLIC_WIX_ACCOUNT_ID } = process.env;

  const wixClient = createClient({
    host: site.host(),
    modules: { authentication },
  });

  try {
    await wixClient.authentication.login(email, password);
    console.log('Member is logged in');
  } catch (error) {
    console.error(error);
  }

  // const { NEXT_PUBLIC_WIX_CLIENT_ID } = process.env;

  // if (!NEXT_PUBLIC_WIX_CLIENT_ID) {
  //   throw new Error('Missing required environment variable: NEXT_PUBLIC_WIX_CLIENT_ID');
  // }

  // const wixClient = createClient({
  //   modules: { authentication },
  //   auth: OAuthStrategy({ clientId: NEXT_PUBLIC_WIX_CLIENT_ID }),
  // });

  return wixClient;
};

export const getWixClient = async () => {
  const NEXT_PUBLIC_WIX_CLIENT_ID = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
  const NEXT_PUBLIC_WIX_SITE_ID = process.env.NEXT_PUBLIC_WIX_SITE_ID;
  // console.log('NEXT_PUBLIC_WIX_CLIENT_ID', NEXT_PUBLIC_WIX_CLIENT_ID);

  if (!NEXT_PUBLIC_WIX_CLIENT_ID || !NEXT_PUBLIC_WIX_SITE_ID) {
    throw new Error(
      'Missing required environment variable: NEXT_PUBLIC_WIX_CLIENT_ID'
    );
  }

  const wixClient = createClient({
    modules: { authentication, currentMember },
    auth: OAuthStrategy({ clientId: NEXT_PUBLIC_WIX_CLIENT_ID }),
    // host: site.host({
    //   applicationId: NEXT_PUBLIC_WIX_SITE_ID,
    // }),
  });

  return wixClient;
};
