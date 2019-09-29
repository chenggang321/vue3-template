/**
 * 过滤器
 * 所有方法名 都大写
 */
import config from '@/enums'

// 订单状态
export const STATUS = num => {
    return config.Status[num] ? config.Status[num]:''
}

export default {
    STATUS
}

