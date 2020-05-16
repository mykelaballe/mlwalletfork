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

const answer3 = (
    <>
        <Text>Depending on our relationship and/or the products or services availed or will be availed from us, we collect and process <Text b>Personal Information</Text> (any information from which the identity of an individual is apparent of can be reasonably and directly ascertained, or when put together with other information would directly and certainly identify an individual) and <Text b>Sensitive Personal Information</Text> (information about an individual’s race, ethnic origin, marital status, age, color, and religious, philosophical or political affiliations, health, education, genetic or sexual life, proceeding for any offense committed or alleged to have been committed by an individual, government issued IDs and those established by an executive order or an act of Congress to be kept classified) such as but not limited to the following:</Text>
        <Spacer sm />
        {
            [
                'Name',
                'Address',
                'Date and place of birth',
                'Nationality',
                'Civil status',
                'Gender',
                'Contact details',
                'Identification card/document',
                'Photograph',
                'Specimen signature or biometric of the person'
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
        <Spacer sm />
        <Text>And when or where necessary:</Text>
        <Spacer sm />
        {
            [
                'Nature of Work or Activity',
                'School',
                'Source of Income',
                'Link, which refers to either relation or connection to a party or the other party to the transaction, where applicable'
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

const answer4 = (
    <>
        <Text>As non-bank financial institution, regulated by the Bangko Sentral ng Pilipinas (BSP), we collect your information....</Text>
        <Spacer sm />
        {
            [
                'To establish, identify and confirm or verify the identity that you represented or hold out to M Lhuillier.',
                'To process your transaction/s for or application/s of a product or service.',
                'To assist you of your inquiries, concerns or even complaints.',
                'To comply with any legal and regulatory obligations as mandated by the BSP, the Anti-Money Laundering Council (AMLC) and other regulatory bodies.'
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
        <Spacer sm />
        <Text>We also collect your information....</Text>
        <Spacer sm />
        {
            [
                'To understand your need better and to protect your interest and your transaction.',
                'To make sure that the data we hold about you is correct and up-to-date.',
                'To inform you about our new offer/promotions of products and services and to tailor the delivery of our marketing campaigns.'
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

const answer5 = (
    <>
        <Text>We require you to fill up forms or obtain your information in any electronic means and request submission of your identification document to avail of our products and services and other applications (for employment or tie-up agreement).</Text>
    
        <Spacer xs />

        <Text>If you contact us via telephone or customer service hotlines or via websites or thru social media sites to request information about our products and service</Text>

        <Spacer xs />

        <Text>M Lhuillier also collects your information from people acting on your behalf/or duly authorized representative.</Text>

        <Spacer xs />

        <Text>Your personal data may be processed manually and /or electronically.</Text>

        <Spacer xs />

        <Text>M Lhuillier collects personal data only for predefined and lawful purposes.</Text>
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
        answer:answer3
    },
    {
        question:'Why We Collect and Process',
        answer:answer4
    },
    {
        question:'How We Collect and Process',
        answer:answer5
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
        answer:`M Lhuillier implements reasonable and appropriate organizational, physical and technical security measures, to maintain the availability, integrity and confidentiality, and for the protection of personal data collected, processed and stored against any accidental or unlawful destruction, alteration, disclosure and processing.\n\nM Lhuillier makes sure that only authorized personnel shall have access on your personal data: that there is proper orientation and training program for employees, agents or representatives, regarding privacy and security policies and as regards the extent of their obligations thereunder.`
    }
]