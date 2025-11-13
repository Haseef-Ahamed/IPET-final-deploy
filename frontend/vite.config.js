import { defineConfig } from 'vitest/config'
export default defineConfig({
  // test: {
  //   environment: 'jsdom',
  //   globals: true,
  //   setupFiles: "./src/setupTests.js"
    
  // }
  test: {
  // other options...
  // Mocks out accidental asset/image imports
  resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
  setupFiles: "./src/setupTests.js",
  globals: true,
  environment: 'jsdom',
  alias: {
    // mock all image imports, SVGs, etc.
    '\\.(jpg|jpeg|png|gif|svg)$': './__mocks__/fileMock.js'
  }
}
}
)