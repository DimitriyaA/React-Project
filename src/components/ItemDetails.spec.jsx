import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext'; // Импортирай AuthProvider
import ItemDetails from '../components/ItemDetails';
import { vi } from 'vitest';

// Мок на Firebase функции
vi.mock('firebase/firestore', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        getDoc: vi.fn(() => Promise.resolve({ exists: () => true, data: () => ({ title: 'Test Item' }) })),
        doc: vi.fn(),
        deleteDoc: vi.fn(() => Promise.resolve()),
    };
});


// Мок на useNavigate
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: vi.fn(),
    useParams: vi.fn(),
}));

// Мок на react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useParams: vi.fn(() => ({ id: '123' })), // Мокиране на useParams()
        useNavigate: vi.fn(),
    };
});


describe('ItemDetails Component', () => {
    const mockNavigate = vi.fn();
    const mockUseParams = vi.fn();

    beforeEach(() => {
        mockNavigate.mockClear();
        mockUseParams.mockClear();
    });

    it('should display loading message when data is loading', () => {
        // Мок на useParams да връща някакъв id
        mockUseParams.mockReturnValue({ id: '123' });

        render(
            <AuthProvider value={{ user: { uid: 'user1' } }}>
                <MemoryRouter>
                    <ItemDetails />
                </MemoryRouter>
            </AuthProvider>
        );

        expect(screen.getByText('Зареждане...')).toBeInTheDocument();
    });

    it('should display error message if item is not found', async () => {
        mockUseParams.mockReturnValue({ id: '123' });
        getDoc.mockResolvedValueOnce({ exists: () => false });

        render(
            <AuthProvider value={{ user: { uid: 'user1' } }}>
                <MemoryRouter>
                    <ItemDetails />
                </MemoryRouter>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Артикулът не беше намерен.')).toBeInTheDocument();
        });
    });

    it('should display item details when item is found', async () => {
        const mockItem = {
            id: '123',
            name: 'Magic Wand',
            imageUrl: 'https://example.com/magicwand.jpg',
            description: 'A powerful wand for magical spells.',
            category: 'Artea',
            createdBy: 'user1',
            createdByName: 'Test User',
        };
        mockUseParams.mockReturnValue({ id: '123' });
        getDoc.mockResolvedValueOnce({ exists: () => true, data: () => mockItem });

        render(
            <AuthProvider value={{ user: { uid: 'user1' } }}>
                <MemoryRouter>
                    <ItemDetails />
                </MemoryRouter>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(mockItem.name)).toBeInTheDocument();
            expect(screen.getByText(mockItem.description)).toBeInTheDocument();
            expect(screen.getByText(`Категория: ${mockItem.category}`)).toBeInTheDocument();
        });
    });

    it('should show edit and delete buttons for owner', async () => {
        const mockItem = {
            id: '123',
            name: 'Magic Wand',
            imageUrl: 'https://example.com/magicwand.jpg',
            description: 'A powerful wand for magical spells.',
            category: 'Artea',
            createdBy: 'user1',
            createdByName: 'Test User',
        };
        mockUseParams.mockReturnValue({ id: '123' });
        getDoc.mockResolvedValueOnce({ exists: () => true, data: () => mockItem });

        render(
            <AuthProvider value={{ user: { uid: 'user1' } }}>
                <MemoryRouter>
                    <ItemDetails />
                </MemoryRouter>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Редактирай')).toBeInTheDocument();
            expect(screen.getByText('Изтрий')).toBeInTheDocument();
        });
    });

    it('should delete item when delete button is clicked', async () => {
        const mockItem = {
            id: '123',
            name: 'Magic Wand',
            imageUrl: 'https://example.com/magicwand.jpg',
            description: 'A powerful wand for magical spells.',
            category: 'Artea',
            createdBy: 'user1',
            createdByName: 'Test User',
        };
        mockUseParams.mockReturnValue({ id: '123' });
        getDoc.mockResolvedValueOnce({ exists: () => true, data: () => mockItem });
        deleteDoc.mockResolvedValueOnce();

        render(
            <AuthProvider value={{ user: { uid: 'user1' } }}>
                <MemoryRouter>
                    <ItemDetails />
                </MemoryRouter>
            </AuthProvider>
        );

        await waitFor(() => {
            fireEvent.click(screen.getByText('Изтрий'));
        });

        await waitFor(() => {
            expect(deleteDoc).toHaveBeenCalledWith(expect.objectContaining({ id: '123' }));
            expect(mockNavigate).toHaveBeenCalledWith('/catalog');
        });
    });
});
