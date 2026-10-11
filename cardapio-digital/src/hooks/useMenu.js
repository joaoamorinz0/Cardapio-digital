import { useEffect, useState } from 'react';
import { loadMenu } from '../services/loadMenu.js';

export function useMenu(slug) {
  const [state, setState] = useState({ status: 'loading', menu: null });

  useEffect(() => {
    let active = true;

    const run = async () => {
      if (!slug) {
        if (active) {
          setState({ status: 'notfound', menu: null });
        }
        return;
      }

      setState({ status: 'loading', menu: null });

      try {
        const menu = await loadMenu(slug);

        if (!menu) {
          if (active) {
            setState({ status: 'notfound', menu: null });
          }
          return;
        }

        if (active) {
          setState({ status: 'ready', menu });
        }
      } catch (error) {
        console.error('[menu] erro ao carregar o cardápio:', error);

        if (active) {
          setState({ status: 'error', menu: null });
        }
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [slug]);

  return state;
}
