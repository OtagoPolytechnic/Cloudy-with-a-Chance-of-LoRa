import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page';

test('Home', () => {
  render(<Home />);
  expect(screen.getByText('Temperature')).toBeDefined();
});
