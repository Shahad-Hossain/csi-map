# CSI 1P Interactive Directional Map

## 📍 Overview

The CSI 1P Interactive Directional Map is a responsive web application designed to improve navigation to the 1P (Campus Center) building at the College of Staten Island.

The original idea for this project was inspired by my academic advisor, **Kristi Brescia**, who recognized that the campus map makes it difficult for visitors and students to identify their location and understand how to reach the 1P building from various parking lots.

This project transforms the static campus map into an interactive experience with animated walking paths and direct Google Maps integration.

---

## 🎯 Why I Created This

Navigating the CSI campus can be confusing, especially for:

- First-time visitors
- Incoming students
- Event attendees
- Families during orientation

The traditional campus map does not clearly indicate:
- Where the user is located
- The walking route to 1P
- Which parking lot leads to which entrance

This project solves that problem by:

- Overlaying interactive parking lot buttons
- Drawing dynamic walking paths to 1P
- Linking directly to Google Maps walking directions
- Providing accessible parking instructions
- Being fully responsive across devices

---

## 🖥️ How It Works

### 1️⃣ Interactive Map Overlay
Parking lot buttons are positioned using percentage-based CSS to scale across screen sizes.

### 2️⃣ Dynamic SVG Paths
When a parking lot button is clicked:
- JavaScript calculates the center of the lot button and the 1P building button
- A curved SVG path is dynamically generated
- The path animates to simulate a walking route

### 3️⃣ Google Maps Integration
After the path animation:
- Google Maps opens
- Walking directions are automatically generated from the selected parking lot to 1P

### 4️⃣ Responsive Design
The layout adapts to:
- Desktop
- Tablet
- Mobile devices

### 5️⃣ Accessibility Information
The site includes:
- Accessible parking directions
- Estimated walking times
- Clear entrance guidance

---

## 📸 Project Preview

```markdown
![Project Preview](/img/preview.png)


## 🛠️ Technologies Used

- **HTML5** — Structure and semantic layout  
- **CSS3** — Styling, responsive design, gradients, animations, and Flexbox  
- **Vanilla JavaScript** — Dynamic interaction and event handling  
- **SVG (Scalable Vector Graphics)** — Curved animated path rendering  
- **Google Maps URL API** — Automatic walking directions from parking lots to 1P  
- **Responsive Design Principles** — Mobile-first adaptability across devices

## 👨‍💻 Author

Created by **Shahad Hossain**

- LinkedIn: [Shahad Hossain](https://www.linkedin.com/in/shahad-hossain-93bb3a305/)
- GitHub: [Shahad-Hossain](https://github.com/Shahad-Hossain)
