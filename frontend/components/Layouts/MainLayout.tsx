import { ReactElement, useEffect } from 'react';
import Router from 'next/router';
import { useLoadingProgress } from '../../lib/loadingProgress';
import { Container, Flex } from '@chakra-ui/react';

type Props = {
    children: ReactElement | ReactElement[]
  }

const MainLayout = ({ children, ...props }: Props) => {
    // 1. useLoadingProgress hook
    const { start, done } = useLoadingProgress()

    // 2. onRouterChangeStart
    const onRouteChangeStart = () => {
        start()
    }

    // 3. onRouterChangeComplete
    const onRouteChangeComplete = () => {
        setTimeout(() => {
            done()
        }, 1)
    }

    // 4. Subscribe to router events
    useEffect(() => {
        Router.events.on('routeChangeStart', onRouteChangeStart)
        Router.events.on('routeChangeComplete', onRouteChangeComplete)
        Router.events.on('routeChangeError', onRouteChangeComplete)

        return () => {
            Router.events.off('routeChangeStart', onRouteChangeStart)
            Router.events.off('routeChangeComplete', onRouteChangeComplete)
            Router.events.off('routeChangeError', onRouteChangeComplete)
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default MainLayout;