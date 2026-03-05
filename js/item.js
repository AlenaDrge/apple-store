const sampleProducts = [
    {
        id: 1,
        name: 'iPhone 14 Pro Max',
        category: 'iphones',
        price: 25590000,
        quantity: 10,
        description: 'iPhone 14 Pro Max với chip A16 Bionic, màn hình Super Retina XDR 6.7 inch, camera chính 48MP.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Đen', 'Tím', 'Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png',
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/_/t_m_19.png',
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/b/_/b_c_1_10.png'
        ]
    },
    {
        id: 2,
        name: 'iPhone 17 Pro Max',
        category: 'iphones',
        price: 37769000,
        quantity: 20,
        description: 'iPhone 17 Pro Max với chip A19 Bionic Pro, camera 48MP, thời lượng pin cả ngày.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-17-pro-max.jpg',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Cam Vũ Trụ'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-17-pro-max.jpg'
        ]
    },
    {
        id: 3,
        name: 'iPhone 15 Pro ',
        category: 'iphones',
        price: 29490000,
        quantity: 30,
        description: 'iPhone 15 với chip A15 Bionic, camera 48MP, thời lượng pin cả ngày.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-512gb-titan-den.jpg',
        memoryOptions: [
            { label: '512GB' }
        ],
        colors: ['Titan Đen', 'Titan Trắng', 'Titan Xanh'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-512gb-titan-den.jpg',
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-512gb-titan-trang.jpg',
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-512gb-titan-xanh.jpg'
        ]
    },
    {
        id: 4,
        name: 'MacBook Air M4 13 inch 2025',
        category: 'macbooks',
        price: 39490000,
        quantity: 30,
        description: 'MacBook Air M4 13 inch với chip M2 Pro, 16GB RAM, SSD 512GB, màn hình Liquid Retina XDR.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_2__9_14_1_1_1_1.png',
        memoryOptions: [
            { label: '10CPU - 10GPU - 24GB - 1TB' }
        ],
        colors: ['Đêm Xanh Thẳm'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_2__9_14_1_1_1_1.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_7__3_11_1_1_1_1.png'
        ]
    },
    {
        id: 5,
        name: 'MacBook Air 15 inch M2 2023',
        category: 'macbooks',
        price: 30490000,
        quantity: 10,
        description: 'MacBook Air siêu mỏng nhẹ với chip M2, 16GB RAM, SSD 256GB, thời lượng pin lên đến 18 giờ.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-15-inch-m2-2023-16gb-256gb_1_.png',
        memoryOptions: [
            { label: '16GB/256GB' }
        ],
        colors: ['Đen Xanh Biển', 'Bạc Xanh Lá Cây'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-15-inch-m2-2023-16gb-256gb_1_.png',
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/a/p/apple-macbook-air-15-inch-m2-2023-midnight-1_2.jpg',
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/a/p/apple-macbook-air-m2-2023-16gb-silver-1_1.jpg'
        ]
    },
    {
        id: 6,
        name: 'MacBook Pro 14 M5',
        category: 'macbooks',
        price: 41890000,
        quantity: 20,
        description: 'MacBook Pro 14 M5 với chip M5, 16GB RAM, SSD 512GB, thời lượng pin lên đến 18 giờ.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
        memoryOptions: [
            { label: '10CPU - 10GPU - 16GB - 512GB' }
        ],
        colors: ['Đen Không Gian', 'Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_15_130.png'
        ]
    },
    {
        id: 7,
        name: 'iPad Air 11 inch M3',
        category: 'ipads',
        price: 24090000,
        quantity: 20,
        description: 'iPad Air 11 inch với chip M3, màn hình Liquid Retina XDR, hỗ trợ Apple Pencil 2.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-11-wifi-1_2.jpg',
        memoryOptions: [
            { label: 'Air 11 inch M3 Wifi 512GB' }
        ],
        colors: ['Tím', 'Xanh Dương', 'Xám'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-11-wifi-1_2.jpg',
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_54__2.jpg',
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_53__2.jpg'
        ]
    },
    {
        id: 8,
        name: 'iPad Air 5',
        category: 'ipads',
        price: 12990000,
        quantity: 15,
        description: 'iPad Air với chip M1, màn hình Liquid Retina 10.9 inch, hỗ trợ Apple Pencil 2 và Magic Keyboard.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg',
        memoryOptions: [
            { label: '64GB Wi-Fi' }
        ],
        colors: ['Hồng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg'
        ]
    },
    {
        id: 9,
        name: 'iPad mini 7 2024',
        category: 'ipads',
        price: 17590000,
        quantity: 15,
        description: 'iPad Mini 7 với chip A17 Pro, màn hình Liquid Retina 8.3 inch, hỗ trợ Apple Pencil 2 và Magic Keyboard.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-gray_2.jpg',
        memoryOptions: [
            { label: '259GB Wi-Fi' }
        ],
        colors: ['Xám', 'Tím'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-gray_2.jpg',
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-purple_1.jpg',
        ]
    },
    {
        id: 10,
        name: 'AirPods Pro 2',
        category: 'airpods',
        price: 6990000,
        quantity: 25,
        description: 'AirPods Pro thế hệ 2 với tính năng chống ồn chủ động, âm thanh chất lượng cao và sạc không dây.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg'
        ]
    },
    {
        id: 11,
        name: 'AirPods 3',
        category: 'airpods',
        price: 4990000,
        quantity: 10,
        description: 'AirPods thế hệ 3 với thiết kế contoured, tính năng Spatial Audio và thời lượng pin lên đến 6 giờ.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png'
        ]
    },
    {
        id: 12,
        name: 'AirPods Pro 2021 Magsafe',
        category: 'airpods',
        price: 4690000,
        quantity: 20,
        description: 'AirPods Pro 2021 Magsafe với tính năng chống ồn chủ động, âm thanh chất lượng cao và sạc không dây.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    }
];
