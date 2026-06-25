import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders the FlowAI landing page with verified product content', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /flowai início/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /planejamento, validação e memória/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /navegação principal/i })).toBeInTheDocument();
    expect(screen.getByText('@mvoikolesco/flowai')).toBeInTheDocument();
    expect(screen.getByText('@mvoikolesco/flowai-portable')).toBeInTheDocument();
    expect(screen.getByText(/Licença MIT/i)).toBeInTheDocument();
  });

  it('shows the required workflow stages and benefit areas', () => {
    render(<App />);

    for (const step of ['Solicitação', 'Classificação', 'Planejamento', 'Implementação', 'Validação', 'Memória']) {
      expect(screen.getAllByText(step).length).toBeGreaterThan(0);
    }

    for (const benefit of ['Preservação', 'Segurança']) {
      expect(screen.getByRole('heading', { name: benefit })).toBeInTheDocument();
    }
  });

  it('copies installation commands from terminal blocks', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(<App />);

    await userEvent.click(screen.getAllByRole('button', { name: /copiar comandos/i })[0]);

    expect(writeText).toHaveBeenCalledWith(
      'npm install --save-dev @mvoikolesco/flowai\nnpx flowai init\nnpx flowai doctor',
    );
    expect(screen.getByRole('button', { name: /copiado/i })).toBeInTheDocument();
  });
});
