import { render, screen } from '@testing-library/react';
import App from './App';
import Search from './components/search';

test('Loads search', () => {
  render(<Search />);
  const linkElement = screen.getByText(/Search for recipe:/i);
  expect(linkElement).toBeInTheDocument();
});
