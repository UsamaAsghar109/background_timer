import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import BackgroundTimer from "react-native-background-timer";

const App = () => {
  const [secondsLeft, setSecondsLeft] = useState(162000);
  const [timerOn, setTimerOn] = useState(false);
  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [timerOn]);

  useEffect(() => {
    if (secondsLeft === 162001) {
      BackgroundTimer.stopBackgroundTimer();
      alert("Time completed")
    }
  }, [secondsLeft]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) return secs + 1;
        else return 0;
      })
    }, 1000);
  }

  const classify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor(secondsLeft / 60 % 60);
    let seconds = Math.floor(secondsLeft % 60);

    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    let date = new Date();
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let extendDate = new Date().getDate() + 7;
    date.getFullYear(), date.getMonth(), date.getDate() + 7


    return {
      displayHours,
      displayMins,
      date,
      displaySeconds,
      year,
      month,
      extendDate
    }
  }
  return (
    <View style={{ backgroundColor: 'white' }}>
      <Text>Timer</Text>
      <Text>This is timer of the machine</Text>
      <Text>{classify().displayHours} Hours {classify().displayMins} Mins {classify().displaySeconds}</Text>
      <Text>{classify().extendDate} / {classify().month} / {classify().year}</Text>
      <Button title="start/stop" onPress={() => setTimerOn((current) => !current)}></Button>
    </View>
  );
};


export default App;