import React, { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';

import { useHideMenu } from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUserStorage';
import { SocketContext } from '../contexts/SocketContext';

const { Title, Text } = Typography;

export const Desktop = () => {

    useHideMenu(false);

    const [user] = useState( getUserStorage() );
    const { socket } = useContext( SocketContext );
    const [ ticket, setTicket ] = useState(null);
    const history = useNavigate();

    const handleExit = () => {
        localStorage.clear();
        history('/signin', { replace: true });
    }

    const nextTicket = () => {
        socket.emit('next-ticket', user, ( ticket ) => {
            setTicket( ticket );
        });
    }

    if( !user.agent || !user.desktop ) {
        return <Navigate to="/desktop" />
    }

    return (
    <>
        <Row>
            <Col span={ 20 }>
                <Title level={ 2 } >{ user.agent }</Title>
                <Text>You are working in the desktop: </Text>
                <Text type="success">{ user.desktop }</Text>
            </Col>
            <Col span={ 4 } align="right">
                <Button
                    shape="round"
                    type="danger"
                    onClick={ handleExit }
                    >
                    <CloseCircleOutlined />
                    Exit
                </Button>
            </Col>
        </Row>
        <Divider />

        {
            ticket && (
                <Row>
                    <Col>
                        <Text>Your are attending the ticket: </Text>
                        <Text
                            style={{ fontSize: 30 }}
                            type="danger"
                            >
                            { ticket.number }
                        </Text>
                    </Col>
                </Row>
            )
        }        
        <Row>
            <Col offset={ 18 } span={ 6 } align="right">
                <Button
                    onClick={ nextTicket }
                    shape="round"
                    type="primary"
                    >
                    <RightOutlined />
                    Next
                </Button>
            </Col>
        </Row>
    </>
    )
}
