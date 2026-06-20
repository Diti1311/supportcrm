import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle } from
'../components/ui/Card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Label } from '../components/ui/Label';
import { Skeleton } from '../components/ui/Skeleton';
import {
  getTicketById,
  getTicketNotes,
  updateTicket,
  createTicketNote,
  Ticket,
  Note,
  TicketStatus,
  formatDate } from
'../lib/api';
import { StatusBadge } from './Dashboard';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Loader2,
  MessageSquare,
  User } from
'lucide-react';
export function TicketDetail() {
  const { ticketId } = useParams<{
    ticketId: string;
  }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<TicketStatus>('Open');
  const [newNote, setNewNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    async function loadData() {
      if (!ticketId) return;
      setIsLoading(true);
      try {
        const [ticketData, notesData] = await Promise.all([
        getTicketById(ticketId),
        getTicketNotes(ticketId)]
        );
        if (ticketData) {
          setTicket(ticketData);
          setStatus(ticketData.status);
        }
        setNotes(notesData);
      } catch (error) {
        toast.error('Failed to load ticket details');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [ticketId]);
  const handleSaveChanges = async () => {
    if (!ticket || !ticketId) return;
    setIsSaving(true);
    try {
      let statusUpdated = false;
      let noteAdded = false;
      if (status !== ticket.status) {
        const updatedTicket = await updateTicket(ticketId, {
          status
        });
        setTicket(updatedTicket);
        statusUpdated = true;
      }
      if (newNote.trim()) {
        const addedNote = await createTicketNote(ticketId, newNote.trim());
        setNotes((prev) => [addedNote, ...prev]);
        setNewNote('');
        noteAdded = true;
      }
      if (statusUpdated && noteAdded) {
        toast.success('Ticket updated and note added successfully');
      } else if (statusUpdated) {
        toast.success('Ticket status updated');
      } else if (noteAdded) {
        toast.success('Internal note added');
      } else {
        toast.info('No changes to save');
      }
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };
  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>);

  }
  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Ticket not found</h2>
        <p className="text-muted-foreground mt-2">
          The ticket you are looking for does not exist or has been removed.
        </p>
        <Button className="mt-6" onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>);

  }
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">
                {ticket.ticket_id}
              </h1>
              <StatusBadge status={ticket.status} />
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Created{' '}
                {formatDate(ticket.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Updated{' '}
                {formatDate(ticket.updated_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{ticket.subject}</h3>
              </div>
              <div className="bg-slate-50 p-4 rounded-md border text-sm whitespace-pre-wrap">
                {ticket.description}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Internal Notes
              </CardTitle>
              <CardDescription>
                Notes are only visible to staff members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {notes.length === 0 ?
              <div className="text-center py-6 text-muted-foreground border-2 border-dashed rounded-md">
                  No internal notes yet.
                </div> :

              <div className="space-y-4">
                  {notes.map((note) =>
                <div
                  key={note.id}
                  className="bg-slate-50 p-4 rounded-md border space-y-2">
                  
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span className="font-medium text-slate-700">
                          Staff Member
                        </span>
                        <span>{formatDate(note.created_at)}</span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">
                        {note.note_text}
                      </p>
                    </div>
                )}
                </div>
              }
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-xs">Name</Label>
                <p className="font-medium">{ticket.customer_name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Email</Label>
                <p className="font-medium">
                  <a
                    href={`mailto:${ticket.customer_email}`}
                    className="text-blue-600 hover:underline">
                    
                    {ticket.customer_email}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={status}
                  onValueChange={(val) => setStatus(val as TicketStatus)}>
                  
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Add Internal Note</Label>
                <Textarea
                  placeholder="Type a note..."
                  className="min-h-[100px]"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)} />
                
              </div>
              <Button
                className="w-full"
                onClick={handleSaveChanges}
                disabled={
                isSaving || status === ticket.status && !newNote.trim()
                }>
                
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

}