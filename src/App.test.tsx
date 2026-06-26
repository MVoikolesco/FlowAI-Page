import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';

describe('App', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders the FlowAI page from the provided App component', () => {
    render(<App />);

    expect(document.querySelector('h1')).toHaveTextContent(/engenharia com/i);
    expect(screen.getAllByText('@mvoikolesco/flowai').length).toBeGreaterThan(0);
    expect(screen.getAllByText('@mvoikolesco/flowai-portable').length).toBeGreaterThan(0);
    expect(screen.getByText('Ver no npm').closest('a')).toHaveAttribute(
      'href',
      'https://www.npmjs.com/package/@mvoikolesco/flowai',
    );
  });

  it('shows the workflow stages and agent sections', () => {
    render(<App />);

    for (const label of ['Solicitação', 'Classificação', 'Planejamento', 'Implementação', 'Validação', 'Memória']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }

    for (const agent of ['Nexus', 'Scout', 'Gate', 'Forge', 'Aegis', 'Patch']) {
      expect(screen.getByText(agent)).toBeInTheDocument();
    }
  });

  it('copies the main FlowAI install command', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup({ writeToClipboard: false });
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(<App />);

    await user.click(screen.getByRole('button', { name: /copiar/i }));

    expect(writeText).toHaveBeenCalledWith('npm install @mvoikolesco/flowai');
    await waitFor(() => expect(screen.getByRole('button', { name: /copiado/i })).toBeInTheDocument());
  });
});
