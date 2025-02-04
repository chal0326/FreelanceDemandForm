import { MantineProvider } from '@mantine/core';
import DemandLetterForm from './components/DemandLetterForm';
import { FormData } from './types';

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
    </MantineProvider>
  );
}

export default App;