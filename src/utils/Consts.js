import {Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'

const IS_ANDROID = Platform.OS === 'android'

const PLAYSTORE_URL = 'https://play.google.com/store/apps/details?id=com.mlhuillier.mlwallet&hl=en'
const APPSTORE_URL = 'https://apps.apple.com/ph/app/ml-wallet/id962204987'

const CODEPUSH_ANDROID_DEV = 'Kqa8Z6UvgsdJFruYtR3Mq-rE_nu4rtAjy6-ev'
const CODEPUSH_IOS_DEV = 'yBJeaL3P77cjjC3pZROSybtcceBSmqCXcOKst'

export default {
	is_dev:true,
	is_android:IS_ANDROID,
	//baseURL:'http://192.168.19.30/api/',
	baseURL:'http://ccv078g234jk.mlhuillier1.com/api/',
	deviceId:DeviceInfo.getDeviceId(),
	deviceType:'Handset',
	appName:DeviceInfo.getApplicationName(),
	appVersion:8,//DeviceInfo.getVersion(),
	storeListingUrl:IS_ANDROID ? PLAYSTORE_URL : APPSTORE_URL,
	codepush_key:IS_ANDROID ? CODEPUSH_ANDROID_DEV : CODEPUSH_IOS_DEV,
	companyName:'M Lhuillier',
	db:{
		app:'AppDB',
		user:'UserDB'
	},
	user_max_age:100,
	user_min_age:16,
	allowed_idle_time:5 * 60000,
	checkLocation:true,
	password_criteria: {
		minLength:8,
		hasNum:true,
		hasSpecialChar:true
	},
	country: {
		PH:'Philippines'
	},
	walletNoMask:'[0000] [0000] [0000] [00]',
	mobilePrefixPH:'+63',
	mobileMaskPH:'+63 [000] [000] [0000]',
	error: {
		onlyLetters:'Only letters are accepted',
		onlyLettersInName:'Only letters are accepted in the name field',
		onlyNumbers:'Numbers only',
		onlyAlphaNum:'Letters and Numbers only',
		noSpecialChars:'Letters and Numbers only',
		notAllowedChar:'You used an invalid character',
		email:'Invalid Email Address',
		emailNotAllowedChar:'Numbers, letters, periods (.), underscores (_) and at signs (@) are the only characters allowed',
		birthdate:'Invalid Birthdate',
		mobile:'Invalid mobile number',
		pwdNotMatch:'Passwords do not match',
		network:'You have slow internet connection',
		atl1:'1attempt_left',
		atl2:'2attempt_left',
		blk1d:'block_account_1day',
		blk:'block_account'
	},
	allowedSpecialChars:{
		common:[
			' ','+','-','@','$','(',')','*',"/",':','#',',','=','!','?','.','[',']','{','}','<','>','&','_','%','√','|','\\','~','•','`','...','€','¥','£','¢','α','β','^','®','©','™','π','¤',';'
		],
		email:[
			'@','.','_'
		],
		address:[
			'.','-',',','&','/','\\',' '
		]
	},
	suffixOptions:[
		{label:'Jr.'},
		{label:'Sr.'},
		{label:'I'},
		{label:'II'},
		{label:'III'},
		{label:'IV'},
		{label:'V'},
		{label:'Others'}
	],
	cellular_networks:[
		{
			label:'Globe/TM',
			value:'globe',
			id:'MLNET17030007'
		},
		{
			label:'Smart/TNT',
			value:'smart eload',
			id:'MLNET16060001'
		},
		{
			label:'Smart Dealer',
			value:'smart dealer',
			id:'MLNET17030003'
		},
		{
			label:'Sun Cellular',
			value:'sun cellular',
			id:'MLNET16080001'
		},
		{
			label:'PLDT Global Corp',
			value:'pldt',
			id:''
		}
	],
	tcn: {
		stw: {
			code:'stw',
			action:'send',
			short_desc:'Wallet To Wallet',
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
			short_desc:'Wallet To Bank',
			long_desc:'Send Money - Wallet To Bank',
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
			short_desc:'Buy E-Load',
			long_desc:'Buy E-Load',
			submit_text:'Buy E-Load',
			otp:'Verify'
		},
		rtw: {
			code:'rtw',
			action:'send',
			short_desc:'Wallet To Wallet',
			long_desc:'Send Money - Wallet to Wallet',
			submit_text:'Send Money',
			otp:'Send Money'
		},
		adm: {
			code:'adm',
			action:'deposit',
			short_desc:'Add Money',
			long_desc:'Add Money',
			submit_text:'Add Money',
			otp:'Add Money'
		},
	}
}