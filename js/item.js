// Products data
const sampleProducts = [

    // iPhones id 1 -> 20
    {
        id: 1,
        name: 'iPhone 14 Pro Max 128GB',
        category: 'iphones',
        price: 25590000,
        quantity: 10,
        description: 'iPhone 14 Pro Max cao cấp với hiệu năng mạnh mẽ.\nMàn hình lớn, camera đa ống kính, bộ nhớ 128GB, chụp đêm ấn tượng.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.\nHỗ trợ 5G, Face ID, nhiều năm cập nhật iOS ổn định.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Đen'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/_/x_m_25.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/8/9/896_2.png'
        ]
    },
    {
        id: 2,
        name: 'iPhone 17 Pro Max 256GB',
        category: 'iphones',
        price: 37769000,
        quantity: 15,
        description: 'iPhone 17 Pro Max thế hệ mới, hiệu năng và camera nâng cấp.\nBộ nhớ 256GB, thoải mái lưu ảnh, video và ứng dụng nặng.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.\nHỗ trợ 5G, Face ID, nhiều năm cập nhật iOS ổn định.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max_3.jpg',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Cam Vũ Trụ'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max_3.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max-3.jpg'
        ]
    },
    {
        id: 3,
        name: 'iPhone 15 Pro 512GB',
        category: 'iphones',
        price: 29490000,
        quantity: 20,
        description: 'iPhone 15 Pro thiết kế sang trọng, hiệu năng mượt.\nCamera chụp đêm tốt, bộ nhớ 512GB lưu trữ dư dả cho ảnh và game.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.\nHỗ trợ 5G, Face ID, nhiều năm cập nhật iOS ổn định.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-trang_1__1.jpg',
        memoryOptions: [
            { label: '512GB' }
        ],
        colors: ['Titan Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-trang_1__1.jpg',
            'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro_3__2.jpg?_gl=1*9u6ur9*_gcl_aw*R0NMLjE3NzAwOTM3NjMuQ2p3S0NBaUFzNEhNQmhCSkVpd0FDcmZOWlRWMWswb1Q0NGx3cXZORHBIVEhjVHpsR1dYdi00ZWR1RzBrcmt2LTJCTEVYd1RQQlVJRnlSb0MzN0VRQXZEX0J3RQ..*_gcl_au*MTE0MDk0MDAuMTc2Nzc4MjEyMQ..*_ga*MTE2NTk5NTI2Mi4xNzM2MTM3Mzcw*_ga_QLK8WFHNK9*czE3NzQyNTc4NTckbzUyJGcxJHQxNzc0MjU4MTg0JGozMCRsMCRoMTQ0NjIxMDc1MQ..'
        ]
    },
    {
        id: 4,
        name: 'iPhone 16 128GB',
        category: 'iphones',
        price: 21990000,
        quantity: 25,
        description: 'iPhone 16 128GB với thiết kế mới, màu sắc trẻ trung.\nCamera nâng cấp, bộ nhớ 128GB cho ảnh, video và ứng dụng.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.\nHỗ trợ 5G, Face ID, nhiều năm cập nhật iOS ổn định.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Xanh Mòng Két'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-xanh-mong-ket.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-8.png'
        ]
    },
    {
        id: 5,
        name: 'iPhone 14 Pro Max 256GB',
        category: 'iphones',
        price: 19990000,
        quantity: 20,
        description: 'iPhone 14 Pro Max 256GB.\nThiết kế hiện đại, hiệu năng ổn định cho nhu cầu hằng ngày.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.\nHỗ trợ 5G, Face ID, nhiều năm cập nhật iOS ổn định.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/_/t_m_21.png',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Tím'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/_/t_m_21.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_14_pro_max_512gb_-_5_1.png'
        ]
    },
    {
        id: 6,
        name: 'iPhone 14 Pro Max 512GB',
        category: 'iphones',
        price: 35190000,
        quantity: 15,
        description: 'iPhone 14 Pro Max 512GB.\nMàn hình lớn hơn, phù hợp xem phim và chơi game.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.\nHỗ trợ 5G, Face ID, nhiều năm cập nhật iOS ổn định.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/v/_/v_ng_22.png',
        memoryOptions: [
            { label: '512GB' }
        ],
        colors: ['Vàng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/v/_/v_ng_22.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_14_pro_max_512gb_-_7.png'
        ]
    },
    {
        id: 7,
        name: 'iPhone 15 256GB',
        category: 'iphones',
        price: 22990000,
        quantity: 15,
        description: 'iPhone 15 256GB.\nHiệu năng tốt, camera rõ nét, phù hợp sử dụng lâu dài.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.\nHỗ trợ 5G, Face ID, nhiều năm cập nhật iOS ổn định.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-256gb-color_4_.png',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Xanh Dương'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-256gb-color_4_.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/n/vn_iphone_15_pink_pdp_image_position-7_features_specs_1.jpg'
        ]
    },
    {
        id: 8,
        name: 'iPhone 15 Plus 128GB',
        category: 'iphones',
        price: 18299000,
        quantity: 10,
        description: 'iPhone 15 Plus 128GB.\nMàn hình lớn, pin tốt, phù hợp giải trí cả ngày.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.\nHỗ trợ 5G, Face ID, nhiều năm cập nhật iOS ổn định.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-plus-update-04_6.png',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Hồng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-plus-update-04_6.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15_6__3.png'
        ]
    },
    {
        id: 9,
        name: 'iPhone 15 Plus 256GB',
        category: 'iphones',
        price: 22990000,
        quantity: 5,
        description: 'iPhone 15 Plus 256GB.\nDung lượng lớn, lưu trữ thoải mái ảnh và video.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.\nHỗ trợ 5G, Face ID, nhiều năm cập nhật iOS ổn định.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-plus-update-03_6.png',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Xanh Lá'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-plus-update-03_6.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus-series-image-05_1.png'
        ]
    },
    {
        id: 10,
        name: 'iPhone 15 128GB',
        category: 'iphones',
        price: 17790000,
        quantity: 15,
        description: 'iPhone 15 128GB.\nHiệu năng mượt, bộ nhớ lớn cho ứng dụng và game.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-plus-update-05_7.png',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Vàng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-15-plus-update-05_7.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus-series-image-05.png'
        ]
    },
    {
        id: 11,
        name: 'iPhone 13 256GB',
        category: 'iphones',
        price: 14990000,
        quantity: 10,
        description: 'iPhone 13 256GB.\nThiết kế gọn, bộ nhớ đủ cho nhu cầu hằng ngày.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/d/_/d_ng_4.jpg',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Xanh Dương'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/d/_/d_ng_4.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_13_128gb_-_5_1__1.png'
        ]
    },
    {
        id: 12,
        name: 'iPhone 13 128GB',
        category: 'iphones',
        price: 16990000,
        quantity: 30,
        description: 'iPhone 13 128GB.\nLựa chọn tiết kiệm với hiệu năng vẫn rất tốt.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/f/i/file_3_10.jpg',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Đỏ'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/f/i/file_3_10.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_13_pdp_position-7_features_specs__vn.png'
        ]
    },
    {
        id: 13,
        name: 'iPhone 13 Pro Max 512GB',
        category: 'iphones',
        price: 18990000,
        quantity: 5,
        description: 'iPhone 13 Pro Max 512GB.\nDung lượng lớn, phù hợp lưu trữ nhiều dữ liệu.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/a/xanh_l__4.png',
        memoryOptions: [
            { label: '512GB' }
        ],
        colors: ['Xanh Lá'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/a/xanh_l__4.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_13_pro_max_128gb_-_6_2.png'
        ]
    },
    {
        id: 14,
        name: 'iPhone Air 256GB',
        category: 'iphones',
        price: 23390000,
        quantity: 5,
        description: 'iPhone Air 256GB.\nMáy nhỏ gọn, cấu hình ổn trong tầm giá.\nMàn hình sắc nét, pin đủ dùng một ngày, sạc nhanh tiện lợi.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone_air-2.jpg',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Đen Không Gian'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone_air-2.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-air-256gb-4.jpg'
        ]
    },
    {
        id: 15,
        name: 'iPhone Air 1TB',
        category: 'iphones',
        price: 36975000,
        quantity: 25,
        description: 'iPhone Air 1TB.\nDung lượng lớn, phù hợp lưu trữ nhiều dữ liệu.\nMàn hình sắc nét, pin đủ dùng một ngày, sạc nhanh tiện lợi.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone_air-3_1.jpg',
        memoryOptions: [
            { label: '1TB' }
        ],
        colors: ['Xanh Da Trời'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone_air-3_1.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-air-256gb-4_2.jpg'
        ]
    },
    {
        id: 16,
        name: 'iPhone 16e 128GB',
        category: 'iphones',
        price: 24990000,
        quantity: 10,
        description: 'iPhone 16e 128GB.\nMàn hình lớn, trải nghiệm giải trí tốt.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16e-128gb.png',
        memoryOptions: [
            { label: '128GB' }
        ],
        colors: ['Đen'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16e-128gb.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16e-128gb_5_.png'
        ]
    },
    {
        id: 17,
        name: 'iPhone 16 Plus 256GB',
        category: 'iphones',
        price: 26990000,
        quantity: 20,
        description: 'iPhone 16 Plus 256GB.\nDung lượng lớn, phù hợp người dùng nặng.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-plus-xanh-luu-ly_1.png',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Xanh Lưu Ly'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-16-plus-xanh-luu-ly_1.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-plus-8_1.png'
        ]
    },
    {
        id: 18,
        name: 'iPhone 16 Pro Max 1TB',
        category: 'iphones',
        price: 43990000,
        quantity: 15,
        description: 'iPhone 16 Pro Max 1TB.\nPhiên bản tiêu chuẩn với hiệu năng mạnh mẽ.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max_2.png',
        memoryOptions: [
            { label: '1TB' }
        ],
        colors: ['TiTan Sa Mạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max_2.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-8_2.png'
        ]
    },
    {
        id: 19,
        name: 'iPhone 17 Pro Max 512GBs',
        category: 'iphones',
        price: 27990000,
        quantity: 20,
        description: 'iPhone 17 Pro Max 512GBs.\nMàn hình lớn, thời lượng pin tốt cho cả ngày.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-cam_3.jpg',
        memoryOptions: [
            { label: '512GB' }
        ],
        colors: ['Cam Vũ Trụ'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-cam_3.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max-3_1.jpg'
        ]
    },
    {
        id: 20,
        name: 'iPhone 17e 256GB',
        category: 'iphones',
        price: 29990000,
        quantity: 15,
        description: 'iPhone 17e 256GB.\nPhiên bản Pro với hiệu năng mạnh và camera tốt.\nMàn hình OLED sáng rõ, pin dùng cả ngày, sạc nhanh tiện lợi.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone_17e-2-1_2.jpg',
        memoryOptions: [
            { label: '256GB' }
        ],
        colors: ['Hồng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone_17e-2-1_2.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_17e_pink_6.png'
        ]
    },

    // macbooks id 21 -> 40
    {
        id: 21,
        name: 'MacBook Air M4 13 inch 2025',
        category: 'macbooks',
        price: 39490000,
        quantity: 30,
        description: 'MacBook Air M4 13 inch mỏng nhẹ, pin tốt.\nRAM lớn, SSD nhanh cho đa nhiệm mượt mà.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.\nMáy chạy êm, ít nóng, phù hợp cả làm việc văn phòng lẫn sáng tạo nội dung.',
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
        id: 22,
        name: 'MacBook Air 15 inch M2 2023',
        category: 'macbooks',
        price: 30490000,
        quantity: 10,
        description: 'MacBook Air 15 inch M2 2023 màn hình lớn, thiết kế mỏng.\nRAM 16GB, SSD 256GB đủ cho học tập và văn phòng.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.\nMáy chạy êm, ít nóng, phù hợp cả làm việc văn phòng lẫn sáng tạo nội dung.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-15-inch-m2-2023-1.jpg',
        memoryOptions: [
            { label: '8CPU - 10GPU - 16GB - 256GB' }
        ],
        colors: ['Đen Xanh Biển'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-15-inch-m2-2023-1.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-15-inch-m2-2023-6.jpg'
        ]
    },
    {
        id: 23,
        name: 'MacBook Pro 14 M5',
        category: 'macbooks',
        price: 41890000,
        quantity: 20,
        description: 'MacBook Pro 14 M5 hiệu năng mạnh cho công việc nặng.\nRAM 16GB, SSD 512GB xử lý đồ họa, dựng phim mượt.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.\nMáy chạy êm, ít nóng, phù hợp cả làm việc văn phòng lẫn sáng tạo nội dung.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
        memoryOptions: [
            { label: '10CPU - 10GPU - 16GB - 512GB' }
        ],
        colors: ['Đen Không Gian'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_5__11_2.png'
        ]
    },
    {
        id: 24,
        name: 'MacBook Air M3 13 inch 2024 8GB - 256GB',
        category: 'macbooks',
        price: 29490000,
        quantity: 18,
        description: 'MacBook Air 13 inch M3 2024 nhẹ, pin tốt.\nRAM 8GB, SSD 256GB cho công việc và học tập hằng ngày.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.\nMáy chạy êm, ít nóng, phù hợp cả làm việc văn phòng lẫn sáng tạo nội dung.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png',
        memoryOptions: [
            { label: '8CPU - 8GPU - 8GB - 256GB' }
        ],
        colors: ['Xanh Lá Cây'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_3__3.png'
        ]
    },
    {
        id: 25,
        name: 'MacBook Air M2 13 inch',
        category: 'macbooks',
        price: 25990000,
        quantity: 15,
        description: 'MacBook Air M2 13 inch.\nMỏng nhẹ, phù hợp học tập và làm việc văn phòng.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 26,
        name: 'MacBook Air M2 13 inch 16GB',
        category: 'macbooks',
        price: 27990000,
        quantity: 12,
        description: 'MacBook Air M2 13 inch 16GB.\nĐa nhiệm tốt, chạy mượt nhiều ứng dụng.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 27,
        name: 'MacBook Air M2 15 inch 512GB',
        category: 'macbooks',
        price: 32990000,
        quantity: 10,
        description: 'MacBook Air M2 15 inch 512GB.\nMàn hình lớn, bộ nhớ rộng cho file và ứng dụng.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 28,
        name: 'MacBook Pro 14 M3',
        category: 'macbooks',
        price: 45990000,
        quantity: 8,
        description: 'MacBook Pro 14 M3.\nHiệu năng mạnh cho công việc đồ họa và lập trình.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 29,
        name: 'MacBook Pro 14 M3 Max',
        category: 'macbooks',
        price: 55990000,
        quantity: 5,
        description: 'MacBook Pro 14 M3 Max.\nMáy mạnh cho dựng phim, 3D và tác vụ nặng.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 30,
        name: 'MacBook Pro 16 M3',
        category: 'macbooks',
        price: 52990000,
        quantity: 8,
        description: 'MacBook Pro 16 M3.\nMàn hình lớn, phù hợp làm việc chuyên nghiệp.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 31,
        name: 'MacBook Pro 16 M3 Max',
        category: 'macbooks',
        price: 62990000,
        quantity: 5,
        description: 'MacBook Pro 16 M3 Max.\nCấu hình cao cho studio sáng tạo.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 32,
        name: 'MacBook Air M1 13 inch',
        category: 'macbooks',
        price: 18990000,
        quantity: 20,
        description: 'MacBook Air M1 13 inch.\nGiá tốt, hiệu năng vẫn rất mạnh.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 33,
        name: 'MacBook Air M1 13 inch 512GB',
        category: 'macbooks',
        price: 21990000,
        quantity: 15,
        description: 'MacBook Air M1 13 inch 512GB.\nBộ nhớ lớn, lưu trữ nhiều tài liệu.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 34,
        name: 'MacBook Pro 13 M2',
        category: 'macbooks',
        price: 27990000,
        quantity: 12,
        description: 'MacBook Pro 13 M2.\nMáy nhỏ, hiệu năng tốt cho coder và designer.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 35,
        name: 'MacBook Pro 13 M2 512GB',
        category: 'macbooks',
        price: 30990000,
        quantity: 10,
        description: 'MacBook Pro 13 M2 512GB.\nBộ nhớ lớn, phù hợp dự án nhiều file.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        name: 'MacBook Air M3 15 inch',
        category: 'macbooks',
        price: 33490000,
        quantity: 10,
        description: 'MacBook Air M3 15 inch.\nMàn hình rộng, trải nghiệm làm việc thoải mái.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 37,
        name: 'MacBook Air M3 15 inch 16GB',
        category: 'macbooks',
        price: 35990000,
        quantity: 8,
        description: 'MacBook Air M3 15 inch 16GB.\nĐa nhiệm tốt, phù hợp làm việc lâu dài.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 38,
        name: 'MacBook Pro 14 M4',
        category: 'macbooks',
        price: 48990000,
        quantity: 6,
        description: 'MacBook Pro 14 M4.\nThế hệ mới, hiệu năng mạnh cho công việc sáng tạo.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
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
        id: 39,
        name: 'MacBook Pro 16 M4',
        category: 'macbooks',
        price: 58990000,
        quantity: 4,
        description: 'MacBook Pro 16 M4.\nMàn hình lớn, cấu hình cao cho công việc chuyên sâu.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png',
        memoryOptions: [
            { label: '32GB/1TB' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_1__9_154.png'
        ]
    },
    {
        id: 40,
        name: 'MacBook Air 15 inch M3',
        category: 'macbooks',
        price: 34990000,
        quantity: 10,
        description: 'MacBook Air 15 inch M3.\nMàn hình lớn, máy mỏng nhẹ cho công việc hằng ngày.\nMàn hình Retina sáng rõ, pin dùng thoải mái 8-10 giờ, sạc nhanh USB-C.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png',
        memoryOptions: [
            { label: '16GB/512GB' }
        ],
        colors: ['Xanh Lá Cây'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook-air-m3-13-inch-2024_1__3.png'
        ]
    },

    // ipads id 41 -> 60
    {
        id: 41,
        name: 'iPad Air 11 inch M3 Wifi 512GB',
        category: 'ipads',
        price: 24090000,
        quantity: 20,
        description: 'iPad Air 11 inch M3 mỏng nhẹ, màn hình đẹp.\nHỗ trợ Apple Pencil, bộ nhớ lớn cho tài liệu, bài học và phim.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.\nHỗ trợ đa nhiệm, chia đôi màn hình, dùng tốt với Apple Pencil cho ghi chú.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_44__2.jpg',
        memoryOptions: [
            { label: 'Air 11 inch M3 Wifi 512GB' }
        ],
        colors: ['Tím'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_44__2.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-m3-11-inch-5_8.jpg',
        ]
    },
    {
        id: 42,
        name: 'iPad Air 5 Wifi 64GB',
        category: 'ipads',
        price: 12990000,
        quantity: 15,
        description: 'iPad Air 5 gọn nhẹ, dễ mang theo.\nMàn hình 10.9 inch, bộ nhớ 64GB cho nhu cầu cơ bản hằng ngày.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.\nHỗ trợ đa nhiệm, chia đôi màn hình, dùng tốt với Apple Pencil cho ghi chú.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_5.jpg',
        memoryOptions: [
            { label: 'iPad Air 5 Wifi 64GB' }
        ],
        colors: ['Hồng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_5.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad_air_5_10.9_inch_2022_5g_64gb_-_8_1.png'
        ]
    },
    {
        id: 43,
        name: 'iPad mini 7 2024 5G 128GB',
        category: 'ipads',
        price: 17590000,
        quantity: 15,
        description: 'iPad mini 7 2024 nhỏ gọn, cầm một tay.\nMàn hình 8.3 inch, bộ nhớ lớn cho sách, ghi chú và ứng dụng.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.\nHỗ trợ đa nhiệm, chia đôi màn hình, dùng tốt với Apple Pencil cho ghi chú.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-7-5g-gray_2.jpg',
        memoryOptions: [
            { label: 'iPad mini 7 2024 5G 128GB' }
        ],
        colors: ['Xám'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-mini-7-5g-gray_2.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad_mini_blue_pdp_image_position_6_cellular__vn-vi_1_1_1_1.jpg',
        ]
    },
    {
        id: 44,
        name: 'iPad Pro M4 13 inch Wifi 256GB',
        category: 'ipads',
        price: 32990000,
        quantity: 12,
        description: 'iPad Pro 13 inch M4 màn hình đẹp, hiệu năng mạnh.\nHỗ trợ Apple Pencil Pro, bộ nhớ 256GB cho file sáng tạo.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-m4-11-inch_8.png?_gl=1*wsyxxd*_gcl_aw*R0NMLjE3NzAwOTM3NjMuQ2p3S0NBaUFzNEhNQmhCSkVpd0FDcmZOWlRWMWswb1Q0NGx3cXZORHBIVEhjVHpsR1dYdi00ZWR1RzBrcmt2LTJCTEVYd1RQQlVJRnlSb0MzN0VRQXZEX0J3RQ..*_gcl_au*MTE0MDk0MDAuMTc2Nzc4MjEyMQ..*_ga*MTE2NTk5NTI2Mi4xNzM2MTM3Mzcw*_ga_QLK8WFHNK9*czE3NzQyNTc4NTckbzUyJGcxJHQxNzc0MjYyNTYyJGozNyRsMCRoMTQ0NjIxMDc1MQ..',
        memoryOptions: [
            { label: 'iPad Pro M4 13 inch Wifi 256GB' }
        ],
        colors: ['Bạc'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-pro-m4-11-inch_8.png?_gl=1*wsyxxd*_gcl_aw*R0NMLjE3NzAwOTM3NjMuQ2p3S0NBaUFzNEhNQmhCSkVpd0FDcmZOWlRWMWswb1Q0NGx3cXZORHBIVEhjVHpsR1dYdi00ZWR1RzBrcmt2LTJCTEVYd1RQQlVJRnlSb0MzN0VRQXZEX0J3RQ..*_gcl_au*MTE0MDk0MDAuMTc2Nzc4MjEyMQ..*_ga*MTE2NTk5NTI2Mi4xNzM2MTM3Mzcw*_ga_QLK8WFHNK9*czE3NzQyNTc4NTckbzUyJGcxJHQxNzc0MjYyNTYyJGozNyRsMCRoMTQ0NjIxMDc1MQ..',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-pro-m4-13-inch_5_.png'
        ]
    },
    {
        id: 45,
        name: 'iPad 10.9 inch 2024',
        category: 'ipads',
        price: 11990000,
        quantity: 25,
        description: 'iPad 10.9 inch 2024.\nMàn hình rộng, phù hợp giải trí và học tập.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 46,
        name: 'iPad 10.9 inch 2024 256GB',
        category: 'ipads',
        price: 14990000,
        quantity: 20,
        description: 'iPad 10.9 inch 2024 256GB.\nDung lượng lớn cho phim và ứng dụng.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 47,
        name: 'iPad mini 6',
        category: 'ipads',
        price: 11990000,
        quantity: 20,
        description: 'iPad mini 6.\nMáy nhỏ gọn, tiện mang theo mọi nơi.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 48,
        name: 'iPad mini 6 256GB',
        category: 'ipads',
        price: 14990000,
        quantity: 15,
        description: 'iPad mini 6 256GB.\nBộ nhớ lớn cho sách, phim và ứng dụng.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 49,
        name: 'iPad Air 11 inch M2',
        category: 'ipads',
        price: 19990000,
        quantity: 18,
        description: 'iPad Air 11 inch M2.\nHiệu năng tốt cho học tập và làm việc.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 50,
        name: 'iPad Air 11 inch M2 256GB',
        category: 'ipads',
        price: 22990000,
        quantity: 15,
        description: 'iPad Air 11 inch M2 256GB.\nDung lượng lớn, hỗ trợ nhiều ứng dụng học tập.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 51,
        name: 'iPad Pro 11 inch M4',
        category: 'ipads',
        price: 27990000,
        quantity: 12,
        description: 'iPad Pro 11 inch M4.\nMàn hình đẹp, hỗ trợ Apple Pencil Pro.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 52,
        name: 'iPad Pro 11 inch M4 512GB',
        category: 'ipads',
        price: 31990000,
        quantity: 10,
        description: 'iPad Pro 11 inch M4 512GB.\nBộ nhớ lớn, phù hợp lưu file sáng tạo.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 53,
        name: 'iPad 11 inch 5G',
        category: 'ipads',
        price: 18990000,
        quantity: 20,
        description: 'iPad 11 inch 5G.\nKết nối dữ liệu nhanh, tiện mang ra ngoài.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 54,
        name: 'iPad 11 inch 5G 256GB',
        category: 'ipads',
        price: 21990000,
        quantity: 15,
        description: 'iPad 11 inch 5G 256GB.\nDung lượng lớn, phù hợp công việc di động.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 55,
        name: 'iPad Pro 13 inch M4 512GB',
        category: 'ipads',
        price: 36990000,
        quantity: 8,
        description: 'iPad Pro 13 inch M4 512GB.\nDung lượng lớn cho dự án đồ họa.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 56,
        name: 'iPad Pro 13 inch M4 1TB',
        category: 'ipads',
        price: 42990000,
        quantity: 5,
        description: 'iPad Pro 13 inch M4 1TB.\nBộ nhớ cực lớn cho file 4K và dự án nặng.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 57,
        name: 'iPad mini 7 5G',
        category: 'ipads',
        price: 19990000,
        quantity: 15,
        description: 'iPad mini 7 5G.\nNhỏ gọn, kết nối mạng nhanh mọi nơi.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 58,
        name: 'iPad mini 7 5G 256GB',
        category: 'ipads',
        price: 22990000,
        quantity: 12,
        description: 'iPad mini 7 5G 256GB.\nDung lượng lớn, phù hợp công việc cơ động.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
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
        id: 59,
        name: 'iPad Air 13 inch M3',
        category: 'ipads',
        price: 25990000,
        quantity: 10,
        description: 'iPad Air 13 inch M3.\nMàn hình lớn, phù hợp ghi chú và làm việc.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-air-11-wifi-1_2.jpg',
        memoryOptions: [
            { label: '256GB Wi-Fi' }
        ],
        colors: ['Xanh Dương'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad-air-11-wifi-1_2.jpg'
        ]
    },
    {
        id: 60,
        name: 'iPad Air 10.9 inch 2024',
        category: 'ipads',
        price: 16990000,
        quantity: 18,
        description: 'iPad Air 10.9 inch 2024.\nMàn hình vừa tay, phù hợp học tập và giải trí.\nMàn hình sáng, độ phân giải cao, pin lâu cho học tập và giải trí.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg',
        memoryOptions: [
            { label: '128GB Wi-Fi' }
        ],
        colors: ['Xanh'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/7/_/7_87_3.jpg'
        ]
    },

    // airpods id 61 -> 80
    {
        id: 61,
        name: 'Apple AirPods Pro 2 2023 USB-C',
        category: 'airpods',
        price: 6990000,
        quantity: 25,
        description: 'AirPods Pro 2 chống ồn chủ động, âm thanh rõ.\nĐeo thoải mái, tiện cho di chuyển hàng ngày.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_2__vn-vi.jpg',
        colors: ['Apple AirPods Pro 2 2023 USB-C - Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_2__vn-vi.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg'
        ]
    },

    {
        id: 62,
        name: 'Apple AirPods 3 2022',
        category: 'airpods',
        price: 4990000,
        quantity: 10,
        description: 'AirPods 3 thiết kế gọn, dễ đeo.\nÂm thanh trong trẻo, phù hợp nghe nhạc và gọi thoại.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods3_3.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods3_3.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png'
        ]
    },
    {
        id: 63,
        name: 'Apple AirPods Pro 2021 Magsafe',
        category: 'airpods',
        price: 4690000,
        quantity: 20,
        description: 'AirPods Pro 2021 Magsafe chống ồn tốt, sạc tiện.\nLựa chọn hợp lý cho người hay di chuyển.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'Apple AirPods Pro 2021 Magsafe',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-pro-2021-ksp-1.png'
        ]
    },   
    {
        id: 64,
        name: 'Apple AirPods 4',
        category: 'airpods',
        price: 5490000,
        quantity: 30,
        description: 'AirPods 4 thiết kế mới, hỗ trợ Adaptive Audio.\nKết nối nhanh, pin ổn, dùng cả ngày.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods-4-2.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods-4-2.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods-4-3-4.png'
        ]
    },
    {
        id: 65,
        name: 'AirPods 2',
        category: 'airpods',
        price: 3290000,
        quantity: 40,
        description: 'AirPods 2.\nThiết kế quen thuộc, kết nối nhanh với iPhone.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png'
        ]
    },
    {
        id: 66,
        name: 'AirPods 2 Hộp Sạc Không Dây',
        category: 'airpods',
        price: 3790000,
        quantity: 30,
        description: 'AirPods 2 Hộp Sạc Không Dây.\nTiện sạc, dùng hằng ngày thoải mái.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png'
        ]
    },
    {
        id: 67,
        name: 'AirPods 3 Hộp Sạc Lightning',
        category: 'airpods',
        price: 4590000,
        quantity: 25,
        description: 'AirPods 3 Hộp Sạc Lightning.\nÂm thanh trong, dễ dùng hằng ngày.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png'
        ]
    },
    {
        id: 68,
        name: 'AirPods 3 Hộp Sạc MagSafe',
        category: 'airpods',
        price: 4990000,
        quantity: 25,
        description: 'AirPods 3 Hộp Sạc MagSafe.\nĐặt lên đế là sạc, rất tiện lợi.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-3-2022-ksp-1.png'
        ]
    },
    {
        id: 69,
        name: 'AirPods Pro 2 USB-C',
        category: 'airpods',
        price: 7290000,
        quantity: 30,
        description: 'AirPods Pro 2 USB-C.\nChống ồn tốt, sạc cổng USB-C tiện dụng.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg'
        ]
    },
    {
        id: 70,
        name: 'AirPods Pro 2 MagSafe USB-C',
        category: 'airpods',
        price: 7590000,
        quantity: 25,
        description: 'AirPods Pro 2 MagSafe USB-C.\nKết hợp sạc từ tính và cổng USB-C.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods_pro_2_sep24_pdp_image_position_7__vn-vi.jpg'
        ]
    },
    {
        id: 71,
        name: 'AirPods Pro 2021 Hộp Sạc Magsafe',
        category: 'airpods',
        price: 4990000,
        quantity: 35,
        description: 'AirPods Pro 2021 Hộp Sạc Magsafe.\nChống ồn chủ động, sạc từ tính tiện dụng.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    },
    {
        id: 72,
        name: 'AirPods Max Xám',
        category: 'airpods',
        price: 13990000,
        quantity: 10,
        description: 'AirPods Max Xám.\nTai nghe chụp đầu cao cấp, âm thanh sống động.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Xám'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    },
    {
        id: 73,
        name: 'AirPods Max Xanh Dương',
        category: 'airpods',
        price: 13990000,
        quantity: 8,
        description: 'AirPods Max Xanh Dương.\nThiết kế nổi bật, âm thanh chi tiết.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Xanh Dương'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    },
    {
        id: 74,
        name: 'AirPods Max Hồng',
        category: 'airpods',
        price: 13990000,
        quantity: 8,
        description: 'AirPods Max Hồng.\nPhong cách trẻ trung, âm thanh cao cấp.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Hồng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    },
    {
        id: 75,
        name: 'AirPods 4 Lite',
        category: 'airpods',
        price: 4490000,
        quantity: 30,
        description: 'AirPods 4 Lite.\nThiết kế nhẹ, đeo lâu vẫn thoải mái.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png'
        ]
    },
    {
        id: 76,
        name: 'AirPods 4 Noise Canceling',
        category: 'airpods',
        price: 5790000,
        quantity: 25,
        description: 'AirPods 4 Noise Canceling.\nTập trung hơn với khả năng chống ồn tốt.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png'
        ]
    },
    {
        id: 77,
        name: 'AirPods 4 Gaming',
        category: 'airpods',
        price: 5990000,
        quantity: 20,
        description: 'AirPods 4 Gaming.\nĐộ trễ thấp, phù hợp chơi game trên iPhone.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png'
        ]
    },
    {
        id: 78,
        name: 'AirPods Studio',
        category: 'airpods',
        price: 15990000,
        quantity: 6,
        description: 'AirPods Studio.\nTai nghe chụp đầu cao cấp cho dân sáng tạo.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Đen'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    },
    {
        id: 79,
        name: 'AirPods Studio Xám',
        category: 'airpods',
        price: 15990000,
        quantity: 6,
        description: 'AirPods Studio Xám.\nThiết kế sang trọng, âm thanh chi tiết.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg',
        colors: ['Xám'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/w/mwp22_2.jpg'
        ]
    }, 
    {
        id: 80,
        name: 'AirPods 4 Pro',
        category: 'airpods',
        price: 6490000,
        quantity: 20,
        description: 'AirPods 4 Pro.\nChống ồn tốt, âm thanh chi tiết cho mọi nhu cầu.\nPin nghe nhạc nhiều giờ, hộp sạc cho thêm nhiều lần sạc.\nKết nối ổn định với thiết bị Apple, chuyển đổi nhanh giữa iPhone, iPad, Mac.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png',
        colors: ['Trắng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png'
        ]
    },

    // apple watches id 81 -> 85
    {
        id: 81,
        name: 'Apple Watch Series 10 GPS 41mm',
        category: 'applewatches',
        price: 10990000,
        quantity: 20,
        description: 'Apple Watch Series 10 GPS 41mm.\nThiết kế nhỏ gọn, phù hợp cổ tay vừa và nhỏ.\nMàn hình sáng, hỗ trợ Always-On, pin đủ dùng cả ngày.\nTheo dõi nhịp tim, bước chân, thông báo sức khỏe và luyện tập.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_4__7_240.png',
        colors: ['Màu Mận'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_4__7_240.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apcd69_1.jpg'
        ]
    },
    {
        id: 82,
        name: 'Apple Watch Series 10 GPS 45mm',
        category: 'applewatches',
        price: 11990000,
        quantity: 18,
        description: 'Apple Watch Series 10 GPS 45mm.\nMàn hình lớn hơn, dễ xem thông báo và bản đồ.\nPin đủ dùng cả ngày, sạc nhanh, chống nước tốt.\nTheo dõi luyện tập, đo nhịp tim, theo dõi giấc ngủ và nhắc vận động.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_2__9_196.png',
        colors: ['Đen'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_2__9_196.png'
        ]
    },
    {
        id: 83,
        name: 'Apple Watch Ultra 3 49mm',
        category: 'applewatches',
        price: 23990000,
        quantity: 10,
        description: 'Apple Watch Ultra 3 49mm.\nThiết kế cứng cáp, phù hợp người chơi thể thao và dã ngoại.\nMàn hình cực sáng, pin nhiều ngày, chống nước và bụi tốt.\nTích hợp GPS chính xác, la bàn, đo độ cao và các chế độ luyện tập chuyên sâu.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/2/1222.png',
        colors: ['Titan Đen'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/2/1222.png',
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/2/1231.png'
        ]
    },
    {
        id: 84,
        name: 'Apple Watch SE 2 GPS 40mm',
        category: 'applewatches',
        price: 6990000,
        quantity: 25,
        description: 'Apple Watch SE 2 GPS 40mm.\nLựa chọn tiết kiệm với đầy đủ tính năng cơ bản.\nMàn hình sáng, pin đủ dùng một ngày, chống nước khi bơi.\nTheo dõi nhịp tim, bước chân, thông báo từ iPhone và điều khiển nhạc.',
        image: 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_3__5_95.png',
        colors: ['Trắng Vàng'],
        gallery: [
            'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/e/text_ng_n_3__5_95.png'
        ]
    },
    {
        id: 85,
        name: 'Apple Watch SE 2 GPS 44mm',
        category: 'applewatches',
        price: 7990000,
        quantity: 22,
        description: 'Apple Watch SE 2 GPS 44mm.\nMàn hình lớn dễ nhìn, phù hợp cổ tay to hơn.\nPin đủ dùng một ngày, sạc nhanh, chống nước khi bơi.\nTheo dõi luyện tập, nhịp tim, calo và nhận thông báo từ iPhone.',
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_-_2024-08-22t103558.256.png',
        colors: ['Xanh Dương Đậm'],
        gallery: [
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_-_2024-08-22t103558.256.png'
        ]
    }
];
