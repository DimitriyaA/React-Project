import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest'; // За мокинг на функции
import { describe, it, expect, beforeEach } from 'vitest'; // За тестовете
import { addDoc } from 'firebase/firestore';
import AddItem from './AddItem';
import { useAuthContext } from "../contexts/AuthContext";
import { MemoryRouter } from 'react-router-dom';

// Mock на useAuthContext
vi.mock('../contexts/AuthContext', () => ({
    useAuthContext: vi.fn(),
}));

// Mock на Firebase
vi.mock('../firebase/firebaseConfig', () => ({
    db: {},
    collection: vi.fn(),
    addDoc: vi.fn(),
    serverTimestamp: vi.fn(),
}));

describe('AddItem Component', () => {

    beforeEach(() => {
        useAuthContext.mockReturnValue({ user: { uid: 'user123' } }); // Поставяме mock потребител
    });

    it('should render form elements', () => {
        render(
            <MemoryRouter>
                <AddItem />
            </MemoryRouter>
        );

        // Проверка дали полетата са рендерирани
        expect(screen.getByPlaceholderText('Име на предмета')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Описание')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('URL към снимка')).toBeInTheDocument();
        expect(screen.getByText('Избери категория')).toBeInTheDocument();
    });

    it('should show alert if fields are not filled in', async () => {
        render(
            <MemoryRouter>
                <AddItem />
            </MemoryRouter>
        );

        const submitButton = screen.getByText('Добави предмет');
        fireEvent.click(submitButton);

        // Изчакваме да се покаже alert
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Моля, попълнете всички полета!');
        });
    });

    it('should submit form and navigate when valid', async () => {
        render(
            <MemoryRouter>
                <AddItem />
            </MemoryRouter>
        );

        // Попълване на формата
        fireEvent.change(screen.getByPlaceholderText('Име на предмета'), { target: { value: 'Магически меч' } });
        fireEvent.change(screen.getByPlaceholderText('Описание'), { target: { value: 'Силен меч' } });
        fireEvent.change(screen.getByPlaceholderText('URL към снимка'), { target: { value: 'https://example.com/image.jpg' } });
        fireEvent.change(screen.getByText('Избери категория'), { target: { value: 'Артефакт' } });

        const submitButton = screen.getByText('Добави предмет');

        // Mock за addDoc
        addDoc.mockResolvedValue({});

        // Клик върху бутона за изпращане
        fireEvent.click(submitButton);

        // Изчакваме да се изпълни логиката за добавяне
        await waitFor(() => {
            expect(addDoc).toHaveBeenCalledTimes(1);
            expect(addDoc).toHaveBeenCalledWith(
                expect.any(Object), // Колекцията
                expect.objectContaining({
                    name: 'Магически меч',
                    description: 'Силен меч',
                    imageUrl: 'https://example.com/image.jpg',
                    category: 'Артефакт',
                    createdAt: expect.any(Object),
                    createdBy: 'user123', // ID на потребителя
                })
            );
        });
    });

    it('should show alert if user is not logged in', async () => {
        useAuthContext.mockReturnValue({ user: null }); // Поставяме mock за не влязъл потребител

        render(
            <MemoryRouter>
                <AddItem />
            </MemoryRouter>
        );

        const submitButton = screen.getByText('Добави предмет');
        fireEvent.click(submitButton);

        // Изчакваме да се покаже alert
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Не сте влезли в системата!');
        });
    });

});
