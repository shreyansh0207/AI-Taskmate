🚀 DevVoid Task Management System (MERN + Gemini AI)
📋 Overview

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup
```bash
cd taskmate
cd backend
npm install
npm run start
2️⃣ Frontend Setup
bash
Copy code
cd taskmate
cd frontend
npm install
npm run start


This project is built as part of the DevVoid Assignment – Round 1 for the Software Engineer (Full-Stack/MERN) position.
It’s a Project & Task Management System similar to Trello, enhanced with AI-powered assistance using Google Gemini AI.

🧠 Key Features
🗂️ Project Management

Create, Read, Update, and Delete Projects

Each project contains:

Name

Description

Created Date

View a list of all projects

Select a project to open its task board

✅ Task Management (Within Projects)

Create, Read, Update, and Delete Tasks (Cards)

Each task includes:

Title

Description

Status (To Do / In Progress / Done)

Tasks are linked to their respective projects

Changes persist across sessions using MongoDB

🧩 Kanban Board Interface

Fully interactive Trello-like Kanban board

Drag & Drop cards between columns

Columns represent task statuses (To Do / In Progress / Done)

Switch easily between multiple projects

Cards display essential information at a glance

🤖 AI Features (Gemini Integration)

Integrated with Google Gemini AI for smart project insights:

✨ Summarization

The AI summarizes all tasks within a project

Example:
“In Project Website Redesign, 3 tasks are in progress, and 2 are completed.”

💬 Q&A Assistant

Ask AI questions about a specific project or task

Example:
“Which tasks are still pending in the Marketing project?”
→ AI replies based on live task data