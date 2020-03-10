import React from 'react'
import {connect} from 'react-redux'
import {Provider, Screen, Footer, Headline, StaticInput, Text, Row, Spacer, Button, MonthPicker, DayPicker, YearPicker, Prompt} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit My Birthday'
    }

    state = {
        bday_month:moment(this.props.user.birthdate).format('M'),
        bday_day:moment(this.props.user.birthdate).format('D'),
        bday_year:moment(this.props.user.birthdate).format('YYYY'),
        showMonthPicker:false,
        showDayPicker:false,
        showYearPicker:false,
        processing:false,
        showSuccessModal:false
    }

    handleChangeMonth = () => this.setState({showMonthPicker:true})

    handleHideMonthPicker = () => this.setState({showMonthPicker:false})

    handleChangeDay = () => this.setState({showDayPicker:true})

    handleHideDayPicker = () => this.setState({showDayPicker:false})

    handleChangeYear = () => this.setState({showYearPicker:true})

    handleHideYearPicker = () => this.setState({showYearPicker:false})

    handleSelectMonth = bday_month => this.setState({bday_month})

    handleSelectDay = bday_day => this.setState({bday_day})

    handleSelectYear = bday_year => this.setState({bday_year})

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            const {reasons} = this.props.navigation.state.params
            let {bday_month, bday_day, bday_year, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            let res = await API.requestUpdateProfile({
                walletno,
                birthday:`${bday_year}-${bday_month}-${bday_day}`,
                reasons
            })

            if(res.error) Say.some(res.message)
            else {
                this.setState({showSuccessModal:true})
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    handleCloseModal = () => this.setState({showSuccessModal:false})

    render() {

        const {bday_month, bday_day, bday_year, showMonthPicker, showDayPicker, showYearPicker, processing, showSuccessModal} = this.state

        return (
            <Provider>
                <Prompt
                    visible={showSuccessModal}
                    title='Success'
                    message='Your request to change your birthdate has been sent for approval. We will get back to you soon!'
                    onDismiss={this.handleCloseModal}
                />
                
                <Screen>
                    <Headline subtext='Please make sure to enter all the correct details' />

                    <Text md mute>Birthday</Text>
                    <Spacer xs />
                    <Row bw>
                        <StaticInput
                            label='Month'
                            value={bday_month ? moment(bday_month,'M').format('MMM') : null}
                            onPress={this.handleChangeMonth}
                            style={{flex:2}}
                        />
                        <Spacer h xs/>
                        <StaticInput
                            label='Day'
                            value={bday_day}
                            onPress={this.handleChangeDay}
                            style={{flex:1}}
                        />
                        <Spacer h xs/>
                        <StaticInput
                            label='Year'
                            value={bday_year}
                            onPress={this.handleChangeYear}
                            style={{flex:1}}
                        />
                    </Row>
                </Screen>

                <Footer>
                    <Button t={'Save Changes'} onPress={this.handleSubmit} loading={processing} />
                </Footer>

                <MonthPicker initialValue={bday_month} visible={showMonthPicker} onSelect={this.handleSelectMonth} onDismiss={this.handleHideMonthPicker} />

                <DayPicker initialValue={bday_day} visible={showDayPicker} onSelect={this.handleSelectDay} onDismiss={this.handleHideDayPicker} />

                <YearPicker initialValue={bday_year} visible={showYearPicker} onSelect={this.handleSelectYear} onDismiss={this.handleHideYearPicker} />
            </Provider>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)