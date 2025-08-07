# 2Brain

**2Brain** is your second brain - a web app designed to help you store, organize, and revisit important pieces of information, neatly categorized across multiple pages. Whether it's a useful video, an insightful tweet, or just a link you don’t want to forget, 2Brain helps you manage your knowledge better.

---

## What can you do?

- Save and organize content like **videos, websites, tweets, images, and more**
- Navigate through dedicated pages for each content type to keep things clutter free
- Head over to the **Discover** page to explore what other users have stored in their second brains, a great way to learn from others

---

## Tech Stack

### Frontend (React + TypeScript)

Built with love using:

- `react`, `react-dom` – Core of the app  
- `react-router-dom` – For navigating through different content types  
- `@reduxjs/toolkit`, `react-redux`, `redux-persist` – State management and local storage  
- `tailwindcss`, `@tailwindcss/vite`, `clsx` – UI styling with utility-first CSS  
- `formik`, `yup` – For smooth and validated forms  
- `lucide-react` – Beautiful icon system  
- `dotenv` – Manage environment variables  

### Backend (Node.js + TypeScript)

The backend is clean, fast, and secure using:

- `express` – Server framework  
- `mongoose` – MongoDB ODM for managing user content  
- `jsonwebtoken`, `bcrypt` – For authentication and security  
- `nanoid` – For generating unique IDs  
- `cors`, `dotenv`, `nodemon` – Dev tools and environment setup  
- Entire backend is written in **TypeScript** for type safety and better structure  

---

## Project Structure

The app is divided into:

- A **frontend** where users interact with their second brain  
- A **backend** server that handles data, authentication, and logic  

---

## Why use 2Brain?

We all come across stuff we want to remember or revisit later... but bookmarking isn’t enough. 2Brain helps you **intentionally save and organize** that information, while also letting you **peek into what others find valuable**, making it more collaborative and insightful.

---

## Future Ideas

- Tagging and categorization  
- Search and filtering features  
- Public/private toggle for shared content  
- More visualizations of your saved brain-data  

---

Feel free to explore, build upon it, or even contribute.  
This is more than just a bookmarking tool - it’s your digital memory.
