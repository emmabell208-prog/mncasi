import { createApp } from './app';
import { config } from './config';
import { geoLocationService } from './services/geoLocationService';
const app = createApp();
async function start() {
  try {
    if (config.nodeEnv === 'production' || (config.maxmindDbPath && config.maxmindDbPath.length)) {
      try {
        if (typeof (geoLocationService as any).initialize === 'function') {
          if (config.nodeEnv === 'production') {
            await (geoLocationService as any).initialize();
            console.log('GeoLocation service initialized');
          } else {
            try {
              await (geoLocationService as any).initialize();
              console.log('GeoLocation service initialized (dev)');
            } catch (err) {
              console.warn('GeoLocation init failed in dev/test:', err?.message || err);
            }
          }
        }
      } catch (err) {
        console.error('Failed to initialize GeoLocation service:', err);
        if (config.nodeEnv === 'production') process.exit(1);
      }
    }
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port} (env=${config.nodeEnv})`);
    });
  } catch (err) {
    console.error('Server start failed:', err);
    process.exit(1);
  }
}
start();
export { app };
