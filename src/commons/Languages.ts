const Languages = {
    tabs: {
        product: 'Sản phẩm',
        assets: 'Tài sản',
        topUp: 'Nạp tiền',
        transactions: 'Giao dịch',
        help: 'Trợ giúp'
    },
    common: {
        cancel: 'Hủy',
        OK: 'Chọn',
        back: 'Quay lại',
        yes: 'Có',
        no: 'Không',
        close: 'Đóng',
        search: 'Tìm kiếm',
        agree: 'Đồng ý',
        or: 'Hoặc',
        continue: 'Tiếp tục',
        currency: 'VND',
        percent: '%'
    },
    errorMsg: {
        noInternet: 'Kết nối bị gián đoạn, vui lòng thử lại!',
        sessionExpired: 'Kết nối bị gián đoạn, vui lòng thử lại!',
        userNameRequired: 'Họ và tên không được để trống',
        userNameLength: 'Họ và tên không được ít hơn 8 ký tự',
        userNameRegex: 'Họ và tên không được chứa ký tự đặc biệt hoặc số',
        emailNull: 'Email không được để trống',
        emailRegex: 'Email không đúng định dạng',
        cardNull: 'Số CMND/CCCD không được để trống',
        cardRegex: 'Số CMND/CCCD phải là số',
        cardCheck: 'Số CMND/CCCD không hợp lệ',
        pwdNull: 'Mật khẩu không được để trống',
        pwdCheck: 'Mật khẩu không được ít hơn 6 ký tự',
        conFirmPwd: 'Xác nhận mật khẩu không trùng khớp với mật khẩu',
        emptyAmount: 'Bạn chưa nhập số tiền',
        minAmount: 'Số tiền nạp tối thiểu là 100.000 vnđ',
        phoneIsEmpty: 'Số điện thoại không được để trống',
        phoneRegex: 'Số điện thoại không đúng định dạng',
        phoneCount: 'Số điện thoại chỉ được 10 số',
        jobEmpty: 'Nghề nghiệp không được để trống',
        taxIdEmpty: 'Mã số thuế không được để trống',
        taxIdSyntax: 'Mã số thuế không được dài hơn 15 ký tự',
        birthdayEmpty: 'Ngày sinh không được để trống',
        birthdayNotNumber: 'Ngày sinh không đúng định dạng ví dụ: 01/01/1970',
        birthdayAge18: 'Chưa đủ 18 tuổi',
        birthdayAge95: 'Vượt quá 95 tuổi',
        errProvince: 'Thành phố không được bỏ trống',
        errDistrict: 'Quận huyện không được bỏ trống',
        errWars: 'Xã phường không được bỏ trống',
        errFunds: 'Nguồn tiền không được bỏ trống',
        errMoveto: 'Chuyển tới không được bỏ trống',
        errKeyBook: 'Mã sổ không được bỏ trống',
        errMsgOldPwdCompare: 'Mật khẩu cũ bạn nhập không đúng',
        errMsgCurrentPwdCompare: 'Mật khẩu nhập lại không trùng khớp',
        errMsgEmpty: 'Mật khẩu nhập không được để trống',
        errMsgLength: 'Mật khẩu nhập phải từ 8 kí tự trở lên',
        errMsgSpecialChar: 'Mật khẩu nhập không được chứa kí tự đặc biệt',
        errMsgSpaceChar: 'Mật khẩu nhập không được chứa kí tự trống',
        errMsgUpperChar: 'Mật khẩu phải có 1 kí tự in hoa'
    },
    biometry: {
        useFingerprint: 'Đăng nhập bằng vân tay của bạn',
        useFingerPrintError: 'Vân tay không khớp, vui lòng thử lại.',
        useFingerPrintManyTimesError: 'Bạn đã nhập sai quá nhiều lần, vui lòng nhập mã pin.'
    },
    noInternet: {
        offline: 'Kết nối bị gián đoạn',
        desNoInternet: 'Kết nối bị gián đoạn, vui lòng thử lại!'
    },
    location: {
        PermissionAlert: 'PermissionAlert',
        AccessLocationServices: 'AccessLocationServices',
        OpenSetting: 'OpenSetting',
        Cancel: 'Cancel'
    },
    image: {
        camera: 'Camera',
        library: 'Thư viện ảnh',
        permissionAlert: 'Yêu cầu truy cập',
        accessPhotoMsg: 'Univest cần truy cập vào thư viện ảnh của bạn',
        accessCameraMsg: 'Univest cần truy cập vào camera của bạn',
        accessAddPhotoMsg: 'Univest cần thêm ảnh vào thư viện ảnh của bạn',
        openSetting: 'Mở cài đặt',
        deny: 'Từ chối',
        uploading: 'Đang tải ảnh',
        singleUploading: 'Đang tải ảnh lên',
        selectedThumb: 'Đã chọn hình đại diện',
        selectAsThumb: 'Đặt làm hình đại diện',
        uploadFailed: 'Xảy ra lỗi trong quá trình tải ảnh lên'
    },
    onBoarding: [
        {
            title: 'Uy tín 5 sao',
            des: 'Univest được tin tưởng bởi các nhà đầu tư tín dụng uy tín. Hơn 100.000.000 người dùng tin tưởng và sử dụng'
        },
        {
            title: 'Kiếm tiền mọi lúc mọi nơi',
            des: 'Univest với các gói đầu tư đa dạng với lãi suất khủng, bạn có thể kiếm tiền ngay cả khi đang ngủ !'
        },
        {
            title: 'Tích luỹ cho tương lai',
            des: 'Univest tích luỹ dài hạn với lãi xuất lên tới 4% / năm. Đầu tư ngay nền móng cho tương lai'
        }
    ],
    home: {
        title: 'Trang chủ'
    },
    screenNames: {
        login: 'Login'
    },
    auth: {
        phone: 'Số điện thoại',
        name: 'Họ và tên',
        referral: 'Mã giới thiệu',
        pwd: 'Mật khẩu',
        saveInfo: 'Lưu thông tin đăng nhập',
        login: 'Đăng nhập',
        repeatPwd: 'Nhập lại mật khẩu',
        email: 'Email',
        register: 'Đăng ký'
    },
    topUp: {
        amount: 'Nhập số tiền bạn muốn nạp',
        placeHolder: '0',
        confirm: 'Xác nhận'
    },
    product: {
        hotNews: 'Hôm nay có gì mới',
        productIsSelling: 'Sản phẩm đang bán',
        unlimitedAccumulation: 'Tích lũy không kỳ hạn',
        accumulation1: 'Tích lũy kỳ hạn 1 tháng',
        accumulation3: 'Tích lũy kỳ hạn 3 tháng',
        accumulation6: 'Tích lũy kỳ hạn 6 tháng',
        securityWarning:
      'Hãy cập nhật thông tin của bạn để đảm bảo an toàn tài khoản',
        email: 'Email',
        contact: 'Hợp đồng',
        any: 'eKYC',
        phone: 'Điện thoại',
        account: 'Tài khoản',
        trust: 'Univest có gì để bạn tin tưởng',
        shouldUse: 'Univest được các nhà đầu tư khuyên dùng',
        joinWithCommunity: 'Tham gia cộng đồng Univest',
        peopleJoining: '10.000.000 người',
        joinNow: 'Tham gia ngay',
        investor: 'Nhà đầu tư mới',
        product: 'Sản phẩm',
        drawMoney: 'Rút tiền, nạp tiền',
        utilities: 'Sừ dụng Univest dễ dàng',
        information: 'Thông tin của bạn',
        investNow: 'Đầu tư ngay',
        intro: 'Giới thiệu sản phẩm',
        package: 'Gói',
        welcome: 'Welcome',
        today: 'Today, ',
        interest: 'Lãi suất',
        year : '/năm',
        dot : '• ',
        form: 'Hình thức'
    },
    assets: {
        totalAssets: 'Tổng tài sản',
        growUpByPeriod: 'Tăng trưởng trong kỳ',
        percentByPeriod: 'Phần trăm tăng trưởng',
        topUp: 'Nạp tiền',
        accumulatedAssets: 'Tài sản tích luỹ',
        totalAccumulatedAssets: 'Tổng tài sản tích luỹ',
        bonds: 'Trái phiếu',
        receivedInterest: 'Lãi đã nhận',
        receivedTemp: 'Lãi tạm tính',
        methodReceivedInterest: 'Phương thức nhận lãi',
        topUpMore: 'Nạp thêm',
        convert: 'Chuyển đổi',
        withdraw: 'Rút tiền',
        flow: 'Dòng tiền',
        filter: [
            'Từ đầu',
            '7 ngày',
            '1 tháng',
            '3 tháng',
            '6 tháng',
            '9 năm',
            '1 năm'
        ],
        my: 'Của tôi',
        referral: 'Giới thiệu',
        unlimited: 'Không kỳ hạn',
        accumulation: 'Tích luỹ',
        accumulationDetail: 'Chi tiết tích luỹ',
        recentTransaction: 'Giao dịch gần đây',
        topUpAccumulation: 'Nạp tiền tích luỹ',
        withdrawAccumulation: 'Rút tiền khỏi sổ',
        withdrawAccumulationToAccount: 'Rút tiền về tài khoản',
        balance: 'Sổ tích luỹ đang có',
        withdrawn: 'Sổ tích luỹ đã rút',
        bookInfo: 'Thông tin sổ tích luỹ',
        history: 'Lịch sử đáo hạn',
        withdrawBeforeDate: 'Rút tiền trước hạn',
        autoExpiration: 'Tự động đáo hạn'
    },
    accumulate: {
        intro: 'Giới thiệu về Tích luỹ',
        products: 'Các sản phẩm hiện có',
        rate: '% / năm'
    },
    confirmOtp: {
        title: 'Xác nhận OTP',
        enterOTP: 'Hãy nhập và xác nhận mã OTP',
        confirm: 'Xác nhận',
        sendAgain: 'Gửi lại mã',
        message: 'Mã xác thưhc đã được gửi đến số điện thoại',
        resendMess: '.Mã hết hiệu lực sau ',
        popupOtpErrorTitle: 'Thông báo OTP',
        popupOtpErrorDescription: 'OTP không chính xác',
        popupOtpSuccessDescription: 'Đăng ký thành công',
        popupOtpResendCode: 'Mã OTP đã hết hạn. Vui lòng gửi lại'
    },
    convert: {
        title: 'Chuyển đổi',
        alert:
      'Khi thực hiện chuyển đổi gói tích luỹ lãi suất tăng trưởng gói cũ sẽ được tính theo lãi tăng trưởng của gói không kỳ hạn',
        funds: 'Nguồn tiền',
        accumulate: 'Tích luỹ không kỳ hạn với lãi suất lên tới 4% /năm',
        moveto: 'Chuyển tới',
        moneyConvert: 'Nhập số tiền cần chuyển đổi',
        entermoneyconvert: 'Nhập số tiền cần chuyển',
        saving: 'Chọn sổ tiết kiệm cần chuyển đổi',
        enterSaving: 'Chọn sổ cần chuyển đổi',
        amount: 'Số tiền trong sổ',
        keyBook: 'Mã sổ'
    },
    quickAuThen: {
        title: 'Mật khẩu và đăng nhập',
        quickButton: 'Sử dụng xác thực nhanh',
        fingerAuThen: 'Bảo mật vân tay',
        faceid: 'Nhận diện khuôn mặt',
        pin: 'Mã Pin',
        changePwd: 'Chỉnh sửa mật khẩu',
        confirm: 'Xác thực của bạn',
        useFaceId: 'Đăng nhập nhanh bằng Face ID',
        useTouchId: 'Đăng nhập nhanh bằng vân tay',
        facIdConFirm:
      'Quý khách có muốn sử dụng Face ID làm phương thức xác thực chính',
        touchIdConfirm:
      'Quý khách có muốn sử dụng vân tay làm phương thức xác thực chính',
        passcodeConfirm:
      'Quý khách có muốn sử dụng mã pin làm phương thức xác thực chính',
        description: 'Đăng nhập bằng vân tay của bạn',
        useFaceID:'Sử dụng Face ID để đăng nhập vào Univest',
        useTouchID:'Sử dụng Touch ID để đăng nhập vào Univest',

        goToSetting: 'Cài đặt',
        desSetPasscode: 'Vui lòng thêm mã PIN để cài đặt xác thực nhanh',
        desSetTouchId:'Vui lòng thêm vân tay để xác thực nhanh',
        desSetFaceId:'Vui lòng thêm Face ID để xác thực nhanh',
        successAddTouchId: 'Đã thêm vân tay vào xác thực nhanh của bạn',
        successAddFaceId: 'Đã thêm Face ID vào xác thực của bạn'
    },
    changePwd: {
        title: 'Thay đổi mật khẩu',
        oldPass: 'Mật khẩu cũ',
        newPass: 'Mật khẩu mới',
        currentNewPass: 'Nhập lại mật khẩu mới',
        placeOldPass: 'Nhập mật khẩu cũ',
        placeNewPass: 'Nhập mật khẩu mới',
        button: 'Xác nhận đổi mật khẩu'
    },
    account: {
        title: 'Thông tin người dùng',
        hello: 'Xin chào',
        invite: 'Mời bạn bè',
        help: 'Hỗ trợ',
        createSupport: 'Tạo yêu cầu hỗ trợ',
        userManual: 'Hướng dẫn sử dụng',
        commonQuestion: 'Câu hỏi thường gặp',
        feedBack: 'Góp ý',
        setting: 'Thông tin cá nhân',
        logout: 'Đăng xuất',
        support: 'Hỗ trợ',
        accountDraw: 'Thông tin tài khoản',
        join: 'Tham gia cộng đồng',
        passwordAndLogin: 'Mật khẩu và đăng nhập',
        electricContract: 'Hợp đồng điện tử',
        confirmKYC: 'Đã xác thực chứng từ',
        errKYC: 'Chưa xác thực chứng từ'
    },
    information: {
        title: 'Thông tin cá nhân',
        sex: 'Giới tính',
        birthday: 'Ngày sinh',
        phone: 'Số điện thoại',
        address: 'Địa chỉ',
        job: 'Nghề nghiệp',
        taxId: 'Mã số thuế',
        email: 'Email',
        confirmAccount: 'Thông tin chứng từ',
        up: 'Mặt trước CMND',
        under: 'Mặt sau CMND',
        fullName: 'Họ và tên',
        city: 'Thành phố',
        district: 'Quận huyện',
        village: 'Xã phường',
        keybook: 'Mã sổ'
    },
    editProfile: {
        title: 'Chỉnh sửa thông tin',
        updateInfo: 'Cập nhật thông tin'
    },

    support: {
        title: 'Hỗ trợ',
        createRequest: 'Tạo yêu cầu hỗ trợ',
        hotline: 'Hotline',
        maNual: 'Hướng dẫn sử dụng',
        question: 'Câu hỏi thường gặp',
        feedBack: 'Góp ý cho Univest',
        questionScreen: 'Những câu hỏi thương gặp',
        phone: '0967283881'
    },
    paymentMethod: {
        title: 'Chọn cách rút tiền',
        bank: 'Chuyển khoản ngân hàng',
        vimo: 'Ví điện tử Vimo',
        nganLuong: 'Ví điện tử Ngân lượng',
        bankForm:'Ngân hàng',
        vimoForm: 'Vimo',
        nganLuongForm: 'Ngân lượng'
    },
    transaction: {
        types: ['Tất cả', 'Nạp tiền', 'Rút tiền', 'Chuyển đổi'],
        filter: 'Bộ lọc',
        all: 'Tất cả',
        accumulation: 'Tích luỹ'
    },
    invite: {
        header: 'Mời bạn bè',
        title:
      'Giới thiệu bạn bè tham gia Univest nhận ngay phần thường giá trị lên tới 3.000.000 VND',
        qrCode: 'Quét Qr Code',
        inviteId: 'Mã giới thiệu của bạn'
    },
    linkAccount: {
        header: 'Thông tin tài khoản',
        accountNganLuong: 'Tài khoản Ngân Lượng',
        accountViMo: 'Tài khoản ViMo',
        accountBank: 'Tài khoản ngân hàng',
        linkNow: 'Liên kết ngay'
    },
    cashFlow: {
        title: 'Dòng tiền'
    },
    notification: {
        title: 'Thông báo',
        noNotify: 'Không có thông báo.'
    },
    errorBiometryType: {
        NOT_DEFINE: 'Vui lòng thêm ít nhất 1 vân tay vào thiết bị của bạn',
        // ios
        RCTTouchIDNotSupported: 'Không hỗ trợ xác thực vân tay trên thiết bị này',
        RCTTouchIDUnknownError:
      'Đăng nhập thất bại nhiều lần, vui lòng đăng nhập với mật khẩu',
        LAErrorTouchIDNotEnrolled:
      'Vui lòng thêm ít nhất 1 xác thực vân tay vào thiết bị của bạn',
        LAErrorTouchIDNotAvailable:
      'Không có sẵn xác thực nhanh trên thiết bị của bạn',
        ErrorFaceId:
      'Vui lòng thêm ít nhất 1 xác thực Face ID vào thiết bị của bạn',
        // android
        NOT_SUPPORTED: 'Không hỗ trợ xác thực vân tay trên thiết bị này',
        NOT_AVAILABLE: 'Không hỗ trợ xác thực vân tay trên thiết bị này',
        NOT_ENROLLED:
      'Vui lòng thêm ít nhất 1 xác thực vân tay vào thiết bị của bạn',
        FINGERPRINT_ERROR_LOCKOUT_PERMANENT:
      'Xác thực không thành công, thử lại sau',
        errorWithTouchId:
      'Đăng nhập thất bại nhiều lần nhiều lần, vui lòng đăng nhập với mã PIN'
    },
    setPassCode: {
        titleEnter: 'Xác thực mã PIN',
        titleSetPasscode: 'Sử dụng mã PIN để xác thực nhanh',
        repeat: 'Nhập lại mã PIN',
        errorSet: 'Mã PIN trước và mã PIN sau không trùng khớp',
        errorEnter: 'Mã PIN không đúng',
        footerText: 'Tiếp tục'
    },
    withDrawFromAccount: {
        titleScreen: 'Rút tiền về tài khoản',
        detailTransaction: 'Chi tiết giao dịch',
        formOfReceivingMoney: 'Hình thức nhận tiền',
        beneficiaryName: 'Tên thụ hưởng',
        receiver: 'Người nhận',
        account: 'Số tài khoản',
        moneyWithDraw: 'Số tiền rút',
        date: 'Ngày thực hiện',
        confirm: 'Xác nhận',
        current: 'VNĐ',
        bankTemplate: 'Ngân hàng  VP Bank'
    }
};

export default Languages;
