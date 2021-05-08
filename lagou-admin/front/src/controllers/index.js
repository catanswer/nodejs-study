import indexTpl from '../views/index.art'
import usersTpl from '../views/users.art'
import usersListTpl from '../views/users-list.art'
import usersPageTpl from '../views/users-page.art'
import router from '../routers/index'

const indexHtml = indexTpl({})

const pageSize = 3
let currentPage = 1
let dataList = []

const _addUser = () => {
  const $cancelUser = $('#cancelUser')

  // 提交表单
  const data = $('#user-form').serialize()
  $.ajax({
    url: '/api/users',
    type: 'post',
    data,
    success(res) {
      if (res.ret) {
        _loadData()
        $cancelUser.click()
      } else {
        console.log('添加失败~')
      }
      $('#user-form')[0].reset()
    }
  })
}

// 获取用户列表
const _getUserslist = (pageNum) => {
  let start = (pageNum - 1) * pageSize
  $('#users-list').html(usersListTpl({
    data: dataList.slice(start, start + pageSize)
  }))
}

const _loadData = () => {
  return $.ajax({
    url: '/api/users',
    type: 'get',
    success(res) {
      if (res.ret) {
        dataList = res.data
        _pagination(dataList)

        _getUserslist(currentPage)
      }
    }
  })
}

// 分页
const _pagination = (data) => {
  const total = data.length
  const pageCount = Math.ceil(total / pageSize)
  const pageArray = new Array(pageCount)
  
  $('#users-page').html(usersPageTpl({ data: pageArray }))

  _settPageActive(currentPage)
}

const _removeUser = function() {
  $.ajax({
    url: '/api/users',
    type: 'delete',
    data: {
      id: $(this).data('id')
    },
    success(res) {
      _loadData()

      const newPageNum = Math.ceil((dataList.length / pageSize))
      if (newPageNum === currentPage && currentPage > 0 && (dataList.length % pageSize) === 1) {
        currentPage =  currentPage - 1
        _settPageActive(currentPage)
      }
    }
  })
}

const _settPageActive = (index) => {
  $('#users-page #users-page-list li.page').eq(index - 1).addClass('active').siblings().removeClass('active')
}

export default (router) => {
  return (req, res, next) => {
    const _init = (res) => {
      res.render(indexHtml)
      $(window, '.wrapper').resize()
  
      $('#content').html(usersTpl())
  
      // 初次获取list
      _loadData()
  
      // 添加用户事件
      $('#addUser').on('click', _addUser)
      $('#cancelUser').on('click',)
      
      // 绑定删除
      $('#users-list').on('click', '.remove-user', _removeUser)
  
      // 分页事件绑定
      $('#users-page').on('click', '#users-page-list li.page', function() {
        const index = $(this).index()
        // $(this).addClass('active').siblings().removeClass('active')
        _settPageActive(index)
        _getUserslist(index)
        currentPage = index
      })
      // 前一页
      $('#users-page').on('click', '#users-page-list #users-page-prev', function() {
        if (currentPage > 1) {
          currentPage--
          _getUserslist(currentPage)
          _settPageActive(currentPage)
        }
      })
      // 后一页
      $('#users-page').on('click', '#users-page-list #users-page-next', function() {
        if (currentPage < Math.ceil(dataList.length / pageSize)) {
          currentPage++
          _getUserslist(currentPage)
          _settPageActive(currentPage)
        }
      })
  
      // 登出
      $('#users-loginout').on('click', function(e) {
        e.preventDefault()
        $.ajax({
          url: '/api/users/logout',
          success(res) {
            if (res.ret) {
              // router.go('/login')
              location.reload()
            } else {
              console.log('退出登录失败~')
            }
          }
        })
      })

    }
    $.ajax({
      url: '/api/users/isAuth',
      success(result) {
        if (result.ret) {
          _init(res)
        } else {
          router.go('/login')
        }
      }
    })


  }
}