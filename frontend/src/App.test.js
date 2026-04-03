/* import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <h1 className="text-white text-4xl font-bold">
        FreelanceFlow Started 🚀
      </h1>
    </div>
  );
}

export default App;
