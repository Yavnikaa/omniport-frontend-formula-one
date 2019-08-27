import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'
import { Dropdown, Header, Image } from 'semantic-ui-react'
import { urlUserNotifications, urlAllNotifications } from '../urls'

import '../css/inline.css'
import { appDetails } from '../utils'

class NotificationsListView extends React.Component {
  state = {
    notifications: [],
    count: 0
  }
  getNotifications = () => {
    axios
      .get(urlUserNotifications())
      .then(res => {
        this.setState({
          notifications: res.data['results'],
          count: res.data['count']
        })
      })
      .catch(err => {
        console.error(err) // TODO: Remove console.log, use error handlers
      })
  }

  componentDidMount () {
    this.getNotifications()
  }

  render () {
    return (
      <>
        {
          this.state.count ? (
            this.state.notifications.map((notification, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  as={Link}
                  to={notification.webOnclickUrl}
                  styleName={'width-80vw max-width-500px'}
                  content={
                    <Header size={'small'}>
                      <Image
                        size='mini'
                        // src={
                        //   appDetails(
                        //     notification.appSubcategory.appInfo.verboseName
                        //   ).details.assets.logo
                        // }
                        src={'https://react.semantic-ui.com/images/avatar/small/rachel.png'}  {/*TODO Remove this*/}
                      />
                      <Header.Content styleName={'max-width-95p'}>
                        {
                          !(notification.appSubcategory.isApp)
                            ? `${notification.appSubcategory.appInfo.verboseName}: `
                            : ''
                        }
                        {
                          notification.appSubcategory.name
                        }
                        <Header.Subheader styleName={'ellipsis'}>
                          {notification.template}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  }
                />
              )
            })
          ) : (
            <Dropdown.Item
              disabled
              key={0}
              text={'No new notifications'}
            />
          )
        }
        {
          (this.state.count && this.state.notifications)
            ? (
              <Dropdown.Item
                as={Link}
                to={urlAllNotifications()}
                key={-1}
                text={'See all'}
              />
            ) : null
        }
      </>
    )
  }
}

export default NotificationsListView
