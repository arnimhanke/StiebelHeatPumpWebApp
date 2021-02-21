import '../../ressources/style/header.css';

import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import { Sidebar } from '../sidebar/SideBarContainer';

export class Header extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return (
            <div>
                <Sidebar/>
                <Navbar>
                    <Navbar.Brand>
                        <Navbar.Text>
                            Heizungssuite
                        </Navbar.Text>
                    </Navbar.Brand>
                </Navbar>
            </div>
        );
    }

}
