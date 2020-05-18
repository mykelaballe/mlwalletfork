import React from 'react'
import {Text, Row, Spacer, Bullet} from '../components'

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
                        <Bullet />
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

const answer6 = (
    <>
        <Text>M Lhuillier uses your personal data to process your transaction, to carry out our obligations to our licensing government institution/s, and to you, as part of our agreement, and to maintain and manage your records with us.</Text>
    
        <Spacer xs />

        <Text>When we contact/send you communication about the transaction/product or services you availed of.</Text>

        <Spacer xs />

        <Text>When we use your information to comply with our legal obligations with regulatory  or law enforcement bodies.</Text>

        <Spacer xs />

        <Text>We store, maintain and retain your personal data in a secured and safe place for a period of five (5) years from your last transaction and contact with us, and for as long as required by AMLA, BSP rules, and relevant laws and regulations.</Text>

        <Spacer xs />

        <Text>For  job applicants, who did not qualify or pursue their employment, application records are retained for one (1) year.</Text>

        <Spacer xs />

        <Text>We may keep your information longer than indicated if deemed necessary for legal, regulatory, or technical reasons.</Text>

        <Spacer xs />

        <Text>We may also keep it for research or statistical purposes.  If we do so for these reasons, we make sure that your privacy is protected and only use it for such specified purposes. The company is committed to taking good care of your personal data with stringent security measures in place.</Text>

        <Spacer xs />

        <Text>We dispose of it/them in a secure manner through shredding, burning and/or anonymization of data where applicable, and after clearance from proper department within the company.</Text>
    </>
)

const answer8 = (
    <>
        {
            [
                {
                    id:1,
                    mainText:'Right to be informed.',
                    subText:'To be informed as to reason of collecting, processing, use and storing of your personal data.'
                },
                {
                    id:2,
                    mainText:'Right to object on how your information was used.',
                    subText:'To object to the use of your information for legitimate interests including automated processing or profiling and direct marketing. However, doing so may disallow M Lhuillier to provide you with the service requested, or with the appropriate advice needed. Except that processing of data pursuant to a subpoena, when necessary or desirable in the context of an employer-employee relationship, or as a result of legal obligation, where consent of customer is not necessary.'
                }
            ]
            .map((item, i) => (
                <>
                    <Text key={i}>{item.id}. <Text b>{item.mainText}</Text> {item.subText}</Text>
                    <Spacer xs />
                </>
            ))
        }

        <Spacer xs />
        <Text>If you wish, M Lhuillier may stop sending you marketing messages tailored to your need. However, you might still see some general marketing messages from us, but these won’t be targeted to you. In any event, such promotional email or SMS communication contain instructions on how to unsubscribe.</Text>
        <Spacer xs />

        {
            [
                {
                    id:3,
                    mainText:'Right to access your information.',
                    subText:'To ask M Lhuillier for a copy of any information we hold of you. This is called a Data Subject Access Request (DSAR). This will also help M Lhuillier to ensure and maintain the accuracy of the information collected and being used.'
                },
                {
                    id:4,
                    mainText:'Right to rectification.',
                    subText:'To ask M Lhuillier to correct your information held by it that you feel inaccurate or incomplete or both. M Lhuillier will immediately and accordingly act on it unless it finds the request unreasonable.'
                }
            ]
            .map((item, i) => (
                <>
                    <Text key={i}>{item.id}. <Text b>{item.mainText}</Text> {item.subText}</Text>
                    <Spacer xs />
                </>
            ))
        }

        <Spacer xs />
        <Text>M Lhuillier will cause the rectification or updating of your data to the organization whom it shared your personal data with.</Text>
        <Spacer xs />

        {
            [
                {
                    id:5,
                    mainText:'Right to data portability.',
                    subText:'To obtain and reuse your personal data for your own purposes across different services. It allows you to move, copy or transfer personal data easily from one IT environment to another in a safe and secure way, without affecting its usability.'
                },
                {
                    id:6,
                    mainText:'Right to Erasure or Blocking.',
                    subText:'To suspend, withdraw or order the blocking, removal or destruction of your personal data. You can exercise this right upon discovery and substantial proof that your personal data is incomplete, outdated, false, or unlawfully obtained or used; or where the right to use retention of what is otherwise proper, true and correct, has already ceased/expired.'
                }
            ]
            .map((item, i) => (
                <>
                    <Text key={i}>{item.id}. <Text b>{item.mainText}</Text> {item.subText}</Text>
                    <Spacer xs />
                </>
            ))
        }

        <Spacer xs />
        <Text>M Lhuillier will update its data sharing and outsourcing agreement, if any, and where applicable, to effectuate this right and be consistent with this obligation.</Text>
        <Spacer xs />

        {
            [
                {
                    id:7,
                    mainText:'Right to damages.',
                    subText:'To be indemnified for any damages sustained due to such inaccurate, incomplete, outdated, false, unlawfully obtained, or unauthorized use of, personal data.'
                },
                {
                    id:8,
                    mainText:'Right to complain.',
                    subText:'You may seek assistance from any of M Lhuillier’s branch personnel, customer care hotline, or through the contact information provided herein.'
                }
            ]
            .map((item, i) => (
                <>
                    <Text key={i}>{item.id}. <Text b>{item.mainText}</Text> {item.subText}</Text>
                    <Spacer xs />
                </>
            ))
        }

        <Spacer xs />

        <Text>Please note that our opinion pertaining to your request may differ for any legal, regulatory or technical issues.</Text>
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
        answer:answer6
    },
    {
        question:'Who We Share Your Personal Data With',
        answer:'M Lhuillier discloses or shares your personal data, as required by law, rules or legal arrangements, to our affiliated companies, remittance and business tie-up/partners that support the operation of the business when required to do so under the data sharing or outsourcing agreement, financial and legal consultants, and as directed/required by law through legal processes.'
    },
    {
        question:'Know About Your Rights',
        answer:answer8
    },
    {
        question:'Limitation of Rights',
        answer:'The preceding rights in relation to processing of your personal data shall not apply if such is being used for the purpose of scientific/statistical research, or investigations in relation to criminal, administrative or tax liabilities that you are involved with and provided that M Lhuillier only processes the same when it is deemed necessary to the maximum extent, to achieve the purpose of research and or investigation.'
    },
    {
        question:'Confidentiality and Security',
        answer:`M Lhuillier implements reasonable and appropriate organizational, physical and technical security measures, to maintain the availability, integrity and confidentiality, and for the protection of personal data collected, processed and stored against any accidental or unlawful destruction, alteration, disclosure and processing.\n\nM Lhuillier makes sure that only authorized personnel shall have access on your personal data: that there is proper orientation and training program for employees, agents or representatives, regarding privacy and security policies and as regards the extent of their obligations thereunder.`
    }
]