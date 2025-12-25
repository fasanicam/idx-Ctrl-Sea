# Ctrl+Sea: The Captain's Digital Companion

![A rather smart-looking sailboat](https://picsum.photos/seed/ctrlsea/1200/400?blur=2)
<p align="center"><i>"The only thing better than a day on the water is a day on the water with a jolly good web interface."</i></p>

---

## What's All This Then?

Right, listen up. **Ctrl+Sea** is a rather spiffing web application designed to put you, the captain, in firm control of your IoT-enabled vessel. Think of it as a digital first mate, only less chatty and far more reliable after a bottle of rum.

This project provides a sleek, real-time dashboard to monitor and command your sailboat from the comfort of your favourite web browser. No more fiddling with rusty levers or shouting into the wind; it's all clicks and sliders from here on out. Terribly civilised, isn't it?

## Features (The Good Bits)

We've packed this dashboard with all the necessaries to ensure your voyage is nothing short of splendid.

*   **Vessel Christening:** Before you can set sail, you must give your boat a proper name. Superstition? Perhaps. But we're not ones to tempt fate.
*   **Real-Time Dashboard:** A single-pane-of-glass view of your boat's vitals. All the important knobs and dials in one place.
*   **Sail Tension Control:** Adjust the main sail's tension with a simple slider. Effortlessly harness the power of the wind, from a gentle trim to full bellow.
*   **Power Gauge:** Keep a keen eye on the potentiometer readings from your vessel. Knowledge is power, after all.
*   **Onboard LCD Messenger:** Send text messages directly to the boat's LCD screen. Perfect for vital coordinates or reminding the crew whose turn it is to make tea.
*   **Live MQTT Log:** For the discerning tech enthusiast, a live feed of all the digital chatter between your interface and the boat. Fascinating stuff!
*   **Dual Connection Status:** Instantly know the status of your connection to the MQTT broker and the boat itself. Green is good, red is... well, less good.

## The Technology Under the Bonnet

This application is built with a rather modern stack, ensuring it's as sturdy as it is stylish.

*   **Next.js (App Router):** The latest and greatest for building robust React applications.
*   **TypeScript:** Because we prefer our code to be as orderly as a queue at Wimbledon.
*   **Tailwind CSS & ShadCN/UI:** For a user interface that's both handsome and functional, without all the mucking about with CSS files.
*   **MQTT:** The messaging protocol that acts as our digital carrier pigeon, relaying commands and data to and from the vessel.
*   **React Hook Form & Zod:** For handling forms with the kind of rigour and validation Her Majesty would approve of.
*   **Lucide Icons:** A lovely set of icons to keep things looking sharp.

## Getting Started

Right, time to get this vessel ship-shape.

### 1. Prerequisites

Make sure you have Node.js (version 18 or newer) and `npm` installed on your machine. One wouldn't go to sea without a life jacket, and one shouldn't code without the right tools.

### 2. Installation

Pop open your terminal, take a deep breath, and run the following command to install all the necessary gubbins:

```bash
npm install
```

### 3. Running the Development Server

With everything installed, it's time to bring the application to life. Run the command below:

```bash
npm run dev
```

This will start the development server, typically on `http://localhost:9002`. Open that address in your browser, and you should be greeted by the christening screen.

### 4. Naming Your Vessel

Your first task is to bestow a name upon your boat. This name is terribly important, as it forms the root of the MQTT topics used for communication. Choose wisely!

Once named, you'll be whisked away to the main dashboard, ready to take command.

## A Final Word

And there you have it. You're now the proud captain of a digitally-enhanced sailing vessel. May your winds be favourable and your connections stable. Tally ho!
