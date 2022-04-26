import { makeObservable, observable } from 'mobx';

import { ApiServices} from '@/api';
import { UserManager } from '@/managers/UserManager';
import { NetworkManager } from '@/managers/NetworkManager';
import { FastAuthInfo } from '@/managers/FastAuthenInfo';

class AppStore {
  @observable userManager = new UserManager();

  @observable networkManager = new NetworkManager();

  @observable fastAuthInfo = new FastAuthInfo();

  apiServices = new ApiServices();

  constructor() {
      makeObservable(this);
  }
}

export type AppStoreType = AppStore;
export default AppStore;
