export default class CachedDataSingleton {
  static instance: CachedDataSingleton;
  cachedData: any;

  constructor() {
    this.cachedData = {};
  }

  get(key: string) {
    return this.cachedData[key];
  }

  setKey(key: string, value: any) {
    return (this.cachedData[key] = value);
  }

  set(cachedData: any) {
    this.cachedData = cachedData;
  }

  static getInstance() {
    return CachedDataSingleton.instance
      ? CachedDataSingleton.instance
      : (CachedDataSingleton.instance = new CachedDataSingleton());
  }
}
