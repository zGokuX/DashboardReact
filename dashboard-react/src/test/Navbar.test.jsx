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
        expect(
            screen.getByText('Profile config')

        ).exist();

    });
    //   it('calls onSave when button is clicked', async () => {
    // const props = {
    //   "show": true,
    //   "onHide": "onHide() {}",
    //   "product": {
    //     "id": 1,
    //     "title": "Essence Mascara Lash Princess",
    //     "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    //     "category": "beauty",
    //     "price": 9.99,
    //     "discountPercentage": 10.48,
    //     "rating": 2.56,
    //     "stock": 99,
    //     "tags": "[\"beauty\", \"mascara\"]",
    //     "brand": "Essence",
    //     "sku": "BEA-ESS-ESS-001",
    //     "weight": 4,
    //     "dimensions": "{depth: 22.99, height: 13.08, width: 15.14}",
    //     "warrantyInformation": "1 week warranty",
    //     "shippingInformation": "Ships in 3-5 business days",
    //     "availabilityStatus": "In Stock",
    //     "reviews": "[{…}, {…}, {…}]",
    //     "returnPolicy": "No return policy",
    //     "minimumOrderQuantity": 48,
    //     "meta": "{barcode: \"5784719087687\", createdAt: \"2025-04-30T0…}",
    //     "images": "[\"https://cdn.dummyjson.com/product-images/beauty/e…]",
    //     "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    //   },
    //   "inPage": true
    // }
    //     const onSave = vi.fn();
    //     render(<ProductModal { ...props} />);
    //     await userEvent.click(
    //       screen.getByRole('button', { name: 'Save' })
    //     );
    //     expect(onSave).toHaveBeenCalledTimes(1);
    //   });
});