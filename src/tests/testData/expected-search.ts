import { ProductIsInCart } from 'common/types';

export const expectedArray: ProductIsInCart[] = [
    {
        brand: 'Apple',
        category: 'smartphones',
        description: 'An apple mobile which is nothing like apple',
        discountPercentage: 12.96,
        id: 1,
        images: [
            'https://i.dummyjson.com/data/products/1/3.jpg',
            'https://i.dummyjson.com/data/products/1/4.jpg',
            'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        ],
        price: 549,
        rating: 4.69,
        stock: 94,
        thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        title: 'iPhone 9',
        currentPrice: 400,
        isInCart: false,
    },
    {
        brand: 'Apple',
        category: 'smartphones',
        description:
            'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
        discountPercentage: 17.94,
        id: 2,
        images: [
            'https://i.dummyjson.com/data/products/2/1.jpg',
            'https://i.dummyjson.com/data/products/2/2.jpg',
            'https://i.dummyjson.com/data/products/2/3.jpg',
            'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        ],
        price: 899,
        rating: 4.44,
        stock: 34,
        thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        title: 'iPhone X',
        currentPrice: 800,
        isInCart: false,
    },
    {
        brand: 'Samsung',
        category: 'smartphones',
        description: "Samsung's new variant which goes beyond Galaxy to the Universe",
        discountPercentage: 15.46,
        id: 3,
        images: [
            'https://i.dummyjson.com/data/products/3/1.jpg',
            'https://firebasestorage.googleapis.com/v0/b/online-store-770d4.appspot.com/o/samsumg-universe-9-3.jfif?alt=media&token=92b11ca2-2130-4a93-81fe-bdea174e52da',
            'https://firebasestorage.googleapis.com/v0/b/online-store-770d4.appspot.com/o/samsung-universe-9-2.jpg?alt=media&token=265da062-a27f-4a76-8f60-8833804e1258',
        ],
        price: 1249,
        rating: 4.09,
        stock: 36,
        thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
        title: 'Samsung Universe 9',
        currentPrice: 1000,
        isInCart: false,
    },
    {
        brand: 'fauji',
        category: 'groceries',
        description:
            'original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji',
        discountPercentage: 16.8,
        id: 243,
        images: [
            'https://i.dummyjson.com/data/products/24/1.jpg',
            'https://i.dummyjson.com/data/products/24/3.jpg',
            'https://i.dummyjson.com/data/products/24/4.jpg',
            'https://i.dummyjson.com/data/products/24/thumbnail.jpg',
        ],
        price: 46,
        rating: 4.94,
        stock: 113,
        thumbnail: 'https://i.dummyjson.com/data/products/24/thumbnail.jpg',
        title: 'cereals muesli fruit nuts',
        currentPrice: 30,
        isInCart: false,
    },
];

export const expectedBrandArray: ProductIsInCart[] = [
    {
        brand: 'Apple',
        category: 'smartphones',
        description: 'An apple mobile which is nothing like apple',
        discountPercentage: 12.96,
        id: 1,
        images: [
            'https://i.dummyjson.com/data/products/1/3.jpg',
            'https://i.dummyjson.com/data/products/1/4.jpg',
            'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        ],
        price: 549,
        rating: 4.69,
        stock: 94,
        thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        title: 'iPhone 9',
        currentPrice: 400,
        isInCart: false,
    },
    {
        brand: 'Apple',
        category: 'smartphones',
        description:
            'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
        discountPercentage: 17.94,
        id: 2,
        images: [
            'https://i.dummyjson.com/data/products/2/1.jpg',
            'https://i.dummyjson.com/data/products/2/2.jpg',
            'https://i.dummyjson.com/data/products/2/3.jpg',
            'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        ],
        price: 899,
        rating: 4.44,
        stock: 34,
        thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        title: 'iPhone X',
        currentPrice: 800,
        isInCart: false,
    },
];

export const expectedCategoryArray: ProductIsInCart[] = [
    {
        brand: 'fauji',
        category: 'groceries',
        description:
            'original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji',
        discountPercentage: 16.8,
        id: 243,
        images: [
            'https://i.dummyjson.com/data/products/24/1.jpg',
            'https://i.dummyjson.com/data/products/24/3.jpg',
            'https://i.dummyjson.com/data/products/24/4.jpg',
            'https://i.dummyjson.com/data/products/24/thumbnail.jpg',
        ],
        price: 46,
        rating: 4.94,
        stock: 113,
        thumbnail: 'https://i.dummyjson.com/data/products/24/thumbnail.jpg',
        title: 'cereals muesli fruit nuts',
        currentPrice: 30,
        isInCart: false,
    },
];

export const expectedDescriptionArray: ProductIsInCart[] = [
    {
        brand: 'fauji',
        category: 'groceries',
        description:
            'original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji',
        discountPercentage: 16.8,
        id: 243,
        images: [
            'https://i.dummyjson.com/data/products/24/1.jpg',
            'https://i.dummyjson.com/data/products/24/3.jpg',
            'https://i.dummyjson.com/data/products/24/4.jpg',
            'https://i.dummyjson.com/data/products/24/thumbnail.jpg',
        ],
        price: 46,
        rating: 4.94,
        stock: 113,
        thumbnail: 'https://i.dummyjson.com/data/products/24/thumbnail.jpg',
        title: 'cereals muesli fruit nuts',
        currentPrice: 30,
        isInCart: false,
    },
];
export const expectedDiscountArray: ProductIsInCart[] = [
    {
        brand: 'Apple',
        category: 'smartphones',
        description: 'An apple mobile which is nothing like apple',
        discountPercentage: 12.96,
        id: 1,
        images: [
            'https://i.dummyjson.com/data/products/1/3.jpg',
            'https://i.dummyjson.com/data/products/1/4.jpg',
            'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        ],
        price: 549,
        rating: 4.69,
        stock: 94,
        thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        title: 'iPhone 9',
        currentPrice: 400,
        isInCart: false,
    },
];

export const expectedPriceArray: ProductIsInCart[] = [
    {
        brand: 'Samsung',
        category: 'smartphones',
        description: "Samsung's new variant which goes beyond Galaxy to the Universe",
        discountPercentage: 15.46,
        id: 3,
        images: [
            'https://i.dummyjson.com/data/products/3/1.jpg',
            'https://firebasestorage.googleapis.com/v0/b/online-store-770d4.appspot.com/o/samsumg-universe-9-3.jfif?alt=media&token=92b11ca2-2130-4a93-81fe-bdea174e52da',
            'https://firebasestorage.googleapis.com/v0/b/online-store-770d4.appspot.com/o/samsung-universe-9-2.jpg?alt=media&token=265da062-a27f-4a76-8f60-8833804e1258',
        ],
        price: 1249,
        rating: 4.09,
        stock: 36,
        thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
        title: 'Samsung Universe 9',
        currentPrice: 1000,
        isInCart: false,
    },
];

export const expectedRatingArray: ProductIsInCart[] = [
    {
        brand: 'fauji',
        category: 'groceries',
        description:
            'original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji',
        discountPercentage: 16.8,
        id: 243,
        images: [
            'https://i.dummyjson.com/data/products/24/1.jpg',
            'https://i.dummyjson.com/data/products/24/3.jpg',
            'https://i.dummyjson.com/data/products/24/4.jpg',
            'https://i.dummyjson.com/data/products/24/thumbnail.jpg',
        ],
        price: 46,
        rating: 4.94,
        stock: 113,
        thumbnail: 'https://i.dummyjson.com/data/products/24/thumbnail.jpg',
        title: 'cereals muesli fruit nuts',
        currentPrice: 30,
        isInCart: false,
    },
];

export const expectedStockArray: ProductIsInCart[] = [
    {
        brand: 'Samsung',
        category: 'smartphones',
        description: "Samsung's new variant which goes beyond Galaxy to the Universe",
        discountPercentage: 15.46,
        id: 3,
        images: [
            'https://i.dummyjson.com/data/products/3/1.jpg',
            'https://firebasestorage.googleapis.com/v0/b/online-store-770d4.appspot.com/o/samsumg-universe-9-3.jfif?alt=media&token=92b11ca2-2130-4a93-81fe-bdea174e52da',
            'https://firebasestorage.googleapis.com/v0/b/online-store-770d4.appspot.com/o/samsung-universe-9-2.jpg?alt=media&token=265da062-a27f-4a76-8f60-8833804e1258',
        ],
        price: 1249,
        rating: 4.09,
        stock: 36,
        thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
        title: 'Samsung Universe 9',
        currentPrice: 1000,
        isInCart: false,
    },
];

export const expectedTitleArray: ProductIsInCart[] = [
    {
        brand: 'Samsung',
        category: 'smartphones',
        description: "Samsung's new variant which goes beyond Galaxy to the Universe",
        discountPercentage: 15.46,
        id: 3,
        images: [
            'https://i.dummyjson.com/data/products/3/1.jpg',
            'https://firebasestorage.googleapis.com/v0/b/online-store-770d4.appspot.com/o/samsumg-universe-9-3.jfif?alt=media&token=92b11ca2-2130-4a93-81fe-bdea174e52da',
            'https://firebasestorage.googleapis.com/v0/b/online-store-770d4.appspot.com/o/samsung-universe-9-2.jpg?alt=media&token=265da062-a27f-4a76-8f60-8833804e1258',
        ],
        price: 1249,
        rating: 4.09,
        stock: 36,
        thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
        title: 'Samsung Universe 9',
        currentPrice: 1000,
        isInCart: false,
    },
];

export const expectedCurrentPriceArray: ProductIsInCart[] = [
    {
        brand: 'Apple',
        category: 'smartphones',
        description:
            'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
        discountPercentage: 17.94,
        id: 2,
        images: [
            'https://i.dummyjson.com/data/products/2/1.jpg',
            'https://i.dummyjson.com/data/products/2/2.jpg',
            'https://i.dummyjson.com/data/products/2/3.jpg',
            'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        ],
        price: 899,
        rating: 4.44,
        stock: 34,
        thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        title: 'iPhone X',
        currentPrice: 800,
        isInCart: false,
    },
];
