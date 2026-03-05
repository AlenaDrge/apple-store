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
            { label: '128GB', price: 25590000 }
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
            { label: '256GB', price: 37769000 }
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
            { label: '512GB', price: 29490000 }
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
        name: 'MacBook Air M4',
        category: 'macbooks',
        price: 23990000,
        quantity: 30,
        description: 'MacBook Air M4 13 inch với chip M2 Pro, 16GB RAM, SSD 512GB, màn hình Liquid Retina XDR.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_15__7_163.png',
        memoryOptions: [
            { label: '8GB/256GB SSD', price: 23990000 }
        ],
        colors: ['Bạc', 'Xám', 'Vàng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_15__7_163.png'
        ]
    },
    {
        id: 5,
        name: 'MacBook Air M2',
        category: 'macbooks',
        price: 27990000,
        quantity: 10,
        description: 'MacBook Air siêu mỏng nhẹ với chip M2, 8GB RAM, SSD 256GB, thời lượng pin lên đến 18 giờ.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook_air_m2_4_1_1_2.jpg',
        memoryOptions: [
            { label: '8GB/256GB SSD', price: 27990000 }
        ],
        colors: ['Bạc', 'Xám'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook_air_m2_4_1_1_2.jpg'
        ]
    },
    {
        id: 6,
        name: 'MacBook Pro 14 M5',
        category: 'macbooks',
        price: 41690000,
        quantity: 20,
        description: 'MacBook Pro 14 M5 với chip M5, 16GB RAM, SSD 512GB, thời lượng pin lên đến 18 giờ.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook_air_m2_4_1_1_2.jpg',
        memoryOptions: [
            { label: '16GB/512GB SSD', price: 41690000 }
        ],
        colors: ['Bạc', 'Xám đậm'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook_air_m2_4_1_1_2.jpg'
        ]
    },
    {
        id: 7,
        name: 'iPad Air 11',
        category: 'ipads',
        price: 17590000,
        quantity: 20,
        description: 'iPad Air 11 inch với chip M3, màn hình Liquid Retina XDR, hỗ trợ Apple Pencil 2.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_45_.jpg',
        memoryOptions: [
            { label: '128GB Wi-Fi', price: 17590000 }
        ],
        colors: ['Xanh', 'Tím', 'Xám'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_45_.jpg'
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
            { label: '64GB Wi-Fi', price: 12990000 }
        ],
        colors: ['Bạc', 'Hồng', 'Xanh'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg'
        ]
    },
    {
        id: 9,
        name: 'iPad Mini 7',
        category: 'ipads',
        price: 17590000,
        quantity: 15,
        description: 'iPad Mini 7 với chip A17 Pro, màn hình Liquid Retina 8.3 inch, hỗ trợ Apple Pencil 2 và Magic Keyboard.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-7-5g-gray_2.jpg',
        memoryOptions: [
            { label: '128GB Wi-Fi', price: 17590000 }
        ],
        colors: ['Xám', 'Tím'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-7-5g-gray_2.jpg'
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
