// ProductCart.test.tsx
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ProductModal from '../components/Product/ProductModal';

vi.mock('react-redux', () => ({
    useDispatch: () => vi.fn(),
    useSelector: () => false
    
       
}));

describe('ProductModal', () => {
  it('renders title', () => {
    const props = {
  "show": true,
  "onHide": "onHide() {}",
  "product": {
    "id": 1,
    "title": "Essence Mascara Lash Princess",
    "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    "category": "beauty",
    "price": 9.99,
    "discountPercentage": 10.48,
    "rating": 2.56,
    "stock": 99,
    "tags": ["beauty", "mascara"],
    "brand": "Essence",
    "sku": "BEA-ESS-ESS-001",
    "weight": 4,
    "dimensions": {depth: "22.99", height: "13.08", width: "15.14"},
    "warrantyInformation": "1 week warranty",
    "shippingInformation": "Ships in 3-5 business days",
    "availabilityStatus": "In Stock",
    "reviews": [],
    "returnPolicy": "No return policy",
    "minimumOrderQuantity": 48,
    "meta": {barcode: "5784719087687", createdAt: "2025-04-30T0…"},
    "images": ["https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"],
    "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
  },
  "inPage": true
}
    render(<ProductModal { ...props} />);

    expect(screen.getByText('Product details')).toBeTruthy().toBeInTheDocument() //Se esiste e se si trova nel documento
    expect(screen.getByText('Chiudi')).toBeTruthy().toBeInTheDocument() 
    expect(screen.getByText(props.product.category)).toBeTruthy().toBeInTheDocument() 
    expect(screen.getByText(props.product.tags[0])).toBeTruthy().toBeInTheDocument() 

    expect(screen.getByTestId('image')).toBeTruthy()
    expect(screen.getByTestId('category')).toBeTruthy()
    expect(screen.getByTestId('title')).toBeTruthy()

    expect(screen.getByRole('button', { name: 'Chiudi' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Aggiungi al carrello' })).toBeTruthy()
    expect(screen.getByRole('img', { name: "image" })).toHaveAttribute('src', props.product.thumbnail);
  });
});