// ProductCart.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import NavBarProfile from '@/components/ProfileUser/NavBarProfile';

vi.mock('react-redux', () => ({
    useDispatch: () => vi.fn(),
    useSelector: () => {
        return [1,2,3]
    }
}));


describe('NavBarProfile', () => {
    it('renders title', () => {
        render(
            <NavBarProfile setNavBarMarker={vi.fn()} navBarMarker={2} />
        );
        expect(screen.getByRole('button', { name: 'Profile config' })).toBeTruthy()
        expect(screen.getByText('Profile config')).toBeTruthy()
        expect(screen.getByText('Optional config')).toBeTruthy()
        expect(screen.getByText('History payment')).toBeTruthy()
        expect(screen.getByTestId('basic-navbar-nav')).toBeTruthy()
    });
});