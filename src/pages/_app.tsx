// ** React Imports
import React, { ReactNode } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import { withApollo } from '@api/apollo'
import { defaultACLObj } from '@configs/acl'
import themeConfig from '@configs/themeConfig'

// ** Fake-DB Import
// import { store } from 'src/store'

// ** Third Party Import
// import { Toaster } from 'react-hot-toast'
import { Loader } from '@googlemaps/js-api-loader'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import AclGuard from '@compCore/components/auth/AclGuard'
import ThemeComponent from '@compCore/theme/ThemeComponent'
import AuthGuard from '@compCore/components/auth/AuthGuard'
import GuestGuard from '@compCore/components/auth/GuestGuard'
import WindowWrapper from '@compCore/components/window-wrapper'

// ** Spinner Import
import Spinner from '@compCore/components/spinner'

// ** Contexts
import { AuthProvider } from '@context/AuthContext'

// import { ShipmentProvider } from '@context/ShipmentContext'
// import { StripeProvider } from '@context/StripeContext'
// import { ModalProvider } from '@context/ModalContext'
// import { ChatProvider } from '@context/ChatContext'
// import { ServiceCenterProvider } from '@context/ServiceCenterContext'
// import { NotificationProvider } from '@context/NotificationContext'
// import { StatisticsProvider } from '@context/StatisticsContext'

import {
  SettingsConsumer,
  SettingsProvider,
} from '@compCore/context/settingsContext'

// // ** Styled Components
// import ReactHotToast from '@compCore/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from '@compCore/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  debugger
  if (!guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  // const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  debugger
  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  const aclAbilities = Component.acl ?? defaultACLObj

  new Loader({
    //@ts-ignore
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ['places'],
  })

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta name="description" content={`${themeConfig.templateName}`} />
        <meta name="keywords" content="" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  <WindowWrapper>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      <AclGuard
                        aclAbilities={aclAbilities}
                        guestGuard={guestGuard}
                      >
                        {getLayout(<Component {...pageProps} />)}
                      </AclGuard>
                    </Guard>
                  </WindowWrapper>
                </ThemeComponent>
              )
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </AuthProvider>
    </CacheProvider>
  )
}

export default withApollo(App)
