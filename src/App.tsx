import { MantineProvider } from '@mantine/core';
import DemandLetterForm from './components/DemandLetterForm';
import { FormData } from './types';
import { Text } from '@mantine/core';

function App() {
  const handleFormSubmit = (data: FormData) => {
    // Handle form submission and letter generation here
    console.log('Form submitted:', data);
  };

  return (
    <MantineProvider>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1>NYC Freelance Isn't Free Act - Demand Letter Generator</h1>
        <DemandLetterForm onSubmit={handleFormSubmit} />
      </div>
      <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f1f1f1' }}>
          <Text size="sm" color="dimmed" component="p">
            © {new Date().getFullYear()} Cody L. Hall. All rights reserved.
          </Text>
        </div>
    </MantineProvider>
  );
}

export default App;