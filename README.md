# 📅 Days Calendar

A collaborative web application featuring a custom date-calculation engine designed to compute complex, recurring annual patterns (such as "Second Tuesday of October") and dynamically generate standard iCal configurations.

*   **Live Demo:** [View Live Application](https://day-calendar-project.netlify.app/)
*   **Collaborators:** Built in partnership with [MansoorM11](https://github.com/MansoorM11)

---

## 💡 Project Background & Motivation

The core motivation behind this project was to step completely outside our comfort zones. While my teammate and I had basic experience working with layout grids, neither of us had ever built a dynamic calendar system or worked with complex date calculations. We wanted to see how effectively we could pair-program to solve an unfamiliar, logic-heavy problem from scratch.

### The Problem It Solves
Standard digital calendars excel at scheduling static dates, but configuring recurring annual events that shift calendar days each year (e.g., floating commemorative days or corporate milestones) usually requires tedious manual input. This project automates that logic, ensuring that even complex edge cases like leap years, dynamic month offsets, and shifting weekday frequencies are calculated instantly and accurately.

---

## 🛠️ Project Requirements & Specifications

This application was engineered to meet a strict operational rubric, focusing on dynamic DOM manipulation and functional accuracy:

*   **Dynamic Calendar Engine:** Generates full-month views dynamically based on the active month/year selection. Handles 0-indexed tracking to correctly structure weeks beginning on Sundays, with perfect bounding alignment (no orphan cells or broken week padding blocks).
*   **Infinite Navigation:** Features robust 'Previous' and 'Next' controls enabling seamless scrolling through time, alongside a targeted jump-to selector that functions flawlessly across historical and future dates (e.g., matching the exact offsets for 1900, 2024, or 2050).
*   **Data-Driven Design:** Interprets floating recurring rules from a supplied JSON configuration (`days.json`). The architecture avoids hard-coded event tracking, meaning any arbitrary event (such as *International Dawn Chorus Day* on the first Sunday of May) calculates automatically without structural code changes.
*   **100% Lighthouse Accessibility:** Optimized using semantic HTML layouts and dedicated ARIA roles, ensuring full keyboard navigability and achieving a perfect 100% score on Lighthouse Snapshot analysis.

### Shared Logic & iCal Generation (Group Tier 2)
To keep the application highly cohesive, we designed a **shared logic utility layer** shared between two environments:
1.  **Web Interface:** The utility supplies calculated event dates to drive the client-side grid rendering.
2.  **Terminal Script (Node.js):** Runs an automated script to output a compliant `days.ics` file containing single-day calendar blocks for all configuration events from 2020 through 2030, tested successfully for direct cloud integration via Google Calendar.

---

## 🚀 Technical Highlights & Testing

Because minor time calculation errors can cause severe bugs when dealing with time zones or leap years, a core focus was placed on automated quality assurance:

*   **Test-Driven Execution:** Implemented a comprehensive testing suite via `Node:Test` targeting non-trivial date algorithms. 
*   **Regression Prevention:** The unit tests guard against regressions, verifying calculation boundaries to guarantee that complex shifts (like moving from *Ada Lovelace Day* on Oct 8th, 2024 to Oct 14th, 2025) remain perfectly accurate.

---

## 🧠 What I Learned & Engineering Challenges

### 1. Navigating Dynamic Date Tracking
Working with native JavaScript date methods forced me to adopt a highly methodical approach to logic design. Managing the mismatch between user-friendly calendar names and internal indices required careful structure, but it fundamentally improved my problem-solving workflow.

### 2. The Value of Automated Safety Nets
Because calendar logic is exceptionally prone to breaking on edge cases, this project was a fantastic lesson in the value of test-driven principles. Writing automated tests meant we could iterate on the shared logic layer safely, knowing immediately if a change broke a calculation across either the frontend web grid or the backend iCal generator.

### 3. Resolving Technical Disagreements Collaboratively
The most rewarding part of this project was navigating technical disagreements. My teammate and I initially approached the calculation engine layout with completely different ideas. Instead of rushing to write conflicting code, we mapped out our logic blocks together, analyzed the trade-offs regarding readability and testability, and reached an agreement that combined the best elements of both paths.

---

## ⚙️ Local Setup & Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/MansoorM11/Days-calendar.git](https://github.com/MansoorM11/Days-calendar.git)

2. Navigate into the project directory:

  ```Bash
    cd Days-calendar

3. Install dependencies:

  ```Bash
    npm install

4. Run the automated unit test suite:

  ```Bash
    npm test

5. Generate the local iCal file:

  ```Bash
    node index.js
