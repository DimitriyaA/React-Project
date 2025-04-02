import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, useNavigate, useParams } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import ItemDetails from '../components/ItemDetails';
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { getDoc, doc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';

// Mock Firebase functions
vi.mock('firebase/firestore', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        getDoc: vi.fn(() => Promise.resolve({ exists: () => true, data: () => ({ name: 'Test Item' }) })),
        doc: vi.fn(),
        deleteDoc: vi.fn(() => Promise.resolve()),
        collection: vi.fn(),
        getDocs: vi.fn(() => Promise.resolve({ docs: [] })),
        query: vi.fn(),
        where: vi.fn(),
    };
});

// Mock useNavigate and useParams
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: vi.fn(),
    useParams: vi.fn(),
    MemoryRouter: ({ children }) => <div>{children}</div>,
}));

describe('ItemDetails Component', () => {
    const mockNavigate = vi.fn();
    const mockUseParams = vi.fn();

    beforeEach(() => {
        mockNavigate.mockClear();
        mockUseParams.mockClear();
        useNavigate.mockImplementation(() => mockNavigate);
        useParams.mockImplementation(() => mockUseParams());
    });

    it('should display loading message when data is loading', () => {
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
        vi.mocked(getDoc).mockResolvedValueOnce({ exists: () => false });

        await act(async () => {
            render(
                <AuthProvider value={{ user: { uid: 'user1' } }}>
                    <MemoryRouter>
                        <ItemDetails />
                    </MemoryRouter>
                </AuthProvider>
            );
        });

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
        vi.mocked(getDoc).mockResolvedValueOnce({ exists: () => true, data: () => mockItem });

        await act(async () => {
            render(
                <AuthProvider value={{ user: { uid: 'user1' } }}>
                    <MemoryRouter>
                        <ItemDetails />
                    </MemoryRouter>
                </AuthProvider>
            );
        });

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
        vi.mocked(getDoc).mockResolvedValueOnce({ exists: () => true, data: () => mockItem });

        await act(async () => {
            render(
                <AuthProvider value={{ user: { uid: 'user1' } }}>
                    <MemoryRouter>
                        <ItemDetails />
                    </MemoryRouter>
                </AuthProvider>
            );
        });

        await waitFor(() => {
            expect(screen.getByText('✏️ Редактирай')).toBeInTheDocument();
            expect(screen.getByText('🗑 Изтрий')).toBeInTheDocument();
        }, { timeout: 2000 });
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
        vi.mocked(getDoc).mockResolvedValueOnce({ exists: () => true, data: () => mockItem });
        vi.mocked(deleteDoc).mockResolvedValueOnce();

        await act(async () => {
            render(
                <AuthProvider value={{ user: { uid: 'user1' } }}>
                    <MemoryRouter>
                        <ItemDetails />
                    </MemoryRouter>
                </AuthProvider>
            );
        });

        await waitFor(() => {
            fireEvent.click(screen.getByText('🗑 Изтрий'));
        }, { timeout: 2000 });

        await waitFor(() => {
            expect(vi.mocked(deleteDoc)).toHaveBeenCalledWith(expect.anything());
            expect(mockNavigate).toHaveBeenCalledWith('/catalog');
        });
    });
});