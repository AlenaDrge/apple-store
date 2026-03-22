// Sample users data
const sampleUsers = [
    {
        id: 1,
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin123',
        phone: '0900000001',
        address: '123 Đường Apple, Quận 1, TP.HCM',
        isAdmin: true,
        role: 'admin'
    },
    {
        id: 2,
        name: 'User',
        email: 'user@gmail.com',
        password: 'user123',
        phone: '0900000002',
        address: '35 Nguyễn Tri Phương, TP.HCM',
        isAdmin: false,
        role: 'user'
    },
    {
        id: 3,
        name: 'Shipper',
        email: 'shipper@gmail.com',
        password: 'shipper123',
        phone: '0900000003',
        address: '25 Lý Thường Kiệt, TP.HCM',
        isAdmin: false,
        role: 'shipper'
    },
    {
        id: 4,
        name: 'Phú',
        email: 'phu@gmail.com',
        password: 'phu123',
        phone: '0123456789',
        address: '85 Nguyễn Thượng Hiền, TP.HCM',
        isAdmin: false,
        role: 'user'
    },
    {
        id: 5,
        name: 'Phát',
        email: 'phat@gmail.com',
        password: 'phat123',
        phone: '0123456788',
        address: '25 Phan Đăng Lưu, TP.HCM',
        isAdmin: false,
        role: 'user'
    },
    {
        id: 6,
        name: 'Phúc',
        email: 'phuc@gmail.com',
        password: 'phuc123',
        phone: '0123456788',
        address: '25 Lê Lợi, TP.HCM',
        isAdmin: false,
        role: 'user'
    },
    {
        id: 7,
        name: 'Phong',
        email: 'phong@gmail.com',
        password: 'phong123',
        phone: '0123456788',
        address: '25 Lý Thường Kiệt, TP.HCM',
        isAdmin: false,
        role: 'user'
    },
    {
        id: 8,
        name: 'Huy',
        email: 'huy@gmail.com',
        password: 'huy123',
        phone: '0123456788',
        address: '36 Lê Lợi, TP.HCM',
        isAdmin: false,
        role: 'user'
    },
    {
        id: 9,
        name: 'Nhựt',
        email: 'nhut@gmail.com',
        password: 'nhut123',        
        phone: '0123456788',
        address: '25 Lê Hồng Phong, TP.HCM',
        isAdmin: false,
        role: 'user'
    },
    {
        id: 10,
        name: 'Bảo',
        email: 'bao@gmail.com',
        password: 'bao123',         
        phone: '0123456788',
        address: '182 Phan Đăng Lưu, TP.HCM',
        isAdmin: false,
        role: 'user'
    } 

];






// Sample orders data 
const sampleOrders = [
    {
        id: 1,
        date: '2026-03-01T19:30:00+07:00',
        customer: {
            name: 'User',
            email: 'user@gmail.com',
            phone: '0900000002',
            address: '35 Nguyễn Tri Phương, TP.HCM'
        },
        shipper: {
            id: 3,
            name: 'Shipper',
            phone: '0900000003',
            email: 'shipper@gmail.com'
        },
        items: [
            {
                id: 1,
                name: 'iPhone 14 Pro Max',
                category: 'iphones',
                price: 25590000,
                quantity: 1
            },
            {
                id: 10,
                name: 'AirPods Pro 2',
                category: 'airpods',
                price: 6990000,
                quantity: 1
            }
        ],
        paymentMethod: 'cod',
        notes: '',
        status: 'delivered',
        discount: null,
        total: 35868000,
        deliveredAt: '2026-03-01T19:30:00+07:00'
    },

    {
        id: 2,
        date: '2026-03-05T15:30:00+07:00',
        customer: {
            name: 'User',
            email: 'user@gmail.com',
            phone: '0900000002',
            address: '35 Nguyễn Tri Phương, TP.HCM'
        },
        shipper: {
            id: 3,
            name: 'Shipper',
            phone: '0900000003',
            email: 'shipper@gmail.com'
        },
        items: [
            {
                id: 5,
                name: 'MacBook Air 15 inch M2 2023',
                category: 'macbooks',
                price: 30490000,
                quantity: 1
            }
        ],
        paymentMethod: 'bank_transfer',
        notes: '',
        status: 'delivered',
        discount: null,
        total: 33569000,
        deliveredAt: '2026-03-06T16:00:00+07:00'
    },
    
    {
        id: 3,
        date: '2026-03-08T09:00:00+07:00',
        customer: {
            name: 'User',
            email: 'user@gmail.com',
            phone: '0900000002',
            address: '35 Nguyễn Tri Phương, TP.HCM'
        },
        shipper: {
            id: 3,
            name: 'Shipper',
            phone: '0900000003',
            email: 'shipper@gmail.com'
        },
        items: [
            {
                id: 7,
                name: 'iPad Air 11 inch M3',
                category: 'ipads',
                price: 24090000,
                quantity: 1
            }
        ],
        paymentMethod: 'cod',
        notes: '',
        status: 'failed',
        discount: null,
        total: 26502000,
        deliveryFailedReason: 'Khách không nghe máy',
        deliveryFailedAt: '2026-03-08T11:30:00+07:00'
    },

    {
        id: 4,
        date: '2026-03-10T10:00:00+07:00',
        customer: {
            name: 'User',
            email: 'user@gmail.com',
            phone: '0900000002',
            address: '35 Nguyễn Tri Phương, TP.HCM'
        },
        shipper: {
            id: 3,
            name: 'Shipper',
            phone: '0900000003',
            email: 'shipper@gmail.com'
        },
        items: [
            {
                id: 14,
                name: 'MacBook Air 13 inch M3 2024',
                category: 'macbooks',
                price: 29490000,
                quantity: 1
            }
        ],
        paymentMethod: 'cod',
        notes: '',
        status: 'delivered',
        discount: null,
        total: 32469000,
        deliveredAt: '2026-03-11T09:30:00+07:00'
    },

    {
        id: 5,
        date: '2026-03-12T14:20:00+07:00',
        customer: {
            name: 'User',
            email: 'user@gmail.com',
            phone: '0900000002',
            address: '35 Nguyễn Tri Phương, TP.HCM'
        },
        shipper: {
            id: 3,
            name: 'Shipper',
            phone: '0900000003',
            email: 'shipper@gmail.com'
        },
        items: [
            {
                id: 13,
                name: 'iPhone 16 128GB',
                category: 'iphones',
                price: 21990000,
                quantity: 1
            },
            {
                id: 16,
                name: 'AirPods 4',
                category: 'airpods',
                price: 5490000,
                quantity: 1
            }
        ],
        paymentMethod: 'cod',
        notes: '',
        status: 'delivered',
        discount: null,
        total: 30258000,
        deliveredAt: '2026-03-13T18:00:00+07:00'
    },

    {
        id: 6,
        date: '2026-03-15T09:45:00+07:00',
        customer: {
            name: 'User',
            email: 'user@gmail.com',
            phone: '0900000002',
            address: '35 Nguyễn Tri Phương, TP.HCM'
        },
        shipper: {
            id: 3,
            name: 'Shipper',
            phone: '0900000003',
            email: 'shipper@gmail.com'
        },
        items: [
            {
                id: 15,
                name: 'iPad Pro 13 inch M4 2024',
                category: 'ipads',
                price: 32990000,
                quantity: 1
            }
        ],
        paymentMethod: 'cod',
        notes: '',
        status: 'delivered',
        discount: null,
        total: 36319000,
        deliveredAt: '2026-03-16T11:15:00+07:00'
    },

    {
        id: 7,
        date: '2026-03-15T07:00:00+07:00',
        customer: {
            name: 'Phong',
            email: 'phong@gmail.com',
            phone: '0123456788',
            address: '25 Lý Thường Kiệt, TP.HCM'
        },
        shipper: {
            id: 3,
            name: 'Shipper',
            phone: '0900000003',
            email: 'shipper@gmail.com'
        },
        items: [
            {
                id: 16,
                name: 'AirPods 4',
                category: 'airpods',
                price: 5490000,
                quantity: 1
            }
        ],
        paymentMethod: 'cod',
        notes: '',
        status: 'delivered',
        discount: null,
        total: 6069000,
        deliveredAt: '2026-03-16T18:00:00+07:00'
    },
];
