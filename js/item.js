// Sample products data
const sampleProducts = [
    {
        id: 1,
        name: 'iPhone 14 Pro Max',
        category: 'iphones',
        price: 25590000,
        quantity: 10,
        description: 'iPhone 14 Pro Max cao cấp với hiệu năng mạnh mẽ.\nMàn hình lớn, camera đa ống kính, bộ nhớ 128GB, chụp đêm ấn tượng.',
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
        description: 'iPhone 17 Pro Max thế hệ mới, hiệu năng và camera nâng cấp.\nBộ nhớ 256GB, thoải mái lưu ảnh, video và ứng dụng nặng.',
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
        description: 'iPhone 15 Pro thiết kế sang trọng, hiệu năng mượt.\nCamera chụp đêm tốt, bộ nhớ 512GB lưu trữ dư dả cho ảnh và game.',
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
        description: 'MacBook Air M4 13 inch mỏng nhẹ, pin tốt.\nRAM lớn, SSD nhanh cho đa nhiệm mượt mà.',
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
        description: 'MacBook Air 15 inch M2 2023 màn hình lớn, thiết kế mỏng.\nRAM 16GB, SSD 256GB đủ cho học tập và văn phòng.',
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
        description: 'MacBook Pro 14 M5 hiệu năng mạnh cho công việc nặng.\nRAM 16GB, SSD 512GB xử lý đồ họa, dựng phim mượt.',
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
        description: 'iPad Air 11 inch M3 mỏng nhẹ, màn hình đẹp.\nHỗ trợ Apple Pencil, bộ nhớ lớn cho tài liệu, bài học và phim.',
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
        description: 'iPad Air 5 gọn nhẹ, dễ mang theo.\nMàn hình 10.9 inch, bộ nhớ 64GB cho nhu cầu cơ bản hằng ngày.',
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
        description: 'iPad mini 7 2024 nhỏ gọn, cầm một tay.\nMàn hình 8.3 inch, bộ nhớ lớn cho sách, ghi chú và ứng dụng.',
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
        description: 'AirPods Pro 2 chống ồn chủ động, âm thanh rõ.\nĐeo thoải mái, tiện cho di chuyển hàng ngày.',
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
        description: 'AirPods 3 thiết kế gọn, dễ đeo.\nÂm thanh trong trẻo, phù hợp nghe nhạc và gọi thoại.',
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
        description: 'AirPods Pro 2021 Magsafe chống ồn tốt, sạc tiện.\nLựa chọn hợp lý cho người hay di chuyển.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    },
    {
        id: 13,
        name: 'iPhone 16 128GB',
        category: 'iphones',
        price: 21990000,
        quantity: 25,
        description: 'iPhone 16 128GB với thiết kế mới, màu sắc trẻ trung.\nCamera nâng cấp, bộ nhớ 128GB cho ảnh, video và ứng dụng.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Xanh Mòng Két'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png'
        ]
    },
    {
        id: 14,
        name: 'MacBook Air 13 inch M3 2024',
        category: 'macbooks',
        price: 29490000,
        quantity: 18,
        description: 'MacBook Air 13 inch M3 2024 nhẹ, pin tốt.\nRAM 8GB, SSD 256GB cho công việc và học tập hằng ngày.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png',
        memoryOptions: [
            { label: '8GB/256GB' }
        ],
        colors: ['Xanh Lá Cây'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png'
        ]
    },
    {
        id: 15,
        name: 'iPad Pro 13 inch M4 2024',
        category: 'ipads',
        price: 32990000,
        quantity: 12,
        description: 'iPad Pro 13 inch M4 màn hình đẹp, hiệu năng mạnh.\nHỗ trợ Apple Pencil Pro, bộ nhớ 256GB cho file sáng tạo.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-m4-11-inch_8.png',
        memoryOptions: [
            { label: '256GB Wi-Fi' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-m4-11-inch_8.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-pro-m4-13-inch_9_.png'
        ]
    },
    {
        id: 16,
        name: 'AirPods 4',
        category: 'airpods',
        price: 5490000,
        quantity: 30,
        description: 'AirPods 4 thiết kế mới, hỗ trợ Adaptive Audio.\nKết nối nhanh, pin ổn, dùng cả ngày.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods-4-chong-on-9.png'
        ]
    }
];
