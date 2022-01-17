import React, { useContext, useEffect, useState } from 'react';
import { List, Col, Row, Typography, Card, Tag, Divider } from 'antd';

import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../contexts/SocketContext';
import { getLastest } from '../helpers/getLastest';

const { Title, Text } = Typography;

export const Queue = () => {

    useHideMenu(true);

    const { socket } = useContext( SocketContext );
    const [ tickets, setTickets ] = useState([]);

    useEffect( () => {
        socket.on('ticket-assigned', (assigned) => {
            setTickets(assigned);
        });
        return () => {
            socket.off('ticket-assigned');
        }
    }, [ socket ]);

    useEffect( () => {
        getLastest().then( setTickets );
    }, []);

    return (
    <>
        <Title level={1}>Attending client</Title>
        <Row>
            <Col span={12}>
                <List 
                    dataSource={ tickets.slice(0, 3) }
                    renderItem={ item => (
                        <List.Item>
                            <Card
                                style={{ width: 300, marginTop: 16 }}
                                actions={[
                                    <Tag color="volcano">{ item.agent }</Tag>,
                                    <Tag color="magenta">Desktop: { item.desktop }</Tag>
                                ]}
                                >
                                <Title>Num.: { item.number }</Title>
                            </Card>
                        </List.Item>
                        )}
                    />
            </Col>
            <Col span={12}>
                <Divider>History</Divider>
                <List 
                    dataSource={ tickets.slice(3) }
                    renderItem={ item => (
                        <List.Item>
                            <List.Item.Meta 
                                title={ `Ticket Num.: ${ item.number }` }
                                description={
                                    <>
                                        <Text type="secondary">Desktop: </Text>
                                        <Tag color="magenta">{ item.desktop }</Tag>
                                        <Text type="secondary">Agent: </Text>
                                        <Tag color="magenta">{ item.agent }</Tag>
                                    </>
                                }
                                />
                        </List.Item>
                    )}
                    />
            </Col>
        </Row>
    </>
    )
}
