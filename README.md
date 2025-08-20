
# Class 10 **Fluids** – Interactive Educational Module

An interactive learning module for Class 10 Physics covering **Pressure in Fluids**, **Buoyant Force**, **Archimedes’ Principle**, and **Pascal’s Law** using **simulations, animations, and interactive elements**. Built with **Next.js + React**, **Tailwind CSS**, **Framer Motion**, and **p5.js**.

---

## 🎯 Learning Objectives

* Visualize how **pressure varies with depth**: $P = h \rho g$.
* Explore **buoyant force**: $F_b = \rho V g$ and conditions for **float/sink**.
* See **Pascal’s Law** in action with a **hydraulic lift**.
* Strengthen understanding via **hands-on experiments** and **quizzes**.

---

## ✨ Features

* **Interactive Simulations**

  * **Pressure vs Depth**: Drag a diver and watch pressure update live.
  * **Archimedes’ Tank**: Drop objects of different **density/volume** and observe float/sink + displaced volume.
  * **Hydraulic Lift**: Apply force on a small piston and lift a car (adjust areas/forces).
* **Animations** powered by Framer Motion (bubbles, water surface, UI transitions).
* **Built‑in Mini‑Quizzes** with instant feedback and explanations.
* **Light/Dark Theme** toggle for accessibility.
* Fully **responsive** (mobile/desktop/tablet).

---

## 🧰 Tech Stack

* **Framework**: Next.js (App Router) + React
* **Styling**: Tailwind CSS
* **Animations**: Framer Motion, Lottie (optional)
* **Simulations**: p5.js (via react-p5) and/or Matter.js (optional for physics)
* **State**: React hooks (useState/useRef), Zustand (optional)
* **Deployment**: Vercel

---



## 🧪 Simulations (Details)

### Pressure vs Depth

* **Controls**: Drag diver vertically, slider for fluid density.
* **Live readouts**: Depth (m), Pressure (Pa).
* **Equation panel** updates: $P = h \rho g$.

### Archimedes’ Principle (Buoyancy Tank)

* **Controls**: Object density, volume, fluid type (water/oil/brine).
* **Outputs**: Float/Sink, displaced volume, net force graph.
* **Visualization**: Water level rise; force arrows (weight vs buoyant force).

### Pascal’s Law – Hydraulic Lift

* **Controls**: Small/large piston areas, applied force.
* **Outputs**: Pressure transmission, lifted weight, mechanical advantage.
* **Visualization**: Fluid link with synchronized piston motion.

---

## 📚 Pedagogical Design

* **Discover → Explain → Apply** flow.
* Micro‑explanations alongside controls (tooltips).
* **Try‑Predict‑Reveal** prompts before revealing equations.
* **Low‑floor/High‑ceiling**: Starts simple, allows deeper exploration.

---

## 🧩 Quiz & Assessment

* **MCQs** with explanations.
* **Interactive tasks**: Predict float/sink before running; match terms (density, pressure, buoyancy).
* Scoring + review section at the end.

---
## 📣 Project Status

MVP complete: Pressure sim + Quiz. Buoyancy & Pascal modules in progress.

> If you use this in a classroom, feedback and feature requests are welcome!
