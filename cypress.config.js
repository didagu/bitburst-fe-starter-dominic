import { defineConfig } from "cypress";
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/dist/plugin'

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,

  e2e: {
    setupNodeEvents(on, config) {
      config = getCompareSnapshotsPlugin(on, config);
    },
    baseUrl: 'http://localhost:8484',
  },
});
