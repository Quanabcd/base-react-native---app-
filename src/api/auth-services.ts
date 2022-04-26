import { ApiService } from './base-service';
import { API_CONFIG } from './constants';

export class AuthServices extends ApiService {
    loginPhone = async (phone: string, password: string) => this.api().post(API_CONFIG.LOGIN, this.buildFormData({
        phone,
        password
    }));

    registerAuth = async (phone: string, email: string, full_name: string, password: string) => this.api().post(API_CONFIG.REGISTER, this.buildFormData({
        email,
        password,
        full_name,
        phone
    }));

    otpActive = async (id: number, otp: string) => this.api().post(API_CONFIG.OTP_ACTIVE, this.buildFormData({
        id,
        otp
    }));

    getInformationAuth = async () => this.api().get(API_CONFIG.GET_USER_INFO);

}

