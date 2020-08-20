const _ = require('lodash')
const moment = require('moment')

/*
* 获取随机头像
*/
function getRandomAvatar() {
  const avatars = [
    'https://wx2.sbimg.cn/2020/08/19/3KfLD.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3KI2e.png',
    'https://wx2.sbimg.cn/2020/08/19/3KVbO.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3Kyt6.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3KT67.jpg'

  ]

  let index = _.random(0,4)

  return avatars[index]
}


/**
 * 
 * 格式化时间
 */
function formatTime(time) {
  return moment(time).locale('zh_cn').format('YYYY MMMDo dddd aHH:mm:ss')
}


module.exports = {
  getRandomAvatar,
  formatTime
}