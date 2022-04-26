export const RSA_MODULE =
  'mUwDmM4v609j6qORK6Xb7r7hwcjkGEdILx6SSH+y4JphiXwrjDUHzkIMKvEygJ93UDOC1XbJEYvP/iNcKV8FngxAA2ymnjpe3GUlUTRoA6aIEt9I0S8acRZniywOtlFAOoqzlEavoEtB6EK6F9KTXNkSNTWXYCei99A4cceZGzE=';
export const RSA_EXPONENT = 'AQAB';

export enum API_CONFIG {
  BASE_URL = 'https://devapi.univest.vn',
  DOMAIN_SHARE = 'https://',

  IMAGES_HOST = 'https://',

  GET_KEY_UPLOAD = '/api/KeyUpload',
  UPLOAD_IMAGE = '/UploadHandler.php',

  // common
  GET_VERSION = '/api/VersionApiStatic',
  GET_BANNERS = '/banner/get_all_home',
  GET_NEWS = '/banner/handbook',
  ENCRYPT = '/api/Encrypt',

  // authentication
  LOGIN = '/app/v1/user/login',
  TOKEN = '/token',
  REFRESH_TOKEN = '/token',
  LOGOUT = '/api/Logout',

  REGISTER = '/app/v1/user/register', // đăng ký tài khoản (univest)
  OTP_ACTIVE = '/app/v1/user/active', // nhận OTP (univest)
  GET_USER_INFO = '/app/v1/user/show', // Thông tin account (univest)
  GET_CITY = '/app/v1/address/city?id=1',
  GET_DiSTRICT = '/app/v1/address/district',
  GET_WARD = '/app/v1/address/ward',
  // notify
  GET_LIST_NOTIFY = '/app/v1/notification/list', // danh sách thông báo(univest)
  // account

  // contracts
  CONTRACTS = 'contract/contract_tempo_by_user', // List danh sách hợp đồng.

  // product 
  GET_PRODUCT = '/app/v1/product/sale',
  GET_PRODUCT_DETAILS = '/app/v1/product/show'
}
