export default {
  translation: {
    common: {
      welcome: '歡迎',
      logout: '登出',
      loading: '載入中...',
      error: '發生錯誤',
      save: '儲存',
      cancel: '取消',
      add: '新增',
      edit: '編輯',
      delete: '刪除',
      actions: '操作',
      confirm: '確認',
      back: '返回'
    },
    nav: {
      dashboard: '儀表板',
      bookings: '訂房管理',
      guests: '住客管理',
      rooms: '房間管理',
      financial: '財務管理',
      settings: '系統設定',
      users: '使用者管理'
    },
    dashboard: {
      totalRevenue: '總營收',
      occupancyRate: '入住率',
      totalBookings: '總訂房數',
      activeGuests: '當前住客',
      vsLastMonth: '較上月',
      quickStats: '快速統計',
      recentBookings: '最近訂房'
    },
    bookings: {
      title: '訂房管理',
      newBooking: '新增訂房',
      editBooking: '編輯訂房',
      guestInfo: '住客資訊',
      guestName: '住客姓名',
      email: '電子郵件',
      phone: '電話',
      dates: '入住日期',
      checkIn: '入住日期',
      checkOut: '退房日期',
      room: '房間',
      roomType: '房型',
      status: '狀態',
      source: '來源',
      amount: '金額',
      payment: '付款',
      paymentStatus: '付款狀態',
      specialRequests: '特殊要求',
      confirmDelete: '確定要刪除此訂房記錄嗎？',
      noBookings: '尚無訂房記錄',
      statuses: {
        confirmed: '已確認',
        pending: '待確認',
        cancelled: '已取消'
      },
      paymentStatuses: {
        paid: '已付款',
        pending: '待付款',
        refunded: '已退款'
      },
      sources: {
        direct: '直接訂房',
        'booking.com': 'Booking.com',
        airbnb: 'Airbnb',
        agoda: 'Agoda'
      }
    },
    financial: {
      title: '財務管理',
      reports: '財務報表',
      loadError: '無法載入財務數據',
      metrics: {
        revenue: '總營收',
        expenses: '總支出',
        occupancy: '入住率',
        revPAR: '每可用房間收益',
        adr: '平均房價',
        netProfit: '淨利'
      },
      timeframes: {
        daily: '每日',
        weekly: '每週',
        monthly: '每月',
        yearly: '每年',
        custom: '自訂範圍'
      },
      categories: {
        maintenance: '維護費用',
        salary: '薪資',
        utilities: '水電費',
        supplies: '耗材',
        other: '其他'
      },
      expense: {
        title: '支出管理',
        date: '日期',
        description: '描述',
        descriptionPlaceholder: '輸入支出項目描述',
        amount: '金額',
        category: '類別',
        add: '新增支出',
        noExpenses: '目前沒有支出記錄',
        confirmDelete: '確定要刪除此支出記錄嗎？'
      },
      annualReport: {
        title: '{year}年度財務報表',
        summary: '年度總結',
        totalRevenue: '年度總營收',
        totalExpenses: '年度總支出',
        netProfit: '年度淨利',
        monthlyBreakdown: '月度明細',
        occupancyRate: '入住率'
      },
      months: {
        0: '1月', 1: '2月', 2: '3月', 3: '4月',
        4: '5月', 5: '6月', 6: '7月', 7: '8月',
        8: '9月', 9: '10月', 10: '11月', 11: '12月'
      },
      viewAnnualReport: '檢視年度報表'
    },
    users: {
      title: '使用者管理',
      add: '新增使用者',
      edit: '編輯使用者',
      name: '姓名',
      email: '電子郵件',
      role: '角色',
      status: '狀態',
      actions: '操作',
      confirmDelete: '確定要刪除此使用者嗎？',
      noAccess: '您沒有權限存取使用者管理',
      active: '啟用',
      inactive: '停用',
      statuses: {
        active: '啟用',
        inactive: '停用'
      }
    }
  }
};