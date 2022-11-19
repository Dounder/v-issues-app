import { VueQueryPlugin } from '@tanstack/vue-query';
import { boot } from 'quasar/wrappers';

export default boot(async ({ app }) => {
  VueQueryPlugin.install(app, {
    // queryClientConfig: {
    //   defaultOptions: {
    //     queries: {
    //       cacheTime: 1000 * 60, //? 1 minute
    //     },
    //   },
    // },
  });
});
