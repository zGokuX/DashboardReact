// ProductCart.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import NavBarProfile from '@/components/ProfileUser/NavBarProfile';

vi.mock('react-redux', () => ({
    useDispatch: () => vi.fn(),
    useSelector: (fn) =>
        fn({
            user: {
                name: 'Andrei',
            },
        }),
}));


describe('NavBarProfile', () => {
    it('renders title', () => {
        render(
            <NavBarProfile setNavBarMarker={vi.fn()} navBarMarker={2} />
        );
        expect(screen.getByText('Profile config')).toBeTruthy() 
        expect(screen.getByText('Optional config')).toBeTruthy()
    });
});