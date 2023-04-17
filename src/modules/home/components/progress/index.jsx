import { Progress } from "@nextui-org/react"
import { useState, useEffect, useCallback } from "react"


const WaitingProgress = ({ wait }) => {
    const [value, setValue] = useState(0)

    const updater = useCallback(() => {
        if (value < 100) {
            setValue(prev => prev + 1)
        }
    }, [value])
    useEffect(() => {
        const intervalDuration = wait / 100 * 1000
        const timer = setInterval(updater, intervalDuration)
        setTimeout(() => clearInterval(timer), wait * 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])
    return <Progress value={value} color="gradient" animated />

}
export default WaitingProgress