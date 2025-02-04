import Handlebars from 'handlebars';
import { FormData } from '../types';
import letterTemplate from '../letter.handlebars?raw';

// Register Handlebars helpers
Handlebars.registerHelper('dateFormat', function(date: Date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

Handlebars.registerHelper('formatCurrency', function(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
});

Handlebars.registerHelper('multiply', function(a: number, b: number) {
  return a * b;
});

Handlebars.registerHelper('addDays', function(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
});

export async function generateLetter(data: FormData): Promise<string> {
  const template = Handlebars.compile(letterTemplate);
  const currentDate = new Date();
  const responseDeadline = new Date();
  responseDeadline.setDate(currentDate.getDate() + 30);

  return template({
    ...data,
    currentDate,
    responseDeadline
  });
}