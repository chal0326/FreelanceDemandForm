import { useState, useEffect } from 'react';
import {
  TextInput,
  NumberInput,
  Textarea,
  Button,
  Stack,
  Group,
  Switch,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { FormData } from '../types';
import { generateLetter } from '../utils/letterGenerator';
import { saveAs } from 'file-saver';

interface DemandLetterFormProps {
  onSubmit: (data: FormData) => void;
}

const STORAGE_KEY = 'demandLetterFormData';

export default function DemandLetterForm({ onSubmit }: DemandLetterFormProps) {
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Convert string dates back to Date objects
      return {
        ...parsedData,
        startDate: new Date(parsedData.startDate),
        conclusionDate: new Date(parsedData.conclusionDate),
        paymentDueDate: new Date(parsedData.paymentDueDate),
        contractDate: parsedData.contractDate ? new Date(parsedData.contractDate) : undefined,
      };
    }
    return {
      yourName: '',
      yourStreetAddress: '',
      yourCity: '',
      yourState: '',
      yourZipCode: '',
      yourEmail: '',
      yourPhoneNumber: '',
      hiringPartyName: '',
      hiringPartyContactName: '',
      hiringPartyStreetAddress: '',
      hiringPartyCity: '',
      hiringPartyState: '',
      hiringPartyZipCode: '',
      startDate: new Date('2024-01-09'),
      conclusionDate: new Date('2024-01-12'),
      servicesPerformed: [''],
      agreedAmount: 6000,
      balanceDue: 6000,
      paymentDueDate: new Date('2024-02-11'),
      daysOverdue: 0,
      paymentInstructions: '',
      contractExists: false,
      additionalTerms: '',
    };
  });

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const letter = await generateLetter(formData);
    const blob = new Blob([letter], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `demand-letter-${formData.hiringPartyName}.txt`);
    onSubmit(formData);
  };

  const handleInputChange = (name: keyof FormData, value: string | number | boolean | Date | (string | number)[]) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({
      yourName: '',
      yourStreetAddress: '',
      yourCity: '',
      yourState: '',
      yourZipCode: '',
      yourEmail: '',
      yourPhoneNumber: '',
      hiringPartyName: '',
      hiringPartyContactName: '',
      hiringPartyStreetAddress: '',
      hiringPartyCity: '',
      hiringPartyState: '',
      hiringPartyZipCode: '',
      startDate: new Date('2024-01-09'),
      conclusionDate: new Date('2024-01-12'),
      servicesPerformed: [''],
      agreedAmount: 6000,
      balanceDue: 6000,
      paymentDueDate: new Date('2024-02-11'),
      daysOverdue: 0,
      paymentInstructions: '',
      contractExists: false,
      additionalTerms: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Title order={2}>Your Information</Title>
        <TextInput
          required
          label="Your Name"
          value={formData.yourName}
          onChange={(e) => handleInputChange('yourName', e.target.value)}
        />
        <TextInput
          required
          label="Street Address"
          value={formData.yourStreetAddress}
          onChange={(e) => handleInputChange('yourStreetAddress', e.target.value)}
        />
        <Group grow>
          <TextInput
            required
            label="City"
            value={formData.yourCity}
            onChange={(e) => handleInputChange('yourCity', e.target.value)}
          />
          <TextInput
            required
            label="State"
            value={formData.yourState}
            onChange={(e) => handleInputChange('yourState', e.target.value)}
          />
          <TextInput
            required
            label="ZIP Code"
            value={formData.yourZipCode}
            onChange={(e) => handleInputChange('yourZipCode', e.target.value)}
          />
        </Group>
        <TextInput
          required
          label="Email"
          type="email"
          value={formData.yourEmail}
          onChange={(e) => handleInputChange('yourEmail', e.target.value)}
        />
        <TextInput
          required
          label="Phone Number"
          value={formData.yourPhoneNumber}
          onChange={(e) => handleInputChange('yourPhoneNumber', e.target.value)}
        />

        <Title order={2}>Client Information</Title>
        <TextInput
          required
          label="Hiring Party Name"
          value={formData.hiringPartyName}
          onChange={(e) => handleInputChange('hiringPartyName', e.target.value)}
        />
        <TextInput
          required
          label="Contact Name"
          value={formData.hiringPartyContactName}
          onChange={(e) => handleInputChange('hiringPartyContactName', e.target.value)}
        />
        <TextInput
          required
          label="Street Address"
          value={formData.hiringPartyStreetAddress}
          onChange={(e) => handleInputChange('hiringPartyStreetAddress', e.target.value)}
        />
        <Group grow>
          <TextInput
            required
            label="City"
            value={formData.hiringPartyCity}
            onChange={(e) => handleInputChange('hiringPartyCity', e.target.value)}
          />
          <TextInput
            required
            label="State"
            value={formData.hiringPartyState}
            onChange={(e) => handleInputChange('hiringPartyState', e.target.value)}
          />
          <TextInput
            required
            label="ZIP Code"
            value={formData.hiringPartyZipCode}
            onChange={(e) => handleInputChange('hiringPartyZipCode', e.target.value)}
          />
        </Group>

        <Title order={2}>Project Details</Title>
        <DateInput
          required
          label="Start Date"
          value={formData.startDate}
          onChange={(value) => handleInputChange('startDate', value || new Date())}
        />
        <DateInput
          required
          label="Conclusion Date"
          value={formData.conclusionDate}
          onChange={(value) => {
            const conclusionDate = value || new Date();
            const paymentDueDate = new Date(conclusionDate);
            paymentDueDate.setDate(paymentDueDate.getDate() + 30);
            handleInputChange('conclusionDate', conclusionDate);
            handleInputChange('paymentDueDate', paymentDueDate);
          }}
        />
        <Textarea
          required
          label="Services Performed"
          value={formData.servicesPerformed.join('\n')}
          onChange={(e) => handleInputChange('servicesPerformed', e.target.value.split('\n'))}
          minRows={3}
        />
        <NumberInput
          required
          label="Agreed Amount"
          value={formData.agreedAmount}
          onChange={(value) => {
            handleInputChange('agreedAmount', value);
            handleInputChange('balanceDue', value);
          }}
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
        />

        <Title order={2}>Additional Information</Title>
        <Switch
          label="Contract Exists"
          checked={formData.contractExists}
          onChange={(e) => handleInputChange('contractExists', e.target.checked)}
        />
        {formData.contractExists && (
          <DateInput
            label="Contract Date"
            value={formData.contractDate}
            onChange={(value) => handleInputChange('contractDate', value || new Date())}
          />
        )}
        <Textarea
          label="Additional Terms"
          value={formData.additionalTerms}
          onChange={(e) => handleInputChange('additionalTerms', e.target.value)}
        />

        <Group mt="xl">
          <Button variant="outline" color="red" onClick={handleReset}>
            Reset Form
          </Button>
          <Button type="submit" size="lg">
            Generate Demand Letter
          </Button>
        </Group>
      </Stack>
    </form>
  );
}