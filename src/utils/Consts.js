import DeviceInfo from 'react-native-device-info'

export default {
	baseURL:'http://192.168.19.30/api/',
	deviceId:DeviceInfo.getDeviceId(),
	deviceType:'Handset',
	appName:DeviceInfo.getApplicationName(),
	appVersion:8,//DeviceInfo.getVersion(),
	db:{
		app:'AppDB',
		user:'UserDB'
	},
	user_max_age:100,
	user_min_age:16,
	allowed_idle_time:300000,//in milliseconds - 300000
	password_criteria: {
		minLength:8,
		hasNum:true,
		hasSpecialChar:true
	},
	tcn: {
		stw: {
			code:'stw',
			action:'send',
			short_desc:'Wallet to Wallet',
			long_desc:'Send Money - Wallet to Wallet',
			submit_text:'Send Money',
			otp:'Send Money'
		},
		skp: {
			code:'skp',
			action:'send',
			short_desc:'Kwarta Padala',
			long_desc:'Send Money - Kwarta Padala',
			submit_text:'Send Money',
			otp:'Send Money'
		},
		stb: {
			code:'stb',
			action:'send',
			short_desc:'Bank Transfer',
			long_desc:'Send Money - Bank Transfer',
			submit_text:'Send Money',
			otp:'Send Money'
		},
		rmd: {
			code:'rmd',
			action:'receive',
			short_desc:'Receive Money',
			long_desc:'Receive Money - Domestic',
			submit_text:'Receive Money',
			otp:'Receive Money'
		},
		rmi: {
			code:'rmi',
			action:'receive',
			short_desc:'Receive Money',
			long_desc:'Receive Money - International',
			submit_text:'Receive Money',
			otp:'Receive Money'
		},
		wdc: {
			code:'wdc',
			action:'withdraw',
			short_desc:'Withdraw Money',
			long_desc:'Withdraw Money',
			submit_text:'Withdraw Money',
			otp:'Verify'
		},
		bpm: {
			code:'bpm',
			action:'pay',
			short_desc:'Bills Payment',
			long_desc:'Bills Payment',
			submit_text:'Pay',
			otp:'Submit'
		},
		bul: {
			code:'bul',
			action:'load',
			short_desc:'Buy eLoad',
			long_desc:'Buy eLoad',
			submit_text:'Buy eLoad',
			otp:'Verify'
		}
	}
}