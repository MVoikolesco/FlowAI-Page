import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

describe('App', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

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

  it('renders FlowAI-specific operational visuals without changing package links', () => {
    render(<App />);

    for (const state of ['READING_RULES', 'PLANNING', 'IMPLEMENTING', 'VALIDATING', 'UPDATING_MEMORY', 'COMPLETED']) {
      expect(screen.getAllByText(state).length).toBeGreaterThan(0);
    }

    expect(screen.getByRole('link', { name: /abrir pacote completo no npm/i })).toHaveAttribute(
      'href',
      'https://www.npmjs.com/package/@mvoikolesco/flowai',
    );
    expect(screen.getByRole('link', { name: /abrir pacote portátil no npm/i })).toHaveAttribute(
      'href',
      'https://www.npmjs.com/package/@mvoikolesco/flowai-portable',
    );
  });

  it('copies portable installation commands from terminal blocks', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup({ writeToClipboard: false });
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(<App />);

    await user.click(screen.getAllByRole('button', { name: /copiar comandos/i })[1]);

    expect(writeText).toHaveBeenCalledWith(
      'npm install --save-dev @mvoikolesco/flowai-portable\nnpx flowai init',
    );
    expect(screen.getByRole('button', { name: /copiado/i })).toBeInTheDocument();
    expect(screen.getAllByRole('status')[1]).toHaveTextContent(/comandos copiados/i);
  });

  it('shows unavailable feedback when clipboard API is missing', async () => {
    const user = userEvent.setup({ writeToClipboard: false });
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });

    render(<App />);

    await user.click(screen.getAllByRole('button', { name: /copiar comandos/i })[0]);

    expect(screen.getAllByRole('status')[0]).toHaveTextContent(/área de transferência indisponível/i);
  });

  it('shows failure feedback when clipboard write is rejected', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    const user = userEvent.setup({ writeToClipboard: false });
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(<App />);

    await user.click(screen.getAllByRole('button', { name: /copiar comandos/i })[0]);

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(screen.getAllByRole('status')[0]).toHaveTextContent(/não foi possível copiar/i);
  });
});
