# CSI 1P Interactive Directional Map

---

## 📍 Overview

The **CSI 1P Interactive Directional Map** is a responsive web application designed to improve navigation to the 1P (Campus Center) building at the College of Staten Island.

The original idea for this project was inspired by my academic advisor, **Kristi Brescia**, who recognized that the campus map makes it difficult for visitors and students to identify their location and understand how to reach the 1P building from various parking lots.

This project transforms the static campus map into an interactive experience featuring animated walking paths and direct Google Maps integration.

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
Parking lot buttons are positioned using percentage-based CSS so they scale proportionally across screen sizes.

### 2️⃣ Dynamic SVG Paths
When a parking lot button is clicked:

- JavaScript calculates the center coordinates of both the selected lot and the 1P building  
- A curved SVG path is dynamically generated  
- The path animates to simulate a walking route  

### 3️⃣ Google Maps Integration
After the path animation:

- Google Maps automatically opens  
- Walking directions are generated from the selected parking lot to 1P  

### 4️⃣ Responsive Design
The layout adapts seamlessly to:

- Desktop  
- Tablet  
- Mobile devices  

### 5️⃣ Accessibility Support
The site includes:

- Accessible parking guidance  
- Estimated walking times  
- Clear entrance direction information  

---

## 📸 Project Preview

![Project Preview](/img/preview.png)

---

## 🛠️ Technologies Used

- **HTML5** — Structure and semantic layout  
- **CSS3** — Styling, responsive design, gradients, animations, and Flexbox  
- **Vanilla JavaScript** — Dynamic interaction and event handling  
- **SVG (Scalable Vector Graphics)** — Curved animated path rendering  
- **Google Maps URL API** — Automatic walking directions from parking lots to 1P  
- **Responsive Design Principles** — Mobile-first adaptability across devices  

---

## 🚀 Future Improvements

- Implement real-time geolocation to highlight the nearest parking lot  
- Animate a walking icon that moves along the SVG path  
- Dynamically display estimated walking time from Google Maps data  
- Improve accessibility with ARIA labels and keyboard navigation  
- Integrate with official campus navigation systems  
- Add a dark mode toggle  

---

## 👨‍💻 Author

Created by **Shahad Hossain**

- LinkedIn: [Shahad Hossain](https://www.linkedin.com/in/shahad-hossain-93bb3a305/)  
- GitHub: [Shahad-Hossain](https://github.com/Shahad-Hossain)

---

## 📄 License

This project is licensed under the MIT License.