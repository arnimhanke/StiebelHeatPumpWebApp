import '../../ressources/style/header.css';

import * as React from 'react';
import { Navbar } from 'react-bootstrap';

import { Sidebar } from '../sidebar/SideBarContainer';

export class Header extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return (
            <div>
                <Sidebar/>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Text>
                            Heizungssuite
                        </Navbar.Text>
                    </Navbar.Header>
                </Navbar>
            </div>
        );
    }

}
