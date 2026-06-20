import { format } from "date-fns";
import { supabase } from "./supabase";

export type TicketStatus = "Open" | "In Progress" | "Closed";

export interface Ticket {
  id: string;
  ticket_id: string;
  customer_name: string;
  customer_email: string;
  subject: string;
  description: string;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  ticket_id: string;
  note_text: string;
  created_at: string;
}

async function generateTicketId() {
  const { data, error } = await supabase
    .from("tickets")
    .select("ticket_id")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    return "TKT-001";
  }

  const latestTicketId = data[0].ticket_id;

  const currentNumber = parseInt(
    latestTicketId.replace("TKT-", "")
  );

  const nextNumber = currentNumber + 1;

  return `TKT-${String(nextNumber).padStart(3, "0")}`;
}

export async function getTickets(): Promise<Ticket[]> {
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  if (error) {
    throw error;
  }

  return data as Ticket[];
}

export async function getTicketById(
  ticketId: string
): Promise<Ticket | null> {
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("ticket_id", ticketId)
    .single();

  if (error) {
    return null;
  }

  return data as Ticket;
}

export async function createTicket(
  data: {
    customer_name: string;
    customer_email: string;
    subject: string;
    description: string;
  }
): Promise<Ticket> {
  const ticketId = await generateTicketId();

  const { data: ticket, error } = await supabase
    .from("tickets")
    .insert([
      {
        ticket_id: ticketId,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        subject: data.subject,
        description: data.description,
        status: "Open"
      }
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return ticket as Ticket;
}

export async function updateTicket(
  ticketId: string,
  updates: Partial<Ticket>
): Promise<Ticket> {
  const { data, error } = await supabase
    .from("tickets")
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq("ticket_id", ticketId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Ticket;
}

export async function getTicketNotes(
  ticketId: string
): Promise<Note[]> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("ticket_id", ticketId)
    .order("created_at", {
      ascending: false
    });

  if (error) {
    throw error;
  }

  return data as Note[];
}

export async function createTicketNote(
  ticketId: string,
  note_text: string
): Promise<Note> {
  const { data, error } = await supabase
    .from("notes")
    .insert([
      {
        ticket_id: ticketId,
        note_text
      }
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Note;
}

export function formatDate(
  dateString: string
) {
  return format(
    new Date(dateString),
    "MMM d, yyyy h:mm a"
  );
}