import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Text, Row, Spacer, Bullet} from '../components'
import {Colors} from '../themes'
import * as NavigationService from '../utils/NavigationService'

/*const answer22 = (
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
)*/

const answer1 = (
    <>
        {
            [
                'Quick Cash Loans',
                'Money Transfer Services',
                'Money Changing/Foreign Exchange Dealing',
                'Bills Payment',
                'ML Diamond Card',
                'Insurance',
                'Jewelry',
                'Telco & TV Load'
            ]
            .map((item, i) => (
                <>
                    <Row key={i}>
                        <Bullet color={Colors.brand} />
                        <Text>{item}</Text>
                    </Row>
                    <Spacer xs />
                </>
            ))
        }
    </>
)

const answer2 = (
    <>
        <Text>(Natural persons whose personal data we process)</Text>
        <Spacer sm />
        {
            [
                'Financial and non-fictional Customers and their beneficiaries, where applicable',
                "Tie-Up Partners and Corporate Partners' and Remittance Sub-Agents' Individual Stockholders, Directors Senior Officers, Beneficial Owners and other Stakeholders, who are natural persons and their customers",
                'Suppliers and/or their authorized representatives',
                'Job Applicants',
                'Employees and their beneficiaries'
            ]
            .map((item, i) => (
                <>
                    <Text key={i}>{i+1}: {item}</Text>
                    <Spacer xs />
                </>
            ))
        }
    </>
)

export default [
    {
        question:'Our Products and Services',
        answer:answer1
    },
    {
        question:'Our Data Subject',
        answer:answer2
    },
    {
        question:'What We Collect and Process',
        answer:''
    },
    {
        question:'Why We Collect and Process',
        answer:''
    },
    {
        question:'How We Collect and Process',
        answer:''
    },
    {
        question:'How We Use, Store, Retain and Dispose',
        answer:''
    },
    {
        question:'Who We Share Your Personal Data With',
        answer:''
    },
    {
        question:'Know About Your Rights',
        answer:''
    },
    {
        question:'Limitation of Rights',
        answer:''
    },
    {
        question:'Confidentiality and Security',
        answer:''
    }
]