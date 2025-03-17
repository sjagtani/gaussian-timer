# Gaussian Timer

A React-based timer that rolls dice at intervals following a Gaussian (normal) distribution. Inspired by Jacob Hilton's Poisson Timer.

## Demo

The live version of this app is available at: [CodeSandbox Demo](https://codesandbox.io/p/sandbox/sharp-ishizaka-ph8czf)

## About

The Gaussian Timer is an interactive tool that demonstrates statistical randomness through a dice-rolling simulation:

- Rolls a die with customizable number of sides
- Time intervals between rolls follow a normal (Gaussian) distribution
- Timer stops when a 1 is rolled
- Visualizes each roll result and highlights the stopping condition

This project was created to explore and visualize the concept of Gaussian distribution in a practical, interactive way.

## Usage

The timer has three customizable parameters:

- **Mean time**: The average interval between dice rolls (in seconds)
- **Standard deviation**: Controls how much the intervals vary from the mean
- **Die sides**: The number of sides on the die (2-100)

Simply set your parameters and click "Start" to begin the simulation.

## Technical Details

This is a standalone React component with no external dependencies. The implementation:

- Uses the Box-Muller transform to generate normally distributed random numbers
- Includes minimum value constraints to ensure reasonable timing intervals
- Provides visual feedback through a countdown timer and progress bar
- Highlights the stopping condition (rolling a 1)

## Installation

To use this in your own React project:

1. Copy the `GaussianTimer.js` file to your project
2. Import the component where needed:
   ```jsx
   import GaussianTimer from './GaussianTimer';
   ```
3. Add it to your JSX:
   ```jsx
   <GaussianTimer />
   ```

## License

MIT License