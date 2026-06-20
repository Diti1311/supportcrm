# Support CRM

A modern Customer Support Ticket Management System built with React, Vite, TypeScript, Tailwind CSS, and Supabase.

## Features

* Create support tickets
* View all tickets in a dashboard
* Search tickets by:

  * Ticket ID
  * Customer Name
  * Customer Email
  * Subject
  * Description
* Filter tickets by status

  * Open
  * In Progress
  * Closed
* View ticket details
* Update ticket status
* Add internal notes/comments
* Responsive UI
* Supabase database integration

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* Lucide React

### Backend / Database

* Supabase
* PostgreSQL

## Project Structure

src/
├── components/
│ ├── ui/
│ └── Layout.tsx
├── pages/
│ ├── Dashboard.tsx
│ ├── CreateTicket.tsx
│ └── TicketDetail.tsx
├── lib/
│ ├── api.ts
│ └── supabase.ts
├── App.tsx
└── main.tsx

## Installation

### Clone Repository

git clone <your-repository-url>

cd support-crm

### Install Dependencies

npm install

### Configure Environment Variables

Create a .env file in the project root.

Add:

VITE_SUPABASE_URL=your_supabase_url

VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

### Run Development Server

npm run dev

Application will be available at:

http://localhost:5173

## Build For Production

npm run build

## Deployment

Frontend deployed on Vercel.

Database hosted on Supabase.

## Database Tables

### tickets

* id
* ticket_id
* customer_name
* customer_email
* subject
* description
* status
* created_at
* updated_at

### notes

* id
* ticket_id
* note_text
* created_at

## Future Improvements

* Authentication
* Role-based access control
* Email notifications
* Ticket assignment system
* Real-time updates
* Analytics dashboard

## Author

Diti Solanki
