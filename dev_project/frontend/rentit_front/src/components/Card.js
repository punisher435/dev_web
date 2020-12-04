import React from 'react';

import { Card } from 'antd';

import CardDeck from 'react-bootstrap/CardDeck'
const { Meta } = Card;


function ImageCard(){
    return (
        <CardDeck>
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
        
        </CardDeck>
        
    )
}

export default ImageCard;
