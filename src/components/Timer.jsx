import React, { useState, useEffect } from 'react'

const Timer = ({ expiryDate }) => {
    const [time, setTime] = useState("")

    useEffect(() => {
        getTime()
        const cancelId = setInterval(getTime, 1000)

        return () => clearInterval(cancelId)
    }, [])

    function getTime() {
        const millisLeft = expiryDate - Date.now()

        const secondsLeft = millisLeft / 1000
        const minutesLeft = secondsLeft / 60
        const hoursLeft = minutesLeft / 60

        setTime(`${Math.floor(hoursLeft)}h ${Math.floor(minutesLeft) % 60}m ${Math.floor(secondsLeft) % 60}s`)
    }

  return (
    <div className="de_countdown">{time}</div>
  )
}

export default Timer