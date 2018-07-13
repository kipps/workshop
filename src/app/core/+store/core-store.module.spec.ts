import { CoreStoreModule } from './core-store.module';

describe('CoreStoreModule', () => {
  let coreStoreModule: CoreStoreModule;

  beforeEach(() => {
    coreStoreModule = new CoreStoreModule();
  });

  it('should create an instance', () => {
    expect(coreStoreModule).toBeTruthy();
  });
});
