const [GATrackingId, GASettings] =
  location.hostname !== 'localhost'
    ? ['UA-45975690-4', { debug: false, sampleRate: 100 }]
    : [null, {}]

export { GATrackingId, GASettings }
