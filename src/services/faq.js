import React from 'react'
import {Text, Row, Spacer, Bullet} from '../components'

const answer2 = (
    <>
        <Text>With the ML Wallet App, you can access the following services with transaction limitations depending on your verification level:</Text>
        <Spacer sm />
        {
            ['Add Money', 'Send Money', 'Receive Money', 'Withdraw Money', 'Pay Bills', 'Buy E-Load', 'Buy Items (shop pre-loved jewelry, mobile phone accessories, and other pawnable items)']
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
                'On the Register page, fill in the Username, Password and Transaction PIN fields. Click "Submit" to proceed.',
                `Enter your personal information then click "Next" to proceed. Make sure to review the information entered before proceeding.\n\nFill in the mandatory details for Personal Information step. Click "Next" to proceed.`,
                'Fill in the mandatory details for Address step. Click "Next" to proceed.',
                'For the Identification step, prepare one valid ID from the list as seen on ML Wallet App. Position the chosen ID within the frame then take a picture. Click "Next" to proceed.',
                'Take a selfie for the last step of the Identification step. Click "Next" to proceed.',
                'For the Security step, please select three security questions then fill in the mandatory details. Click "Next" to proceed.',
                'Review and double-check if the information you typed in is correct and accurate.',
                'For the Verification step, please enter your mobile number for the One-Time-Pin (OTP). Your registered mobile number will receive an SMS confirmation. Open the App, re-enter your mobile number, then proceed to the next steps to log in.'
            ]
            .map((item, i) => (
                <>
                    <Text key={i}>Step {i+1}: {item}</Text>
                    <Spacer xs />
                </>
            ))
        }
        <Spacer sm />
        <Text>You will receive a 6-digit authentication code via SMS in the device authentication page. Enter the code to authenticate your device.</Text>
        <Spacer sm />
        <Text>You are now registered and may start using the ML Wallet App.</Text>
    </>
)

const answer5 = (
    <>
        {/*<Text>To upgrade your verification status, follow the steps below</Text>
        <Spacer sm />*/}
        {
            [
                'Visit any of the 2500+ M. Lhuillier branches nationwide for the verification process.',
                'Present your ML Wallet account number to the branch personnel.',
                'Add a minimum of PHP 100.00 to your ML Wallet account to complete verification process.'
            ]
            .map((item, i) => (
                <>
                    <Text key={i}><Text b>Step {i+1}</Text>: {item}</Text>
                    <Spacer xs />
                </>
            ))
        }
        {/*<Spacer sm />
        <Text>Note that all users under the age of 18 years old are automatically tagged as semi-verified. Once the user turns 18 years old, he/she can now upgrade to a fully-verified status by uploading a government issued ID.</Text>*/}
    </>
)

const answer10 = (
    <>
        <Text>Yes! The ML Wallet App is regulated by BSP. In addition, ML Wallet ensures the protection and safety of your account through the following:</Text>
        <Spacer sm />
        {
            [
                'Three-Factor Authentication Process',
                'Username, Password and Transaction PIN',
                'Account Lock-in after five failed password attempts.',
                'Five-minute idle time that logs out the ML Wallet Account automatically.',
                'Device ID, Transaction Locations and IP addresses are recorded.'
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

const answer18 = (
    <>
        <Text>Please contact the following customer care hotlines:</Text>
        
        <Spacer sm />

        <Text><Text b>Toll Free Number:</Text> 1-800-1-0572-3252</Text>
        
        <Spacer sm />
        
        <Text><Text b>Trunk Line:</Text> +63 (32) 260-9290</Text>
        
        <Spacer sm />

        <Text b>Mobile Number:</Text>
        <Text>+63 947-999-0337 (SMART)</Text>
        <Text>+63 917-871-2973 (GLOBE)</Text>

        <Spacer sm />

        <Text><Text b>Email Address:</Text> customercare@mlhuillier.com</Text>
    </>
)

export default [
    {
        index:0,
        title:'ABOUT',
        data:[
            {
                question:'1. What is ML Wallet App?',
                answer:"The ML Wallet App is M. Lhuillier’s official mobile application that allows customers to send and receive money, shop online, buy load (e-load), and pay bills using a smartphone."
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
                answer:'Fully verifying your ML Wallet account allows you to increase wallet size, add money, withdraw money and send money limits.'
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
                question:'6. How can I add money to my ML Wallet account?',
                answer:'Visit any of the 2500+ M Lhuillier branches nationwide to add money to your ML Wallet account. You can either present your Add Money QR Code or fill-up the ML Kwarta Padala Form.'
            },
            {
                question:'7. Is there maximum wallet size?',
                answer:'The ML Wallet App allows a maximum wallet size of Php 200,000.00 for fully-verified users and PHP 40,000.00 for semi-verified users.'
            },
            {
                question:'8. What is the maximum amount per transaction?',
                answer:'The maximum Send Money amount per transaction is Php 50,000.00. If the transaction is more than Php 50,000 pesos, the ML Wallet user should split the amount. For example, if you need to Send Money Php 100,000.00, split the amount to two transactions which will process as Php 50,000.00 and another Php 50,000.00.'
            }
        ]
    },
    {
        index:4,
        title:'SECURITY',
        data:[
            {
                question:'9. How do I keep my ML Wallet account safe?',
                answer:'Your ML Wallet Account is your responsibility! Do not share your Username, Password and Transaction PIN to anyone. Please keep your mobile devices secure.'
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
                answer:'Yes, M Lhuillier has over 2500 branches nationwide.'
            },
            {
                question:'12. Can I access my ML Wallet account in more than one device?',
                answer:'Yes, but you will be notified via text message and e-mail every time you access your ML Wallet account in a different device.'
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
                answer:'Call ML Customer Care for temporary deactivation of your account.'
            },
            {
                question:'15. What do I do if my account gets hacked?',
                answer:'Call ML Customer Care for temporary deactivation of your account.'
            },
            {
                question:'16. What will I do if I forget my password?',
                answer:`You can reset your password by clicking “Forgot Password” in the ML Wallet App’s log-in page.\nYou can either receive the temporary password through your SMS or E-mail after answering the security questions.\nYou may also contact ML Customer Care to reset your password.`
            },
            {
                question:'17. What will I do if I forget my Transaction PIN?',
                answer:`You can reset your Transaction PIN by clicking “Forgot PIN” on any validation screens before proceeding with transactions. You can either receive the temporary PIN through your SMS or E-mail after answering the security questions.\n\nYou may also contact ML Customer Care to reset your PIN.`
            },
            {
                question:'18. How do I reach ML Wallet customer care?',
                answer:answer18
            }
        ]
    }
]