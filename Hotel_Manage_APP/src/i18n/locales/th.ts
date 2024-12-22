export default {
  translation: {
    common: {
      welcome: 'ยินดีต้อนรับ',
      logout: 'ออกจากระบบ',
      loading: 'กำลังโหลด...',
      error: 'เกิดข้อผิดพลาด',
      save: 'บันทึก',
      cancel: 'ยกเลิก',
      add: 'เพิ่ม',
      edit: 'แก้ไข',
      delete: 'ลบ',
      actions: 'การดำเนินการ',
      confirm: 'ยืนยัน',
      back: 'กลับ'
    },
    nav: {
      dashboard: 'แดชบอร์ด',
      bookings: 'จัดการการจอง',
      guests: 'จัดการผู้เข้าพัก',
      rooms: 'จัดการห้องพัก',
      financial: 'จัดการการเงิน',
      settings: 'ตั้งค่าระบบ',
      users: 'จัดการผู้ใช้'
    },
    dashboard: {
      totalRevenue: 'รายได้รวม',
      occupancyRate: 'อัตราการเข้าพัก',
      totalBookings: 'การจองทั้งหมด',
      activeGuests: 'ผู้เข้าพักปัจจุบัน',
      vsLastMonth: 'เทียบกับเดือนที่แล้ว',
      quickStats: 'สถิติด่วน',
      recentBookings: 'การจองล่าสุด'
    },
    bookings: {
      title: 'จัดการการจอง',
      newBooking: 'เพิ่มการจอง',
      editBooking: 'แก้ไขการจอง',
      guestInfo: 'ข้อมูลผู้เข้าพัก',
      guestName: 'ชื่อผู้เข้าพัก',
      email: 'อีเมล',
      phone: 'โทรศัพท์',
      dates: 'วันที่เข้าพัก',
      checkIn: 'เช็คอิน',
      checkOut: 'เช็คเอาท์',
      room: 'ห้องพัก',
      roomType: 'ประเภทห้อง',
      status: 'สถานะ',
      source: 'แหล่งที่มา',
      amount: 'จำนวนเงิน',
      payment: 'การชำระเงิน',
      paymentStatus: 'สถานะการชำระเงิน',
      specialRequests: 'คำขอพิเศษ',
      confirmDelete: 'คุณแน่ใจหรือไม่ที่จะลบการจองนี้?',
      noBookings: 'ไม่พบการจอง',
      statuses: {
        confirmed: 'ยืนยันแล้ว',
        pending: 'รอดำเนินการ',
        cancelled: 'ยกเลิกแล้ว'
      },
      paymentStatuses: {
        paid: 'ชำระแล้ว',
        pending: 'รอชำระ',
        refunded: 'คืนเงินแล้ว'
      },
      sources: {
        direct: 'จองโดยตรง',
        'booking.com': 'Booking.com',
        airbnb: 'Airbnb',
        agoda: 'Agoda'
      }
    },
    financial: {
      title: 'จัดการการเงิน',
      reports: 'รายงานการเงิน',
      loadError: 'ไม่สามารถโหลดข้อมูลการเงินได้',
      metrics: {
        revenue: 'รายได้รวม',
        expenses: 'ค่าใช้จ่ายรวม',
        occupancy: 'อัตราการเข้าพัก',
        revPAR: 'รายได้ต่อห้องว่าง',
        adr: 'ราคาห้องเฉลี่ย',
        netProfit: 'กำไรสุทธิ'
      },
      timeframes: {
        daily: 'รายวัน',
        weekly: 'รายสัปดาห์',
        monthly: 'รายเดือน',
        yearly: 'รายปี',
        custom: 'กำหนดเอง'
      },
      categories: {
        maintenance: 'ค่าบำรุงรักษา',
        salary: 'เงินเดือน',
        utilities: 'ค่าสาธารณูปโภค',
        supplies: 'วัสดุสิ้นเปลือง',
        other: 'อื่นๆ'
      },
      expense: {
        title: 'จัดการค่าใช้จ่าย',
        date: 'วันที่',
        description: 'รายละเอียด',
        descriptionPlaceholder: 'ระบุรายละเอียดค่าใช้จ่าย',
        amount: 'จำนวนเงิน',
        category: 'หมวดหมู่',
        add: 'เพิ่มค่าใช้จ่าย',
        noExpenses: 'ไม่พบรายการค่าใช้จ่าย',
        confirmDelete: 'คุณแน่ใจหรือไม่ที่จะลบรายการค่าใช้จ่ายนี้?'
      },
      annualReport: {
        title: 'รายงานการเงินประจำปี {year}',
        summary: 'สรุปประจำปี',
        totalRevenue: 'รายได้รวมประจำปี',
        totalExpenses: 'ค่าใช้จ่ายรวมประจำปี',
        netProfit: 'กำไรสุทธิประจำปี',
        monthlyBreakdown: 'รายละเอียดรายเดือน',
        occupancyRate: 'อัตราการเข้าพัก'
      },
      months: {
        0: 'มกราคม', 1: 'กุมภาพันธ์', 2: 'มีนาคม', 3: 'เมษายน',
        4: 'พฤษภาคม', 5: 'มิถุนายน', 6: 'กรกฎาคม', 7: 'สิงหาคม',
        8: 'กันยายน', 9: 'ตุลาคม', 10: 'พฤศจิกายน', 11: 'ธันวาคม'
      },
      viewAnnualReport: 'ดูรายงานประจำปี'
    },
    users: {
      title: 'จัดการผู้ใช้',
      add: 'เพิ่มผู้ใช้',
      edit: 'แก้ไขผู้ใช้',
      name: 'ชื่อ',
      email: 'อีเมล',
      role: 'บทบาท',
      status: 'สถานะ',
      actions: 'การดำเนินการ',
      confirmDelete: 'คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?',
      noAccess: 'คุณไม่มีสิทธิ์เข้าถึงการจัดการผู้ใช้',
      active: 'เปิดใช้งาน',
      inactive: 'ปิดใช้งาน',
      statuses: {
        active: 'เปิดใช้งาน',
        inactive: 'ปิดใช้งาน'
      }
    }
  }
};