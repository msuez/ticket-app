import React from 'react';

import { SocketProvider } from './contexts/SocketContext';
import { UiProvider } from './contexts/UiContext';
import { RouterPage } from './pages/RouterPage';

export const TicketApp = () => {
    return (
        <SocketProvider>
            <UiProvider>
                <RouterPage />
            </UiProvider>
        </SocketProvider>
    )
}
