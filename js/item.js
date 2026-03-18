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
    },

    // ===== iPhone thêm mới =====
    {
        id: 17,
        name: 'iPhone 14',
        category: 'iphones',
        price: 19990000,
        quantity: 20,
        description: 'iPhone 14.\nThiết kế hiện đại, hiệu năng ổn định cho nhu cầu hằng ngày.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Đen'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png'
        ]
    },
    {
        id: 18,
        name: 'iPhone 14 Plus',
        category: 'iphones',
        price: 21990000,
        quantity: 15,
        description: 'iPhone 14 Plus.\nMàn hình lớn hơn, phù hợp xem phim và chơi game.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Tím'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png'
        ]
    },
    {
        id: 19,
        name: 'iPhone 15',
        category: 'iphones',
        price: 22990000,
        quantity: 25,
        description: 'iPhone 15.\nHiệu năng tốt, camera rõ nét, phù hợp sử dụng lâu dài.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-512gb-titan-den.jpg',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Xanh'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-512gb-titan-den.jpg'
        ]
    },
    {
        id: 20,
        name: 'iPhone 15 Plus',
        category: 'iphones',
        price: 24990000,
        quantity: 18,
        description: 'iPhone 15 Plus.\nMàn hình lớn, pin tốt, phù hợp giải trí cả ngày.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-512gb-titan-den.jpg',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Đen'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-512gb-titan-den.jpg'
        ]
    },
    {
        id: 21,
        name: 'iPhone 15 Plus 256GB',
        category: 'iphones',
        price: 26990000,
        quantity: 15,
        description: 'iPhone 15 Plus 256GB.\nDung lượng lớn, lưu trữ thoải mái ảnh và video.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-512gb-titan-den.jpg',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-512gb-titan-den.jpg'
        ]
    },
    {
        id: 22,
        name: 'iPhone 15 256GB',
        category: 'iphones',
        price: 25990000,
        quantity: 15,
        description: 'iPhone 15 256GB.\nHiệu năng mượt, bộ nhớ lớn cho ứng dụng và game.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-512gb-titan-den.jpg',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Vàng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-512gb-titan-den.jpg'
        ]
    },
    {
        id: 23,
        name: 'iPhone 14 256GB',
        category: 'iphones',
        price: 22990000,
        quantity: 20,
        description: 'iPhone 14 256GB.\nThiết kế gọn, bộ nhớ đủ cho nhu cầu hằng ngày.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Đen'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png'
        ]
    },
    {
        id: 24,
        name: 'iPhone 13',
        category: 'iphones',
        price: 16990000,
        quantity: 25,
        description: 'iPhone 13.\nLựa chọn tiết kiệm với hiệu năng vẫn rất tốt.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Xanh'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png'
        ]
    },
    {
        id: 25,
        name: 'iPhone 13 256GB',
        category: 'iphones',
        price: 18990000,
        quantity: 20,
        description: 'iPhone 13 256GB.\nDung lượng lớn, phù hợp lưu trữ nhiều dữ liệu.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png'
        ]
    },
    {
        id: 26,
        name: 'iPhone SE 2024',
        category: 'iphones',
        price: 12990000,
        quantity: 30,
        description: 'iPhone SE 2024.\nMáy nhỏ gọn, cấu hình ổn trong tầm giá.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Đỏ'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png'
        ]
    },
    {
        id: 27,
        name: 'iPhone SE 2024 256GB',
        category: 'iphones',
        price: 14990000,
        quantity: 25,
        description: 'iPhone SE 2024 256GB.\nNhỏ gọn nhưng bộ nhớ lớn, dùng lâu dài.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Đỏ'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png'
        ]
    },
    {
        id: 28,
        name: 'iPhone 16 Plus',
        category: 'iphones',
        price: 24990000,
        quantity: 20,
        description: 'iPhone 16 Plus.\nMàn hình lớn, trải nghiệm giải trí tốt.',
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
        id: 29,
        name: 'iPhone 16 Plus 256GB',
        category: 'iphones',
        price: 26990000,
        quantity: 20,
        description: 'iPhone 16 Plus 256GB.\nDung lượng lớn, phù hợp người dùng nặng.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Xanh Mòng Két'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png'
        ]
    },
    {
        id: 30,
        name: 'iPhone 17',
        category: 'iphones',
        price: 25990000,
        quantity: 25,
        description: 'iPhone 17.\nPhiên bản tiêu chuẩn với hiệu năng mạnh mẽ.',
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
        id: 31,
        name: 'iPhone 17 Plus',
        category: 'iphones',
        price: 27990000,
        quantity: 20,
        description: 'iPhone 17 Plus.\nMàn hình lớn, thời lượng pin tốt cho cả ngày.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-17-pro-max.jpg',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Cam Vũ Trụ'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-17-pro-max.jpg'
        ]
    },

    // ===== MacBook thêm mới =====
    {
        id: 32,
        name: 'MacBook Air M2 13 inch',
        category: 'macbooks',
        price: 25990000,
        quantity: 15,
        description: 'MacBook Air M2 13 inch.\nMỏng nhẹ, phù hợp học tập và làm việc văn phòng.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-15-inch-m2-2023-16gb-256gb_1_.png',
        memoryOptions: [
            { label: '8GB/256GB' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-15-inch-m2-2023-16gb-256gb_1_.png'
        ]
    },
    {
        id: 33,
        name: 'MacBook Air M2 13 inch 16GB',
        category: 'macbooks',
        price: 27990000,
        quantity: 12,
        description: 'MacBook Air M2 13 inch 16GB.\nĐa nhiệm tốt, chạy mượt nhiều ứng dụng.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-15-inch-m2-2023-16gb-256gb_1_.png',
        memoryOptions: [
            { label: '16GB/256GB' }
        ],
        colors: ['Đen Xanh Biển'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-15-inch-m2-2023-16gb-256gb_1_.png'
        ]
    },
    {
        id: 34,
        name: 'MacBook Air M2 15 inch 512GB',
        category: 'macbooks',
        price: 32990000,
        quantity: 10,
        description: 'MacBook Air M2 15 inch 512GB.\nMàn hình lớn, bộ nhớ rộng cho file và ứng dụng.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-15-inch-m2-2023-16gb-256gb_1_.png',
        memoryOptions: [
            { label: '16GB/512GB' }
        ],
        colors: ['Bạc Xanh Lá Cây'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-15-inch-m2-2023-16gb-256gb_1_.png'
        ]
    },
    {
        id: 35,
        name: 'MacBook Pro 14 M3',
        category: 'macbooks',
        price: 45990000,
        quantity: 8,
        description: 'MacBook Pro 14 M3.\nHiệu năng mạnh cho công việc đồ họa và lập trình.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
        memoryOptions: [
            { label: '16GB/512GB' }
        ],
        colors: ['Đen Không Gian'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png'
        ]
    },
    {
        id: 36,
        name: 'MacBook Pro 14 M3 Max',
        category: 'macbooks',
        price: 55990000,
        quantity: 5,
        description: 'MacBook Pro 14 M3 Max.\nMáy mạnh cho dựng phim, 3D và tác vụ nặng.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
        memoryOptions: [
            { label: '32GB/1TB' }
        ],
        colors: ['Đen Không Gian'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png'
        ]
    },
    {
        id: 37,
        name: 'MacBook Pro 16 M3',
        category: 'macbooks',
        price: 52990000,
        quantity: 8,
        description: 'MacBook Pro 16 M3.\nMàn hình lớn, phù hợp làm việc chuyên nghiệp.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
        memoryOptions: [
            { label: '16GB/512GB' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png'
        ]
    },
    {
        id: 38,
        name: 'MacBook Pro 16 M3 Max',
        category: 'macbooks',
        price: 62990000,
        quantity: 5,
        description: 'MacBook Pro 16 M3 Max.\nCấu hình cao cho studio sáng tạo.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
        memoryOptions: [
            { label: '32GB/1TB' }
        ],
        colors: ['Đen Không Gian'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png'
        ]
    },
    {
        id: 39,
        name: 'MacBook Air M1 13 inch',
        category: 'macbooks',
        price: 18990000,
        quantity: 20,
        description: 'MacBook Air M1 13 inch.\nGiá tốt, hiệu năng vẫn rất mạnh.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png',
        memoryOptions: [
            { label: '8GB/256GB' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png'
        ]
    },
    {
        id: 40,
        name: 'MacBook Air M1 13 inch 512GB',
        category: 'macbooks',
        price: 21990000,
        quantity: 15,
        description: 'MacBook Air M1 13 inch 512GB.\nBộ nhớ lớn, lưu trữ nhiều tài liệu.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png',
        memoryOptions: [
            { label: '8GB/512GB' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png'
        ]
    },
    {
        id: 41,
        name: 'MacBook Pro 13 M2',
        category: 'macbooks',
        price: 27990000,
        quantity: 12,
        description: 'MacBook Pro 13 M2.\nMáy nhỏ, hiệu năng tốt cho coder và designer.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
        memoryOptions: [
            { label: '16GB/256GB' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png'
        ]
    },
    {
        id: 42,
        name: 'MacBook Pro 13 M2 512GB',
        category: 'macbooks',
        price: 30990000,
        quantity: 10,
        description: 'MacBook Pro 13 M2 512GB.\nBộ nhớ lớn, phù hợp dự án nhiều file.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
        memoryOptions: [
            { label: '16GB/512GB' }
        ],
        colors: ['Đen Không Gian'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png'
        ]
    },
    {
        id: 43,
        name: 'MacBook Air M3 15 inch',
        category: 'macbooks',
        price: 33490000,
        quantity: 10,
        description: 'MacBook Air M3 15 inch.\nMàn hình rộng, trải nghiệm làm việc thoải mái.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png',
        memoryOptions: [
            { label: '8GB/512GB' }
        ],
        colors: ['Xanh Lá Cây'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png'
        ]
    },
    {
        id: 44,
        name: 'MacBook Air M3 15 inch 16GB',
        category: 'macbooks',
        price: 35990000,
        quantity: 8,
        description: 'MacBook Air M3 15 inch 16GB.\nĐa nhiệm tốt, phù hợp làm việc lâu dài.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png',
        memoryOptions: [
            { label: '16GB/512GB' }
        ],
        colors: ['Xanh Lá Cây'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png'
        ]
    },
    {
        id: 45,
        name: 'MacBook Pro 14 M4',
        category: 'macbooks',
        price: 48990000,
        quantity: 6,
        description: 'MacBook Pro 14 M4.\nThế hệ mới, hiệu năng mạnh cho công việc sáng tạo.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
        memoryOptions: [
            { label: '16GB/512GB' }
        ],
        colors: ['Đen Không Gian'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png'
        ]
    },
    {
        id: 46,
        name: 'MacBook Pro 16 M4',
        category: 'macbooks',
        price: 58990000,
        quantity: 4,
        description: 'MacBook Pro 16 M4.\nMàn hình lớn, cấu hình cao cho công việc chuyên sâu.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
        memoryOptions: [
            { label: '32GB/1TB' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png'
        ]
    },

    // ===== iPad thêm mới =====
    {
        id: 47,
        name: 'iPad 10.9 inch 2024',
        category: 'ipads',
        price: 11990000,
        quantity: 25,
        description: 'iPad 10.9 inch 2024.\nMàn hình rộng, phù hợp giải trí và học tập.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg',
        memoryOptions: [
            { label: '64GB Wi-Fi' }
        ],
        colors: ['Xanh'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg'
        ]
    },
    {
        id: 48,
        name: 'iPad 10.9 inch 2024 256GB',
        category: 'ipads',
        price: 14990000,
        quantity: 20,
        description: 'iPad 10.9 inch 2024 256GB.\nDung lượng lớn cho phim và ứng dụng.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg',
        memoryOptions: [
            { label: '256GB Wi-Fi' }
        ],
        colors: ['Xanh'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg'
        ]
    },
    {
        id: 49,
        name: 'iPad mini 6',
        category: 'ipads',
        price: 11990000,
        quantity: 20,
        description: 'iPad mini 6.\nMáy nhỏ gọn, tiện mang theo mọi nơi.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-gray_2.jpg',
        memoryOptions: [
            { label: '64GB Wi-Fi' }
        ],
        colors: ['Xám'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-gray_2.jpg'
        ]
    },
    {
        id: 50,
        name: 'iPad mini 6 256GB',
        category: 'ipads',
        price: 14990000,
        quantity: 15,
        description: 'iPad mini 6 256GB.\nBộ nhớ lớn cho sách, phim và ứng dụng.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-gray_2.jpg',
        memoryOptions: [
            { label: '256GB Wi-Fi' }
        ],
        colors: ['Tím'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-gray_2.jpg'
        ]
    },
    {
        id: 51,
        name: 'iPad Air 11 inch M2',
        category: 'ipads',
        price: 19990000,
        quantity: 18,
        description: 'iPad Air 11 inch M2.\nHiệu năng tốt cho học tập và làm việc.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-air-11-wifi-1_2.jpg',
        memoryOptions: [
            { label: '128GB Wi-Fi' }
        ],
        colors: ['Xanh Dương'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-air-11-wifi-1_2.jpg'
        ]
    },
    {
        id: 52,
        name: 'iPad Air 11 inch M2 256GB',
        category: 'ipads',
        price: 22990000,
        quantity: 15,
        description: 'iPad Air 11 inch M2 256GB.\nDung lượng lớn, hỗ trợ nhiều ứng dụng học tập.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-air-11-wifi-1_2.jpg',
        memoryOptions: [
            { label: '256GB Wi-Fi' }
        ],
        colors: ['Xám'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-air-11-wifi-1_2.jpg'
        ]
    },
    {
        id: 53,
        name: 'iPad Pro 11 inch M4',
        category: 'ipads',
        price: 27990000,
        quantity: 12,
        description: 'iPad Pro 11 inch M4.\nMàn hình đẹp, hỗ trợ Apple Pencil Pro.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-m4-11-inch_8.png',
        memoryOptions: [
            { label: '256GB Wi-Fi' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-m4-11-inch_8.png'
        ]
    },
    {
        id: 54,
        name: 'iPad Pro 11 inch M4 512GB',
        category: 'ipads',
        price: 31990000,
        quantity: 10,
        description: 'iPad Pro 11 inch M4 512GB.\nBộ nhớ lớn, phù hợp lưu file sáng tạo.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-m4-11-inch_8.png',
        memoryOptions: [
            { label: '512GB Wi-Fi' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-m4-11-inch_8.png'
        ]
    },
    {
        id: 55,
        name: 'iPad 11 inch 5G',
        category: 'ipads',
        price: 18990000,
        quantity: 20,
        description: 'iPad 11 inch 5G.\nKết nối dữ liệu nhanh, tiện mang ra ngoài.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg',
        memoryOptions: [
            { label: '128GB Wi-Fi + 5G' }
        ],
        colors: ['Xanh'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg'
        ]
    },
    {
        id: 56,
        name: 'iPad 11 inch 5G 256GB',
        category: 'ipads',
        price: 21990000,
        quantity: 15,
        description: 'iPad 11 inch 5G 256GB.\nDung lượng lớn, phù hợp công việc di động.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg',
        memoryOptions: [
            { label: '256GB Wi-Fi + 5G' }
        ],
        colors: ['Xanh'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg'
        ]
    },
    {
        id: 57,
        name: 'iPad Pro 13 inch M4 512GB',
        category: 'ipads',
        price: 36990000,
        quantity: 8,
        description: 'iPad Pro 13 inch M4 512GB.\nDung lượng lớn cho dự án đồ họa.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-m4-11-inch_8.png',
        memoryOptions: [
            { label: '512GB Wi-Fi' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-m4-11-inch_8.png'
        ]
    },
    {
        id: 58,
        name: 'iPad Pro 13 inch M4 1TB',
        category: 'ipads',
        price: 42990000,
        quantity: 5,
        description: 'iPad Pro 13 inch M4 1TB.\nBộ nhớ cực lớn cho file 4K và dự án nặng.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-m4-11-inch_8.png',
        memoryOptions: [
            { label: '1TB Wi-Fi' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-m4-11-inch_8.png'
        ]
    },
    {
        id: 59,
        name: 'iPad mini 7 5G',
        category: 'ipads',
        price: 19990000,
        quantity: 15,
        description: 'iPad mini 7 5G.\nNhỏ gọn, kết nối mạng nhanh mọi nơi.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-gray_2.jpg',
        memoryOptions: [
            { label: '128GB Wi-Fi + 5G' }
        ],
        colors: ['Xám'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-gray_2.jpg'
        ]
    },
    {
        id: 60,
        name: 'iPad mini 7 5G 256GB',
        category: 'ipads',
        price: 22990000,
        quantity: 12,
        description: 'iPad mini 7 5G 256GB.\nDung lượng lớn, phù hợp công việc cơ động.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-gray_2.jpg',
        memoryOptions: [
            { label: '256GB Wi-Fi + 5G' }
        ],
        colors: ['Tím'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-gray_2.jpg'
        ]
    },
    {
        id: 61,
        name: 'iPad Air 13 inch M3',
        category: 'ipads',
        price: 25990000,
        quantity: 10,
        description: 'iPad Air 13 inch M3.\nMàn hình lớn, phù hợp ghi chú và làm việc.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-air-11-wifi-1_2.jpg',
        memoryOptions: [
            { label: '256GB Wi-Fi' }
        ],
        colors: ['Xanh Dương'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-air-11-wifi-1_2.jpg'
        ]
    },

    // ===== AirPods thêm mới =====
    {
        id: 62,
        name: 'AirPods 2',
        category: 'airpods',
        price: 3290000,
        quantity: 40,
        description: 'AirPods 2.\nThiết kế quen thuộc, kết nối nhanh với iPhone.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png'
        ]
    },
    {
        id: 63,
        name: 'AirPods 2 Hộp Sạc Không Dây',
        category: 'airpods',
        price: 3790000,
        quantity: 30,
        description: 'AirPods 2 Hộp Sạc Không Dây.\nTiện sạc, dùng hằng ngày thoải mái.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png'
        ]
    },
    {
        id: 64,
        name: 'AirPods 3 Hộp Sạc Lightning',
        category: 'airpods',
        price: 4590000,
        quantity: 25,
        description: 'AirPods 3 Hộp Sạc Lightning.\nÂm thanh trong, dễ dùng hằng ngày.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png'
        ]
    },
    {
        id: 65,
        name: 'AirPods 3 Hộp Sạc MagSafe',
        category: 'airpods',
        price: 4990000,
        quantity: 25,
        description: 'AirPods 3 Hộp Sạc MagSafe.\nĐặt lên đế là sạc, rất tiện lợi.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png'
        ]
    },
    {
        id: 66,
        name: 'AirPods Pro 2 USB-C',
        category: 'airpods',
        price: 7290000,
        quantity: 30,
        description: 'AirPods Pro 2 USB-C.\nChống ồn tốt, sạc cổng USB-C tiện dụng.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg'
        ]
    },
    {
        id: 67,
        name: 'AirPods Pro 2 MagSafe USB-C',
        category: 'airpods',
        price: 7590000,
        quantity: 25,
        description: 'AirPods Pro 2 MagSafe USB-C.\nKết hợp sạc từ tính và cổng USB-C.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg'
        ]
    },
    {
        id: 68,
        name: 'AirPods Pro 2021 Hộp Sạc Magsafe',
        category: 'airpods',
        price: 4990000,
        quantity: 35,
        description: 'AirPods Pro 2021 Hộp Sạc Magsafe.\nChống ồn chủ động, sạc từ tính tiện dụng.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    },
    {
        id: 69,
        name: 'AirPods Max Xám',
        category: 'airpods',
        price: 13990000,
        quantity: 10,
        description: 'AirPods Max Xám.\nTai nghe chụp đầu cao cấp, âm thanh sống động.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Xám'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    },
    {
        id: 70,
        name: 'AirPods Max Xanh Dương',
        category: 'airpods',
        price: 13990000,
        quantity: 8,
        description: 'AirPods Max Xanh Dương.\nThiết kế nổi bật, âm thanh chi tiết.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Xanh Dương'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    },
    {
        id: 71,
        name: 'AirPods Max Hồng',
        category: 'airpods',
        price: 13990000,
        quantity: 8,
        description: 'AirPods Max Hồng.\nPhong cách trẻ trung, âm thanh cao cấp.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Hồng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    },
    {
        id: 72,
        name: 'AirPods 4 Lite',
        category: 'airpods',
        price: 4490000,
        quantity: 30,
        description: 'AirPods 4 Lite.\nThiết kế nhẹ, đeo lâu vẫn thoải mái.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png'
        ]
    },
    {
        id: 73,
        name: 'AirPods 4 Noise Canceling',
        category: 'airpods',
        price: 5790000,
        quantity: 25,
        description: 'AirPods 4 Noise Canceling.\nTập trung hơn với khả năng chống ồn tốt.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png'
        ]
    },
    {
        id: 74,
        name: 'AirPods 4 Gaming',
        category: 'airpods',
        price: 5990000,
        quantity: 20,
        description: 'AirPods 4 Gaming.\nĐộ trễ thấp, phù hợp chơi game trên iPhone.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png'
        ]
    },
    {
        id: 75,
        name: 'AirPods Studio',
        category: 'airpods',
        price: 15990000,
        quantity: 6,
        description: 'AirPods Studio.\nTai nghe chụp đầu cao cấp cho dân sáng tạo.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Đen'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    },
    {
        id: 76,
        name: 'AirPods Studio Xám',
        category: 'airpods',
        price: 15990000,
        quantity: 6,
        description: 'AirPods Studio Xám.\nThiết kế sang trọng, âm thanh chi tiết.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Xám'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    },

    // Bổ sung để mỗi danh mục đủ 20 sản phẩm
    {
        id: 77,
        name: 'iPhone 17 Pro',
        category: 'iphones',
        price: 29990000,
        quantity: 15,
        description: 'iPhone 17 Pro.\nPhiên bản Pro với hiệu năng mạnh và camera tốt.',
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
        id: 78,
        name: 'MacBook Air 15 inch M3',
        category: 'macbooks',
        price: 34990000,
        quantity: 10,
        description: 'MacBook Air 15 inch M3.\nMàn hình lớn, máy mỏng nhẹ cho công việc hằng ngày.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png',
        memoryOptions: [
            { label: '16GB/512GB' }
        ],
        colors: ['Xanh Lá Cây'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png'
        ]
    },
    {
        id: 79,
        name: 'iPad Air 10.9 inch 2024',
        category: 'ipads',
        price: 16990000,
        quantity: 18,
        description: 'iPad Air 10.9 inch 2024.\nMàn hình vừa tay, phù hợp học tập và giải trí.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg',
        memoryOptions: [
            { label: '128GB Wi-Fi' }
        ],
        colors: ['Xanh'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg'
        ]
    },
    {
        id: 80,
        name: 'AirPods 4 Pro',
        category: 'airpods',
        price: 6490000,
        quantity: 20,
        description: 'AirPods 4 Pro.\nChống ồn tốt, âm thanh chi tiết cho mọi nhu cầu.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png'
        ]
    }
];
