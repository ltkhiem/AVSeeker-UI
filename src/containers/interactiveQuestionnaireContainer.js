import React, { useState } from 'react'
import { Button, Typography, Space } from 'antd'


const { Text } = Typography


function InteractiveQuestionnairContainer(props) {
    return (
        <>
            <Space>
                <Text style={{ color: "white" }} strong>
                    {/* This is a really long long long long long long long question. */}
                    Question: 
                </Text>

                <Text style={{ color: "white" }} strong>
                    {/* This is a really long long long long long long long question. */}
                    Is there a dog?
                </Text>
                <Button type="primary" style={{ width: 60, height: 30 }}>Yes</Button>
                <Button type="primary" style={{ width: 60, height: 30 }} danger>No</Button>
            </Space>
        </>
    )
}


export default InteractiveQuestionnairContainer;