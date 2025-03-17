import React, { useState, useEffect } from "react";

const GaussianTimer = () => {
  const [meanSeconds, setMeanSeconds] = useState(5);
  const [stdDev, setStdDev] = useState(1);
  const [sides, setSides] = useState(6);
  const [isRunning, setIsRunning] = useState(false);
  const [rolls, setRolls] = useState([]);
  const [nextRollTime, setNextRollTime] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Styles
  const styles = {
    container: {
      maxWidth: "550px",
      margin: "0 auto",
      padding: "32px",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    header: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "24px",
      color: "#111",
    },
    description: {
      fontSize: "18px",
      marginBottom: "32px",
      lineHeight: "1.5",
      color: "#333",
    },
    controlsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
      marginBottom: "24px",
      maxWidth: "100%",
    },
    inputGroup: {
      marginBottom: "32px",
      position: "relative",
      maxWidth: "100%",
    },
    label: {
      display: "block",
      fontSize: "16px",
      fontWeight: "500",
      marginBottom: "8px",
      color: "#444",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "16px",
      backgroundColor: "#fafafa",
      transition: "border-color 0.2s, box-shadow 0.2s",
      boxSizing: "border-box",
    },
    countdownContainer: {
      textAlign: "center",
      padding: "24px",
      backgroundColor: "#f8fafc",
      borderRadius: "10px",
      marginBottom: "20px",
      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
    },
    countdownText: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#1e40af",
    },
    progressBarContainer: {
      width: "100%",
      backgroundColor: "#e2e8f0",
      borderRadius: "9999px",
      height: "12px",
      marginTop: "16px",
      overflow: "hidden",
    },
    progressBar: {
      backgroundColor: "#3b82f6",
      height: "12px",
      borderRadius: "9999px",
      transition: "width 0.1s ease",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    },
    rollsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "32px",
    },
    rollCircle: {
      width: "42px",
      height: "42px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      backgroundColor: "#e5e7eb",
      fontSize: "18px",
      fontWeight: "500",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s",
    },
    rollCircleSuccess: {
      backgroundColor: "#10b981",
      color: "white",
      transform: "scale(1.1)",
      boxShadow: "0 4px 6px rgba(16, 185, 129, 0.3)",
    },
    button: {
      padding: "14px 28px",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      border: "none",
      fontSize: "18px",
      transition: "transform 0.1s, box-shadow 0.1s",
    },
    startButton: {
      backgroundColor: "#3b82f6",
      color: "white",
      boxShadow: "0 4px 6px rgba(59, 130, 246, 0.3)",
    },
    stopButton: {
      backgroundColor: "#ef4444",
      color: "white",
      boxShadow: "0 4px 6px rgba(239, 68, 68, 0.3)",
    },
  };

  // Box-Muller transform to generate normally distributed random numbers
  const generateGaussian = (mean, stdDev) => {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
  };

  // Generate a random die roll between 1 and sides
  const rollDie = () => {
    return Math.floor(Math.random() * sides) + 1;
  };

  // Start the timer
  const startTimer = () => {
    setIsRunning(true);
    // Only clear rolls when starting a new session
    setRolls([]);
    // Schedule first roll
    const firstRollDelay = Math.max(0.5, generateGaussian(meanSeconds, stdDev));
    setNextRollTime(Date.now() + firstRollDelay * 1000);
  };

  // Stop the timer
  const stopTimer = () => {
    setIsRunning(false);
    setNextRollTime(null);
    setTimeRemaining(null);
    setCountdown(null);
    // We don't clear the rolls array anymore, so the final 1 remains visible
  };

  // Effect for timer logic
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        const now = Date.now();

        // If it's time for the next roll
        if (nextRollTime && now >= nextRollTime) {
          const result = rollDie();
          const newRolls = [...rolls, result];
          setRolls(newRolls);

          // Stop if we rolled a 1
          if (result === 1) {
            stopTimer();
            return;
          }

          // Schedule next roll
          const nextDelay = Math.max(
            0.5,
            generateGaussian(meanSeconds, stdDev)
          );
          setNextRollTime(now + nextDelay * 1000);
        }

        // Update countdown display
        if (nextRollTime) {
          const remaining = Math.max(0, (nextRollTime - now) / 1000);
          setTimeRemaining(remaining);
          setCountdown(remaining.toFixed(1));
        }
      }, 100); // Update every 100ms for smooth countdown
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, nextRollTime, rolls, meanSeconds, stdDev, sides]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Gaussian Timer</h1>

      <div>
        <p style={styles.description}>
          Roll a {sides}-sided die with random timing and stop when a 1 is
          rolled
        </p>

        <div style={styles.controlsGrid}>
          <div>
            <label style={styles.label}>Mean time (seconds):</label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={meanSeconds}
              onChange={(e) =>
                setMeanSeconds(Math.max(0.5, Number(e.target.value)))
              }
              disabled={isRunning}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Standard deviation:</label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={stdDev}
              onChange={(e) => setStdDev(Math.max(0.1, Number(e.target.value)))}
              disabled={isRunning}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Die sides:</label>
          <input
            type="number"
            min="2"
            max="100"
            value={sides}
            onChange={(e) =>
              setSides(Math.min(100, Math.max(2, Number(e.target.value))))
            }
            disabled={isRunning}
            style={styles.input}
          />
        </div>
      </div>

      {/* Always show rolls section if there are rolls */}
      {(isRunning || rolls.length > 0) && (
        <div style={{ marginBottom: "24px" }}>
          {isRunning && (
            <div style={styles.countdownContainer}>
              <span style={styles.countdownText}>{countdown}</span>
              <div style={styles.progressBarContainer}>
                <div
                  style={{
                    ...styles.progressBar,
                    width: `${Math.min(
                      100,
                      (timeRemaining / meanSeconds) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          )}

          <div style={styles.rollsContainer}>
            {rolls.map((roll, index) => (
              <div
                key={index}
                style={{
                  ...styles.rollCircle,
                  ...(roll === 1 ? styles.rollCircleSuccess : {}),
                }}
              >
                {roll}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={isRunning ? stopTimer : startTimer}
        style={{
          ...styles.button,
          ...(isRunning ? styles.stopButton : styles.startButton),
        }}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default GaussianTimer;
