import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Text, Row, Spacer, Bullet} from '../components'
import * as NavigationService from '../utils/NavigationService'

const answer2 = (
    <>
        <Text>With the ML Wallet App, you can access the following services with limitations depending on your verification level:</Text>
        <Spacer sm />
        {
            ['Send Money', 'Receive Money', 'Withdraw Cash', 'Pay Bills', 'Buy Load', 'Buy Items']
            .map((item, i) => (
                <Row key={i}>
                    <Bullet />
                    <Text>{item}</Text>
                </Row>
            ))
        }
        <Spacer sm />
        <Text>Aside from these core services, ML Wallet users can also check their account balance, view transaction history, and check mobile send-out rates.</Text>
    </>
)

const answer3 = (
    <>
        {
            [
                'Download the ML Wallet App through Google Play Store (Android users) or Apple App Store (iOS users).',
                'Open the ML Wallet App once installed and click “Create Account” on the bottom part of the home page.',
                'On the Register page, fill in the username and password fields and click “Next” to proceed.',
                'Fill in the mandatory details for Personal Details step. Click “Next” to proceed.',
                'Fill in the mandatory details for Address step. Click “Next” to proceed.',
                'For the Identification step, prepare one valid ID from the list as seen on ML Wallet App. Position the chosen ID within the frame then take a picture. Click “Next” to proceed.',
                'Take a selfie for the last step of the Identification step. Click “Next” to proceed.',
                'For the Security step, please select three security questions then fill in the mandatory details. Click “Next” to proceed.',
                'Double-check if the information you typed in is correct and accurate.',
                'For the Verification step, please enter your mobile number for the One-Time-Pin (OTP). Your registered mobile number will receive an SMS confirmation. Open the app, reenter your mobile number, then proceed to the next steps to log in. You will receive a 6-digit verification code via SMS in the device authentication page. Enter the code to authenticate your device.'
            ]
            .map((item, i) => (
                <>
                    <Text key={i}>Step {i+1}: {item}</Text>
                    <Spacer xs />
                </>
            ))
        }
        <Spacer sm />
        <Text>After these steps, you will be registered as a semi-verified user. To upgrade to a fully-verified user, see FAQs on Verification.</Text>
    </>
)

const answer4 = (
    <>
        <Text>Fully verifying your ML Wallet account allows users to increase wallet size, cash in, cash out and send money limits. See transaction limits below according to each level:</Text>
    </>
)

const answer5 = (
    <>
        {
            [
                'Visit any of the 2500+ M. Lhuillier branches nationwide for the verification process.',
                'Show Valid IDs to the branch personnel and deposit between Php 1.00 - Php 50,000.00 to your account to complete verification process.'
            ]
            .map((item, i) => (
                <>
                    <Text key={i}>Step {i+1}: {item}</Text>
                    <Spacer xs />
                </>
            ))
        }
    </>
)

const answer8 = (
    <>
        <Text>The maximum send out amount per transaction depends on your verification level. Please see Transaction Limits Chart below:</Text>
    </>
)

const answer10 = (
    <>
        <Text>The ML Wallet App is regulated by BSP. In addition, ML Wallet ensures the protection and safety of your account through the following:</Text>
        <Spacer sm />
        {
            [
                'One-Device Policy',
                'Three-Factor Authentication Processes',
                'Strong security question process',
                'Username, Pin and Password',
                'Account Lock-in after five failed password attempts',
                'Five-minute idle time that logs out the ML Wallet Account automatically.',
                'Device ID, Transaction Locations and IP addresses are recorded'
            ]
            .map((item, i) => (
                <>
                    <Row key={i}>
                        <Bullet />
                        <Text>{item}</Text>
                    </Row>
                    <Spacer xs />
                </>
            ))
        }
    </>
)

const answer11 = (
    <Text>Yes, M Lhuillier has over 2500 branches nationwide for you to choose from. Find the closest branch near you
        <Text b onPress={() => NavigationService.navigate('Locator')}> here</Text>
    </Text>
)

const answer15 = (
    <>
        <Text>Call ML Wallet Customer Care team immediately or go to a physical M Lhuillier branch. Reach the ML Wallet Customer Care through the following:</Text>
        <Spacer sm />

        <Text><Text b>Phone</Text> 1-800-105-723-252</Text>
        <Text><Text b>E-mail</Text> customercare@mlhuillier.com</Text>
    </>
)

const answer18 = (
    <>
        <Text>You can reach the ML Wallet Customer Care through the following:</Text>
        <Spacer sm />

        <Text><Text b>Mobile</Text> Globe 0917-871-2973, Smart 0947-999-0337</Text>
        <Spacer sm />
        <Text><Text b>E-mail</Text> customercare@mlhuillier.com</Text>
    </>
)

export default [
    {
        index:0,
        title:'ABOUT',
        data:[
            {
                question:'1. What is ML Wallet App?',
                answer:'The ML Wallet App is M. Lhuillier Financial Services’ official mobile application that allows customers to send and receive money, shop online, buy load (e-load), and pay bills using a smartphone.'
            },
            {
                question:'2. What can I do with my ML Wallet App?',
                answer:answer2
            }
        ]
    },
    {
        index:1,
        title:'REGISTRATION',
        data:[
            {
                question:'3. How do I register through the ML Wallet App?',
                answer:answer3
            }
        ]
    },
    {
        index:2,
        title:'VERIFICATION',
        data:[
            {
                question:'4. What are verification levels?',
                answer:answer4
            },
            {
                question:'5. How can I upgrade from semi-verified user to a fully-verified user?',
                answer:answer5
            }
        ]
    },
    {
        index:3,
        title:'TRANSACTIONS',
        data:[
            {
                question:'6. How can I deposit money to my ML Wallet account?',
                answer:'Visit any of the 2500+ M Lhuillier branches nationwide to deposit money to your ML Wallet account. Just present your ML Wallet Account Number to the branch personnel.'
            },
            {
                question:'7. Is there maximum deposit amount?',
                answer:'The ML Wallet App allows a maximum wallet limit of Php 200,000.00.\n\nFor businesses, please contact customer care for more details on ML Wallet Pro for Business*.'
            },
            {
                question:'8. What is the maximum amount per transaction?',
                answer:answer8
            }
        ]
    },
    {
        index:4,
        title:'SECURITY',
        data:[
            {
                question:'9. How do I keep my ML Wallet account safe?',
                answer:'Please keep your devices secure. Do not share sensitive personal information, password or pin to anyone.'
            },
            {
                question:'10. Is my ML Wallet account secured and protected?',
                answer:answer10
            }
        ]
    },
    {
        index:5,
        title:'ACCESSIBILITY',
        data:[
            {
                question:'11. Can I go to any branch?',
                answer:answer11
            },
            {
                question:'12. Can I access my ML Wallet account in more than one device?',
                answer:'To further secure your ML Wallet account, you can only access your ML Wallet account in one device where the account was registered.'
            },
            {
                question:'13. Can I use the ML Wallet App offline?',
                answer:'Internet connection is required for users to access and use the ML Wallet App.'
            }
        ]
    },
    {
        index:6,
        title:'TROUBLESHOOTING',
        data:[
            {
                question:'14. What do I do if my device got lost or stolen?',
                answer:'You can request to remove the device from your ML Wallet account to cut your old device access to your account. Customer Care.'
            },
            {
                question:'15. What do I do if my account gets hacked?',
                answer:answer15
            },
            {
                question:'16. What will I do if I forget my password?',
                answer:'You can reset your password by clicking “Forgot Password” in the ML Wallet App’s log-in page.\n\nYou can either receive the through your SMS or E-mail after answering the security questions.'
            },
            {
                question:'17. What will I do if I forget my PIN?',
                answer:'Please contact the ML Wallet Customer Care team to reset your PIN.'
            },
            {
                question:'18. How do I reach ML Wallet customer care?',
                answer:answer18
            }
        ]
    }
]