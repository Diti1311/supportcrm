import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle } from
'../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { createTicket } from '../lib/api';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';
export function CreateTicket() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    subject: '',
    description: ''
  });
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newTicket = await createTicket(formData);
      toast.success(`Ticket created successfully! ID: ${newTicket.ticket_id}`);
      navigate(`/tickets/${newTicket.ticket_id}`);
    } catch (error) {
      toast.error('Failed to create ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Ticket</h1>
          <p className="text-muted-foreground">Submit a new support request.</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Ticket Details</CardTitle>
            <CardDescription>
              Please provide the customer and issue details below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer_name">Customer Name</Label>
                <Input
                  id="customer_name"
                  name="customer_name"
                  placeholder="John Doe"
                  required
                  value={formData.customer_name}
                  onChange={handleChange}
                  disabled={isSubmitting} />
                
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer_email">Customer Email</Label>
                <Input
                  id="customer_email"
                  name="customer_email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.customer_email}
                  onChange={handleChange}
                  disabled={isSubmitting} />
                
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Brief summary of the issue"
                required
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting} />
              
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Detailed explanation of the issue..."
                className="min-h-[150px]"
                required
                value={formData.description}
                onChange={handleChange}
                disabled={isSubmitting} />
              
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}>
              
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting &&
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              }
              Submit Ticket
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>);

}