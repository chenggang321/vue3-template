import Mock from 'mockjs'

import helloWorld from './helloWorld'

Mock.mock('/api/helloworld','get',helloWorld);
