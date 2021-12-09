import React, { useState } from 'react'
import { Sidebar, SidebarItem } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faComments } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const SideBar = () => {
    const [item, setItem] = useState('Home');
        
        
        
    const handleOnSelect = (event: React.MouseEvent<HTMLElement, MouseEvent>, selectedItem: string) => {
        setItem(selectedItem);
    }
        
    return (
        <Sidebar selectedItem={item} onSelect={handleOnSelect} id="sidebar-1">
            <Link to="/"><SidebarItem icon={<FontAwesomeIcon icon={faHome} />} name="Notification" label="Notification" /></Link>
            <Link to="/chat"><SidebarItem icon={<FontAwesomeIcon icon={faComments} />} name="Chat" label="Chat" /></Link>
        </Sidebar>
    );
        
}
