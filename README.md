# Vamsidhar's Portfolio Website

Welcome to the repository for my personal portfolio website! This project showcases my skills, projects, achievements, and professional journey as a Computer Science student.

It is built using **HTML5**, **Tailwind CSS**, and **JavaScript**, designed to be fully responsive, visually appealing, and easy to customize.

**Feel free to clone this repository and use it as a template for your own portfolio!**

## 🚀 Features

-   **Modern UI/UX**: Clean, dark-themed design with smooth animations and gradients.
-   **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.
-   **Project Showcase**: Dedicated section to display your projects with GitHub links and details.
-   **Skills & Achievements**: Sections to highlight your technical skills, certifications, and timeline.
-   **Contact Form**: Integrated contact section for potential employers or collaborators.
-   **Easy Customization**: Built with Tailwind CSS, making it simple to change colors, fonts, and layout.

The landing page is a single responsive developer workspace at `index.html`. The legacy
`skills/`, `projects/`, `achievements/`, and `contact/` routes remain available and redirect
back to the corresponding landing-page sections.

## 🛠️ Tech Stack

-   **HTML5**: Semantic structure.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **JavaScript**: For interactive elements and mobile navigation.
-   **Font Awesome / Icons**: For visual enhancements.

## 📋 Prerequisites

To run this project locally, you need:

-   Node.js (v12.x or higher)
-   npm (Node Package Manager)

## � Getting Started

Follow these steps to get a local copy up and running:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MeegadaVamsidhar/vamsidhar_portfolio.git
    cd vamsidhar_portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` in your browser to view the portfolio.

## Deploy to Vercel

1. Import the repository in [Vercel](https://vercel.com/new).
2. Set the project root to `vamsidhar_portfolio` if importing the parent folder.
3. Use `npm run build` as the build command and leave the output directory empty.
4. Deploy. Vercel serves the static `index.html` and the existing subroutes directly.

## 🎨 How to Customize for Your Own Portfolio

1.  **Update Personal Info:**
    -   Go to `index.html` and update your name, title, and bio.
    -   Update `contact/index.html` with your contact details.

2.  **Add Your Projects:**
    -   Edit the Projects section in `index.html`.
    -   Replace the existing project cards with your own project details, images, and GitHub links.

3.  **Update Skills & Achievements:**
    -   Modify `skills/index.html` to reflect your tech stack.
    -   Update `achievements/index.html` with your certifications and timeline.

4.  **Change Images:**
    -   Replace the placeholder images in the `img` folder or update the `src` attributes in the HTML files with your own images.

5.  **Modify Styles:**
    -   Edit `tailwind.config.js` to change the color palette or fonts to match your personal brand.
    -   Run `npm run build:css` to regenerate the CSS after making changes to Tailwind config.

## 📁 Project Structure

```
vamsidhar_portfolio/
├── css/
│   └── main.css         # Site styles
├── skills/              # Skills page
├── projects/            # Projects page
├── achievements/        # Achievements page
├── contact/             # Contact page
├── public/              # Static assets (images, icons)
├── index.html           # Main entry point (Landing Page)
├── package.json         # Dependencies and scripts
└── tailwind.config.js   # Tailwind configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/MeegadaVamsidhar/vamsidhar_portfolio/issues).

## � License

This project is open source and available under the [MIT License](LICENSE). You are free to use, modify, and distribute it for your own personal or commercial use.

---

**Star ⭐ this repository if you find it useful!**
