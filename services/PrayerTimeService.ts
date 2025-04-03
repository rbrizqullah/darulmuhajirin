import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import moment from "moment"

const blackoutPeriod = process.env.BLACKOUT_PERIOD ?? 13 // defaults to 13 minutes

export function isBlackout(prayerTimes: DailyPrayerTime) {
  const currentTime = moment()
  const congregationTimes = [
    prayerTimes.fajr.congregation_start,
    prayerTimes.zuhr.congregation_start,
    prayerTimes.asr.congregation_start,
    prayerTimes.maghrib.congregation_start,
    prayerTimes.isha.congregation_start,
  ]

  let setBlackoutMode = false

  congregationTimes.forEach((time) => {
    if (
      currentTime >= moment(time, ["HH:mm"]) &&
      currentTime <= moment(time, ["HH:mm"]).add(blackoutPeriod, "m")
    ) {
      setBlackoutMode = true
    }
  })

  return setBlackoutMode
}

export function getNextPrayer(today: DailyPrayerTime) {
  const currentTime = moment();

  const todaysTimes = [
    moment(today.fajr.congregation_start, "HH:mm").subtract(5, "minutes").format("HH:mm"),
    moment(today.zuhr.congregation_start, "HH:mm").subtract(5, "minutes").format("HH:mm"),
    moment(today.asr.congregation_start, "HH:mm").subtract(5, "minutes").format("HH:mm"),
    moment(today.maghrib.congregation_start, "HH:mm").subtract(5, "minutes").format("HH:mm"),
    moment(today.isha.congregation_start, "HH:mm").subtract(5, "minutes").format("HH:mm"),
  ];

  let nextPrayertime = {
    today: false,
    prayerIndex: 0,
  };

  todaysTimes.forEach((time, index) => {
    if (currentTime < moment(time, "HH:mm") && !nextPrayertime.today) {
      nextPrayertime = {
        today: true,
        prayerIndex: index,
      };
    }
  });

  return nextPrayertime;
}