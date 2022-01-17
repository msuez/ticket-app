import React, { useContext, useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../contexts/SocketContext';

const { Title, Text } = Typography;

export const CreateTicket = () => {

    useHideMenu(true);

    const { socket } = useContext(SocketContext);
    const [ ticket, setTicket ] = useState({});
    console.log(ticket);
    const newTicket = () => {
        socket.emit('create-ticket', null, (ticket) => {
            setTicket( ticket );
        });
    }

    return (
    <>
        <Row>
            <Col span={ 14 } offset={ 6 } align="center">
                <Title>Press the button to create a new ticket</Title>
                <Button
                    type="primary"
                    shape="round"
                    icon={ <DownloadOutlined /> }
                    size="large"
                    onClick={ newTicket }
                    >
                    New ticket
                </Button>
            </Col>
        </Row>
        {
            ticket && (
                <Row style={{ marginTop: 100 }}>
                    <Col span={ 14 } offset={ 6 } align="center">
                        <Text level={ 2 }>
                            Your number
                        </Text>
                        <br />
                        <Text type="success" style={{ fontSize: 55 }}>
                            { ticket.number }
                        </Text>
                    </Col>
                </Row>
            )  
        }
    </>
    )
}
