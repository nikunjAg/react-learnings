import customFetch from './fetchInterceptors';
import { closures } from './closures';

export const JS = {
    customFetch,
    closures,
};

window.JS = JS;
