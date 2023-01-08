import appConstants from 'common/constants';
import { BadResponse } from 'common/types';
import ApiService from 'services/ApiService';

global.fetch = jest.fn() as jest.Mock;

describe('Api service', () => {
    const api = new ApiService();

    const productResponse = {
        id: 1,
        title: 'tes',
        description: 'test',
        price: 1000,
        discountPercentage: 10,
        rating: 1,
        stock: 1,
        brand: 'test',
        category: 'test',
        thumbnail: 'test',
        images: [],
    };

    const products = [productResponse, Object.assign({}, productResponse), Object.assign({}, productResponse)];

    describe('Get product function', () => {
        test('Should make request to API link', async () => {
            await api.getProduct('1');
            expect(global.fetch as jest.Mock).toHaveBeenCalledWith(expect.stringContaining(appConstants.productsApi));
        });

        test('Should return ProductResponse promise with id = 1', async () => {
            const blob = new Blob([JSON.stringify(productResponse)], { type: 'application/json' });
            (fetch as jest.Mock).mockReturnValue(new Response(blob));
            const response = await api.getProduct('1');
            expect(response).not.toHaveProperty('errorMessage');
            expect(response).toEqual(productResponse);
        });

        test('Should return BadResponse promise if response status not "ok"', async () => {
            (fetch as jest.Mock).mockReturnValue(new Response('', { status: 404 }));
            const response = await api.getProduct('1');
            expect(response).toHaveProperty('errorMessage');
            expect((response as BadResponse).errorMessage).toEqual('Product with id "1" not found');
        });

        test('Should return BadResponse promise if response type is not JSON', async () => {
            const blob = new Blob([JSON.stringify(productResponse)], { type: 'text' });
            (fetch as jest.Mock).mockReturnValue(new Response(blob));
            const response = await api.getProduct('1');
            expect(response).toHaveProperty('errorMessage');
            expect((response as BadResponse).errorMessage).toEqual('Incorrect response from the server');
        });

        test('Should return BadResponse promise if response status "ok" but response is null', async () => {
            const blob = new Blob([JSON.stringify(null)], { type: 'application/json' });
            (fetch as jest.Mock).mockReturnValue(
                new Response(blob, {
                    status: 200,
                })
            );
            const response = await api.getProduct('1');
            expect(response).toHaveProperty('errorMessage');
            expect((response as BadResponse).errorMessage).toEqual('Product with id "1" not found');
        });
    });

    describe('Get products function', () => {
        test('Should return ProductResponse array promise', async () => {
            const blob = new Blob([JSON.stringify(products)], { type: 'application/json' });
            (fetch as jest.Mock).mockReturnValue(new Response(blob));
            const response = await api.getProducts();
            expect(response?.length).toBe(3);
        });

        test('Should return null promise', async () => {
            const blob = new Blob([JSON.stringify(products)], { type: 'application/json' });
            (fetch as jest.Mock).mockReturnValue(
                new Response(blob, {
                    status: 404,
                })
            );
            const response = await api.getProducts();
            expect(response).toBeNull;
        });
    });
});
