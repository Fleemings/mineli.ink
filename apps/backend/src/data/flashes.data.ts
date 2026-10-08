import { Flash } from '../contracts';

/**
 * Static in-code catalog of tattoo flash designs.
 *
 * Flashes are a small, curated, manually-maintained set (not user-generated
 * content), so they're kept here as code rather than in the database —
 * avoiding the need for an admin CRUD/API and a storage bucket for images.
 * Update this list directly (and the matching image assets) to add/remove/
 * change flash availability.
 */
export const FLASHES: readonly Flash[] = [
    {
        id: 'flash-001',
        name: 'Borboleta',
        imageUrl: '/assets/images/flashes/flash-001.jpg',
        size: '6cm',
        price: 180,
        status: 'available',
    },
    {
        id: 'flash-002',
        name: 'Rosa dos Ventos',
        imageUrl: '/assets/images/flashes/flash-002.jpg',
        size: '8cm',
        price: 220,
        status: 'available',
    },
    {
        id: 'flash-003',
        name: 'Lua Crescente',
        imageUrl: '/assets/images/flashes/flash-003.jpg',
        size: '5cm',
        price: 150,
        status: 'reserved',
    },
    {
        id: 'flash-004',
        name: 'Serpente',
        imageUrl: '/assets/images/flashes/flash-004.jpg',
        size: '10cm',
        price: 260,
        status: 'sold',
    },
];
