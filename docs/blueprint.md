# **App Name**: Ctrl+Sea

## Core Features:

- Boat Naming (Baptism): Prompts the user to name their boat if no name is found in local storage. The given name becomes the root for MQTT topics.
- MQTT Connection: Connects to the MQTT broker (wss://mqtt.dev.icam.school:443/mqtt) using the boat name to formulate unique topics.
- Sail Tension Control: A horizontal slider to control sail tension, sending values from -100 to 100 to the MQTT topic bzh/iot/boat/{BOAT_NAME}/actionneurs/voile.
- LCD Text Output: Two input fields (16 characters max) to send text to the LCD screen via the MQTT topic bzh/iot/boat/{BOAT_NAME}/actionneurs/lcd.
- Power Gauge Display: Displays the power gauge value received from the MQTT topic bzh/iot/boat/{BOAT_NAME}/capteurs/potentiometer.
- Watchdog Status: Indicates boat status. Displays an 'Alert/Offline' message if the status topic (bzh/iot/boat/{BOAT_NAME}/status) doesn't receive 'Online' within 7 seconds.
- MQTT Logs Console: Displays chronological MQTT messages (sent and received) with a button to clear the console.

## Style Guidelines:

- Primary color: Deep blue (#295ca3), evocative of the open ocean, promoting a sense of reliability and depth.
- Background color: Light, desaturated blue (#e3e7ed), suggesting the sky above the sea while keeping focus on the elements on the screen.
- Accent color: Yellow (#ffc700), analogous to blue, reminiscent of nautical brass and signaling flags, for highlighting interactive elements.
- Font: 'Belleza' sans-serif font for the headlines, paired with 'Alegreya' serif font for the body to infuse artistry, readability, and sophistication.
- Nautical-themed icons representing different functionalities (e.g., sail, LCD screen, power gauge).
- Dashboard layout resembling a ship's control panel with intuitive placement of controls and telemetry displays.
- Subtle animations for state changes (e.g., sail tension adjustment, status indicator) to provide feedback.