import React from 'react'
import Particles from 'react-particles'
import { loadFireworksPreset } from 'tsparticles-preset-fireworks'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'




const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

function App() {
  const particlesInit = async (engine) => {
    await loadFireworksPreset(engine);
  }


  const startTime = Date.now() / 1000; // Menggunakan UNIX timestamp dalam detik
  const endTime = new Date('2024-12-31T23:59:59').getTime() / 1000; // Menggunakan UNIX timestamp dalam detik

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <>
      {<Particles init={particlesInit} options={{ preset: 'fireworks', autoPlay: true }} />}
      <div className='bg'>
        <span>
          TAHUN BARU 2025
        </span>
      </div>
      <div className="App">
{/*         <CountdownCircleTimer
          {...timerProps}
          colors="#00ccff"
          duration={daysDuration}
          initialRemainingTime={remainingTime}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer> */}
        <CountdownCircleTimer
          {...timerProps}
          colors="#d333ff"
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
          })}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors="#b8fa7a"
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
          })}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors="#cfa91f"
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > 0
          })}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("seconds", getTimeSeconds(elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </div>
    </>
  )
}

export default App
