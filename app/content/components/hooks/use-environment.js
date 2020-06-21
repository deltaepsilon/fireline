import devEnv from '../../../environments/app-env.dev';
import prodEnv from '../../../environments/app-env.prod';
import { useMemo } from 'react';

export default function useEnvironment() {
  return useMemo(() => {
    const isBrowser = typeof window != 'undefined';
    let environment = prodEnv;

    if (isBrowser) {
      const [subdomain] = window.location.hostname.split('.');
      const isDev = devEnv.SUBDOMAINS.has(subdomain);

      if (isDev) {
        environment = devEnv;
      }
    }

    return environment;
  }, []);
}
