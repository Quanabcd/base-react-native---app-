import { ApiService } from './base-service';
import { API_CONFIG } from './constants';

export class CommonServices extends ApiService {
    getNews = async () => this.requestSavedData(API_CONFIG.GET_NEWS, {});

    getBanners = async () => this.requestSavedData(API_CONFIG.GET_BANNERS, {});

    getNotify  = async (offset: number, limit: number) => this.api().post(API_CONFIG.GET_LIST_NOTIFY, this.buildFormData({
        offset,
        limit
    }));

    getProduces = async () =>this.api().get(API_CONFIG.GET_PRODUCT);

    getProductDetails = async (id?:number) =>this.api().get(`${API_CONFIG.GET_PRODUCT_DETAILS}/${id}`, {});

    getCity = async () =>this.requestSavedData(API_CONFIG.GET_CITY, {});

    getDistrict = async (id?:number) =>this.requestSavedData(`${API_CONFIG.GET_DiSTRICT}/${id}`, {});

    getWard = async (id?:number) =>this.requestSavedData(`${API_CONFIG.GET_WARD}/${id}`, {});
    
}

