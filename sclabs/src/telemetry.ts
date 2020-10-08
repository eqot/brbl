import { Configuration } from './configuration'

const [GATrackingId, GASettings] =
  location.hostname !== 'localhost'
    ? [Configuration.googleAnalyticsTrackingId || 'UA-000000-01', { debug: false, sampleRate: 100 }]
    : [null, {}]

export { GATrackingId, GASettings }
