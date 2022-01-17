import { useContext, useEffect } from 'react';
import { UiContext } from '../contexts/UiContext';

export const useHideMenu = ( hide ) => {
    
    const { showMenu, hideMenu } = useContext(UiContext);

    useEffect(() => {
        
        if( hide === true ) {
            hideMenu();
        } else {
            showMenu();
        }

    }, [ hide, hideMenu, showMenu ]);

}
