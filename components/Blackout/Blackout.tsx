"use client"

import { isBlackout } from "@/services/PrayerTimeService"
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import { useEffect, useState } from "react"
import Clock from "../Clock/Clock"

export default function Blackout({
  prayerTimeToday,
}: {
  prayerTimeToday: DailyPrayerTime
}) {
  const [blackout, setBlackout] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Force blackout to always be false
      setBlackout(false)
    }, 10 * 1000)
  
    return () => clearInterval(interval)
  }, [setBlackout, prayerTimeToday])

  return (
    <div className="hidden md:block">
      {blackout ? (
        <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity"></div>
      ) : null}
    </div>
  )
}
