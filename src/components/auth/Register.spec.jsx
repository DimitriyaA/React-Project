import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Register from './Register';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom/vitest'; // Добавете този импорт

// Mocking Firebase and react-router-dom
vi.mock('firebase/auth', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        createUserWithEmailAndPassword: vi.fn(),
        updateProfile: vi.fn(),
    };
});

// Mocking react-router-dom
vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));

describe('Register Component', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should render the registration form', () => {
        render(<Register />);
        expect(screen.getByPlaceholderText('Потребителско име')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Парола')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Потвърдете паролата')).toBeInTheDocument();
    });

    it('should show an error if required fields are missing', async () => {
        render(<Register />);

        const submitButton = screen.getByText('Регистрирай се');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Моля, попълнете всички полета.')).toBeInTheDocument();
        });
    });

    it('should show an error if passwords do not match', async () => {
        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Парола'), { target: { value: 'password1' } });
        fireEvent.change(screen.getByPlaceholderText('Потвърдете паролата'), { target: { value: 'password2' } });

        const submitButton = screen.getByText('Регистрирай се');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Паролите не съвпадат.')).toBeInTheDocument();
        });
    });

    it('should show an error if the email is invalid', async () => {
        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalid-email' } });

        const submitButton = screen.getByText('Регистрирай се');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Моля, въведете валиден имейл адрес.')).toBeInTheDocument();
        });
    });

    it('should successfully register a user and navigate to the homepage', async () => {
        const mockUserCredential = {
            user: { uid: '123', email: 'test@test.com' },
        };
        vi.mocked(createUserWithEmailAndPassword).mockResolvedValueOnce(mockUserCredential);
        vi.mocked(updateProfile).mockResolvedValueOnce();

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Потребителско име'), { target: { value: 'username' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
        fireEvent.change(screen.getByPlaceholderText('Парола'), { target: { value: 'password' } });
        fireEvent.change(screen.getByPlaceholderText('Потвърдете паролата'), { target: { value: 'password' } });

        const submitButton = screen.getByText('Регистрирай се');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(vi.mocked(createUserWithEmailAndPassword)).toHaveBeenCalledWith(
                expect.anything(),
                'test@test.com',
                'password'
            );
            expect(vi.mocked(updateProfile)).toHaveBeenCalledWith(
                mockUserCredential.user,
                { displayName: 'username' }
            );
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('should show an error if registration fails', async () => {
        vi.mocked(createUserWithEmailAndPassword).mockRejectedValueOnce(new Error('Registration error'));

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Потребителско име'), { target: { value: 'username' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
        fireEvent.change(screen.getByPlaceholderText('Парола'), { target: { value: 'password' } });
        fireEvent.change(screen.getByPlaceholderText('Потвърдете паролата'), { target: { value: 'password' } });

        const submitButton = screen.getByText('Регистрирай се');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Грешка при регистрация: Error: Registration error')).toBeInTheDocument();
        });
    });
});