import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'; // Import getAuth
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { useNavigate } from 'react-router-dom';

// Mock Firebase auth functions
vi.mock('firebase/auth', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        signInWithEmailAndPassword: vi.fn(() => Promise.resolve({ user: { uid: 'test-uid' } })),
        getAuth: vi.fn(() => ({})), // Mock getAuth
    };
});

// Mock useNavigate
vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));

describe('Login Component', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        mockNavigate.mockClear();
        useNavigate.mockImplementation(() => mockNavigate);
    });

    it('should successfully log in a user and navigate to the homepage', async () => {
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
        fireEvent.change(screen.getByPlaceholderText('Парола'), { target: { value: 'password' } });

        const submitButton = screen.getByText('Влезте');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(vi.mocked(signInWithEmailAndPassword)).toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('should show an error if email or password is empty', async () => {
        render(<Login />);

        const submitButton = screen.getByText('Влезте');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Моля, попълнете всички полета.')).toBeInTheDocument();
        });
    });

    it('should show an error if login fails', async () => {
        vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(new Error('Login error'));

        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
        fireEvent.change(screen.getByPlaceholderText('Парола'), { target: { value: 'password' } });

        const submitButton = screen.getByText('Влезте');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Грешка при вход: Login error')).toBeInTheDocument();
        });
    });
});