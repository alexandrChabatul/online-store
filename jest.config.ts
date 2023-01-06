import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
    automock: false,
    verbose: true,
    moduleDirectories: ['node_modules', 'src'],
};
export default config;
