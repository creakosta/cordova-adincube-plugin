var bridge = cordova.require("cordova-plugin-adincube.AdinCubeBridge");

var fallbackInterstitialEventListener = null;
var fallbackBannerEventListener = null;
var fallbackRewardedEventListener = null;
var fallbackUserConsentListener = null;

var adinCubeEventListener = function(sEventToDispatch) {
	if(sEventToDispatch == null || sEventToDispatch == undefined) {
		return;
	} else if(sEventToDispatch == "OK") {
		return;
	} else {
		var eventToDispatch = sEventToDispatch.split(":");
		var detail = null;
		if(eventToDispatch.length > 1)
			detail = eventToDispatch[1];
		try {
			var customDelegateEvent = document.createEvent('CustomEvent');
			customDelegateEvent.initCustomEvent(eventToDispatch[0], true, true, detail);
			document.dispatchEvent(customDelegateEvent);
		} catch(ex) {
			switch(eventToDispatch[0]) {
				case "AIC-Interstitial-onAdCached":
					if (fallbackInterstitialEventListener != null) fallbackInterstitialEventListener.onAdCached();
					break;
				case "AIC-Interstitial-onAdShown":
					if (fallbackInterstitialEventListener != null) fallbackInterstitialEventListener.onAdShown();
					break;
				case "AIC-Interstitial-onError":
					if (fallbackInterstitialEventListener != null) fallbackInterstitialEventListener.onError(detail);
					break;
				case "AIC-Interstitial-onAdClicked":
					if (fallbackInterstitialEventListener != null) fallbackInterstitialEventListener.onAdClicked();
					break;
				case "AIC-Interstitial-onAdHidden":
					if (fallbackInterstitialEventListener != null) fallbackInterstitialEventListener.onAdHidden();
					break;
				case "AIC-Banner-onError":
					if (fallbackBannerEventListener != null) fallbackBannerEventListener.onError(detail);
					break;
				case "AIC-Banner-onAdLoaded":
					if (fallbackBannerEventListener != null) fallbackBannerEventListener.onAdLoaded();
					break;
				case "AIC-Banner-onAdShown":
					if (fallbackBannerEventListener != null) fallbackBannerEventListener.onAdShown();
					break;
				case "AIC-Banner-onAdClicked":
					if (fallbackBannerEventListener != null) fallbackBannerEventListener.onAdClicked();
					break;
				case "AIC-Rewarded-onAdCompleted":
					if (fallbackRewardedEventListener != null) fallbackRewardedEventListener.onAdCompleted();
					break;
				case "AIC-Rewarded-onAdFetched":
					if (fallbackRewardedEventListener != null) fallbackRewardedEventListener.onAdFetched();
					break;
				case "AIC-Rewarded-onFetchError":
					if (fallbackRewardedEventListener != null) fallbackRewardedEventListener.onFetchError(detail);
					break;
				case "AIC-Rewarded-onAdShown":
					if (fallbackRewardedEventListener != null) fallbackRewardedEventListener.onAdShown();
					break;
				case "AIC-Rewarded-onError":
					if (fallbackRewardedEventListener != null) fallbackRewardedEventListener.onError(detail);
					break;
				case "AIC-Rewarded-onAdClicked":
					if (fallbackRewardedEventListener != null) fallbackRewardedEventListener.onAdClicked();
					break;
				case "AIC-Rewarded-onAdHidden":
					if (fallbackRewardedEventListener != null) fallbackRewardedEventListener.onAdHidden();
					break;
				case "AIC-UserConsent-onAccepted":
					if (fallbackUserConsentEventListener != null) fallbackUserConsentEventListener.onAccepted();
					break;
				case "AIC-UserConsent-onDeclined":
					if (fallbackUserConsentEventListener != null) fallbackUserConsentEventListener.onDeclined();
					break;
				case "AIC-UserConsent-onError":
					if (fallbackUserConsentEventListener != null) fallbackUserConsentEventListener.onError(detail);
					break;
			}
		}
        
	}
}

var AdinCubeInterstitial = {
	init: function() {
		bridge.interstitial.init(adinCubeEventListener, null);
	},
	isReady: function() {
		var trueCallback = null;
		var falseCallback = null;
		switch (arguments.length) {
			case 1:
				trueCallback = arguments[0];
				break;
			case 2:
				trueCallback = arguments[0];
				falseCallback = arguments[1];
				break;
			default:
				return;
		}
		var successCallback = function(messageOrEventToDispatch) {
			if (messageOrEventToDispatch.indexOf("interstitial_isReady-") == 0) {
				var isReady = messageOrEventToDispatch.substr("interstitial_isReady-".length);
				if (isReady == "true") {
					trueCallback();
				} else if (falseCallback != null) {
					falseCallback();
				}
			} else {
				adinCubeEventListener(messageOrEventToDispatch);
			}
		};
		bridge.interstitial.isReady(successCallback, null);
	},
	show: function() {
		bridge.interstitial.show(adinCubeEventListener, null);
	},
	setEventListener: function(eventListener) {
		fallbackInterstitialEventListener = eventListener;
	}
};

var AdinCubeBanner = {
	setRespectSafeArea: function(safeArea, respectSafeArea) {
		bridge.banner.setRespectSafeArea(safeArea, respectSafeArea, adinCubeEventListener, null);
	},
	load: function(size, position) {
		bridge.banner.load(size, position, adinCubeEventListener, null);
	},
	show: function(size, position) {
		bridge.banner.show(size, position, adinCubeEventListener, null);
	},
	hide: function() {
		bridge.banner.hide(adinCubeEventListener, null);
	},
	getSize: function() {
		if (arguments.length != 1) {
			return;
		}
		var sizeCallback = arguments[0];
		var successCallback = function(messageOrEventToDispatch) {
			if (messageOrEventToDispatch.indexOf("banner_getSize-") == 0) {
				var size = messageOrEventToDispatch.substr("banner_getSize-".length);
				var width = parseInt(size.substr(0, size.indexOf('x')));
				var height = parseInt(size.substr(size.indexOf('x')+1, size.length));
				sizeCallback(width, height);
			} else {
				adinCubeEventListener(messageOrEventToDispatch);
			}
		};
		bridge.banner.getSize(successCallback, null);
	},
	setVisible: function(visible) {
		bridge.banner.setVisible(visible, adinCubeEventListener, null);
	},
	setEventListener: function(eventListener) {
		fallbackBannerEventListener = eventListener;
	},
	Size: {
		BANNER_AUTO: "BANNER_AUTO",
		BANNER_320x50: "BANNER_320x50",
		BANNER_728x90: "BANNER_728x90"
	},
	Position: {
		TOP: "TOP",
		TOP_RIGHT: "TOP_RIGHT",
		TOP_LEFT: "TOP_LEFT",
		BOTTOM: "BOTTOM",
		BOTTOM_RIGHT: "BOTTOM_RIGHT",
		BOTTOM_LEFT: "BOTTOM_LEFT"
	}
};

var AdinCubeRewarded = {
	fetch: function() {
		bridge.rewarded.fetch(adinCubeEventListener, null);
	},
	isReady: function() {
		var trueCallback = null;
		var falseCallback = null;
		switch (arguments.length) {
			case 1:
				trueCallback = arguments[0];
				break;
			case 2:
				trueCallback = arguments[0];
				falseCallback = arguments[1];
				break;
			default:
				return;
		}
		var successCallback = function(messageOrEventToDispatch) {
			if (messageOrEventToDispatch.indexOf("rewarded_isReady-") == 0) {
				var isReady = messageOrEventToDispatch.substr("rewarded_isReady-".length);
				if (isReady == "true") {
					trueCallback();
				} else if (falseCallback != null) {
					falseCallback();
				}
			} else {
				adinCubeEventListener(messageOrEventToDispatch);
			}
		};
		bridge.rewarded.isReady(successCallback, null);
	},
	show: function() {
		bridge.rewarded.show(adinCubeEventListener, null);
	},
	setEventListener: function(eventListener) {
		fallbackInterstitialEventListener = eventListener;
	}
};

var AdinCubeUserConsent = {
	ask: function() {
		bridge.userConsent.ask(adinCubeEventListener, null);
	},
	setAccepted: function() {
		bridge.userConsent.setAccepted(adinCubeEventListener, null);
	},
	setDeclined: function() {
		bridge.userConsent.setDeclined(adinCubeEventListener, null);
	},
	setEventListener: function(eventListener) {
		fallbackUserConsentEventListener = eventListener;
	}
};

var AdinCubeUserInfo = {
	setAge: function(age) {
		bridge.userInfo.setAge(age, adinCubeEventListener, null);
	},
	setGender: function(gender) {
		bridge.userInfo.setGender(gender, adinCubeEventListener, null);
	},
	setMaritalStatus: function(maritalStatus) {
		bridge.userInfo.setMaritalStatus(maritalStatus, adinCubeEventListener, null);
	},
	setLocation: function(latitudeInDegrees, longitudeInDegrees) {
		bridge.userInfo.setLocation(latitudeInDegrees, longitudeInDegrees, adinCubeEventListener, null);
	},
	Gender: {
		MALE: "MALE",
		FEMALE: "FEMALE"
	},
	MaritalStatus: {
		SINGLE: "SINGLE",
		MARRIED: "MARRIED"
	}
};

var AdinCube = {
	setAndroidAppKey: function(appKey) {
		if(window.device.platform == "Android") {
			bridge.setAppKey(appKey, adinCubeEventListener, null);
		}
	},
	setIOSAppKey: function(appKey) {
		if(window.device.platform == "iOS") {
			bridge.setAppKey(appKey, adinCubeEventListener, null);
		}
	},
	logNative: function(message) {
		bridge.logNative(message, adinCubeEventListener, null);
	},
	toastNative: function(message) {
		bridge.toastNative(message, adinCubeEventListener, null);
	},
	interstitial: AdinCubeInterstitial,
	banner: AdinCubeBanner,
	rewarded: AdinCubeRewarded,
	userConsent: AdinCubeUserConsent,
	userInfo: AdinCubeUserInfo,
	SafeArea: {
		TOP: "TOP",
		RIGHT: "RIGHT",
		BOTTOM: "BOTTOM",
		LEFT: "LEFT"
	}
};

module.exports = AdinCube;