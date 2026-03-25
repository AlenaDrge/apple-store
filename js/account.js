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
    },
    {
        id: 11,
        name: 'Quang Lê',
        email: 'quangle@gmail.com',
        password: 'quangle123',         
        phone: '0123456788',
        address: '18 Nguyễn Văn Trỗi, TP.HCM',
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
                name: 'iPhone 14 Pro Max 128GB',
                category: 'iphones',
                price: 25590000,
                quantity: 1
            },
            {
                id: 14,
                name: 'iPhone Air 256GB',
                category: 'iphones',
                price: 23390000,
                quantity: 1
            }
        ],
        paymentMethod: 'cod',
        notes: 'Muốn nhận vào chiều thứ 2',
        status: 'delivered',
        discount: null,
        total: 58198000,
        deliveredAt: '2026-03-01T19:30:00+07:00'
    },

    {
        id: 2,
        date: '2026-03-02T15:30:00+07:00',
        customer: {
            name: 'Nhựt',
            email: 'nhut@gmail.com',
            phone: '0123456788',
            address: '25 Lê Hồng Phong, TP.HCM'
        },
        shipper: {
            id: 3,
            name: 'Shipper',
            phone: '0900000003',
            email: 'shipper@gmail.com'
        },
        items: [
            {
                id: 8,
                name: 'iPhone 15 Plus 128GB',
                category: 'iphones',
                price: 18299000,
                quantity: 1
            }
        ],
        paymentMethod: 'cod',
        notes: 'Muốn nhận vào sáng chủ nhật',
        status: 'delivered',
        discount: null,
        total: 20158000,
        deliveredAt: '2026-03-02T15:30:00+07:00'
    },

    {
        id: 3,
        date: '2026-03-03T8:30:00+07:00',
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
                id: 81,
                name: 'Apple Watch Series 10 GPS 41mm',
                category: 'applewatches',
                price: 10990000,
                quantity: 1
            }
        ],
        paymentMethod: 'cod',
        notes: '',
        status: 'delivered',
        discount: null,
        total: 12119000,
        deliveredAt: '2026-03-03T8:30:00+07:00'
    },

    {
        id: 4,
        date: '2026-03-15T09:30:00+07:00',
        customer: {
            name: 'Huy',
            email: 'huy@gmail.com',
            phone: '0123456788',
            address: '36 Lê Lợi, TP.HCM'
        },
        shipper: {
            id: 3,
            name: 'Shipper',
            phone: '0900000003',
            email: 'shipper@gmail.com'
        },
        items: [
            {
                id: 83,
                name: 'Apple Watch Ultra 3 49mm',
                category: 'applewatches',
                price: 23990000,
                quantity: 1
            }
        ],
        paymentMethod: 'cod',
        notes: '',
        status: 'failed',
        discount: null,
        total: 26419000,
        deliveryFailedReason: 'Khách hẹn lại ngày giao khác',
        deliveryFailedAt: '2026-03-15T11:00:00+07:00'
    }
];
