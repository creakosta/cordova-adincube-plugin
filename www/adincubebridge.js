var AdinCubeInterstitialBridge = {
    init: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'interstitial_init',
            []
        ); 
    },
    isReady: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'interstitial_isReady',
            []
        );
    },
    show: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'interstitial_show',
            []
        ); 
    }
};

var AdinCubeBannerBridge = {
    setRespectSafeArea: function(safeArea, respectSafeArea, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'banner_setRespectSafeArea',
            [safeArea, respectSafeArea]
        );
    },
    load: function(size, position, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'banner_load',
            [size, position]
        );
    },
    show: function(size, position, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'banner_show',
            [size, position]
        );
    },
    hide: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'banner_hide',
            []
        );
    },
    getSize: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'banner_getSize',
            []
        );
    },
    setVisible: function(visible, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'banner_setVisible',
            [visible]
        );
    }
}

var AdinCubeRewardedBridge = {
    fetch: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'rewarded_fetch',
            []
        ); 
    },
    isReady: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'rewarded_isReady',
            []
        );
    },
    show: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'rewarded_show',
            []
        ); 
    }
};

var AdinCubeUserConsentBridge = {
    ask: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'userconsent_ask',
            []
        );
    },
    setAccepted: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'userconsent_setAccepted',
            []
        );
    },
    setDeclined: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'userconsent_setDeclined',
            []
        );
    }
};

var AdinCubeUserInfoBridge = {
    setAge: function(age, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'userinfo_setAge',
            [age]
        ); 
    },
    setGender: function(gender, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'userinfo_setGender',
            [gender]
        ); 
    },
    setMaritalStatus: function(maritalStatus, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'userinfo_setMaritalStatus',
            [maritalStatus]
        ); 
    },
    setLocation: function(latitude, longitude, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'userinfo_setLocation',
            [latitude, longitude]
        ); 
    },
}

var AdinCubeBridge = {
	setAppKey: function(appKey, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'setAppKey',
            [appKey]
        ); 
    },
    logNative: function(message, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'logNative',
            [message]
        ); 
    },
    toastNative: function(message, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdinCubeBridge',
            'toastNative',
            [message]
        ); 
    },
    interstitial: AdinCubeInterstitialBridge,
    banner: AdinCubeBannerBridge,
    rewarded: AdinCubeRewardedBridge,
    userConsent: AdinCubeUserConsentBridge,
    userInfo: AdinCubeUserInfoBridge
}

module.exports = AdinCubeBridge;