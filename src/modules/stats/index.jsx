import { Container, styled, StyledLoading, Text } from '@nextui-org/react';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';
import useStats from './hooks/stats';
import { Loading } from "@nextui-org/react";

const Wrapper = styled("div", {
    width: "100%",
    height: "400px"
})

const Stats = () => {
    const stats = useStats();
    useEffect(stats.load, [])
    const data = [...stats.data].reverse()

    return <Container>
        <Text
            h1
            size={60}
            css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                //    letterSpacing:"$"
            }}
            weight="bold"
            s
        >roadmaps per day</Text>
        <Wrapper>
            {
                stats.isLoading ?
                    <>
                        <Loading size='md' />
                    </> :
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeWidth={0.1} />
                            <YAxis />
                            <XAxis dataKey={"created_date"} />
                            <Tooltip />
                            <Legend />
                            <Line label="count" dot={false} type={"monotone"} dataKey="created_count" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
            }
        </Wrapper>
    </Container>;
}
export default Stats