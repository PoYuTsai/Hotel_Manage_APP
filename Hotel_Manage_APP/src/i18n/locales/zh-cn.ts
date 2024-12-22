export default {
  translation: {
    common: {
      welcome: '欢迎',
      logout: '登出',
      loading: '加载中...',
      error: '发生错误',
      save: '保存',
      cancel: '取消',
      add: '新增',
      edit: '编辑',
      delete: '删除',
      actions: '操作',
      confirm: '确认',
      back: '返回'
    },
    nav: {
      dashboard: '仪表板',
      bookings: '订房管理',
      guests: '住客管理',
      rooms: '房间管理',
      financial: '财务管理',
      settings: '系统设置',
      users: '用户管理'
    },
    dashboard: {
      totalRevenue: '总营收',
      occupancyRate: '入住率',
      totalBookings: '总订房数',
      activeGuests: '当前住客',
      vsLastMonth: '较上月',
      quickStats: '快速统计',
      recentBookings: '最近订房'
    },
    bookings: {
      title: '订房管理',
      newBooking: '新增订房',
      editBooking: '编辑订房',
      guestInfo: '住客信息',
      guestName: '住客姓名',
      email: '电子邮件',
      phone: '电话',
      dates: '入住日期',
      checkIn: '入住日期',
      checkOut: '退房日期',
      room: '房间',
      roomType: '房型',
      status: '状态',
      source: '来源',
      amount: '金额',
      payment: '付款',
      paymentStatus: '付款状态',
      specialRequests: '特殊要求',
      confirmDelete: '确定要删除此订房记录吗？',
      noBookings: '暂无订房记录',
      statuses: {
        confirmed: '已确认',
        pending: '待确认',
        cancelled: '已取消'
      },
      paymentStatuses: {
        paid: '已付款',
        pending: '待付款',
        refunded: '已退款'
      },
      sources: {
        direct: '直接订房',
        'booking.com': 'Booking.com',
        airbnb: 'Airbnb',
        agoda: 'Agoda'
      }
    },
    financial: {
      title: '财务管理',
      reports: '财务报表',
      loadError: '无法加载财务数据',
      metrics: {
        revenue: '总营收',
        expenses: '总支出',
        occupancy: '入住率',
        revPAR: '每可用房间收益',
        adr: '平均房价',
        netProfit: '净利'
      },
      timeframes: {
        daily: '每日',
        weekly: '每周',
        monthly: '每月',
        yearly: '每年',
        custom: '自定范围'
      },
      categories: {
        maintenance: '维护费用',
        salary: '薪资',
        utilities: '水电费',
        supplies: '耗材',
        other: '其他'
      },
      expense: {
        title: '支出管理',
        date: '日期',
        description: '描述',
        descriptionPlaceholder: '输入支出项目描述',
        amount: '金额',
        category: '类别',
        add: '新增支出',
        noExpenses: '暂无支出记录',
        confirmDelete: '确定要删除此支出记录吗？'
      },
      annualReport: {
        title: '{year}年度财务报表',
        summary: '年度总结',
        totalRevenue: '年度总营收',
        totalExpenses: '年度总支出',
        netProfit: '年度净利',
        monthlyBreakdown: '月度明细',
        occupancyRate: '入住率'
      },
      months: {
        0: '1月', 1: '2月', 2: '3月', 3: '4月',
        4: '5月', 5: '6月', 6: '7月', 7: '8月',
        8: '9月', 9: '10月', 10: '11月', 11: '12月'
      },
      viewAnnualReport: '查看年度报表'
    },
    users: {
      title: '用户管理',
      add: '新增用户',
      edit: '编辑用户',
      name: '姓名',
      email: '电子邮件',
      role: '角色',
      status: '状态',
      actions: '操作',
      confirmDelete: '确定要删除此用户吗？',
      noAccess: '您没有权限访问用户管理',
      active: '启用',
      inactive: '停用',
      statuses: {
        active: '启用',
        inactive: '停用'
      }
    }
  }
};