import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
export default function Load() {
  return (
    <Flex align="center" gap="middle" className='m-7 p-8'>
    <Spin size="large" />
  </Flex>

  )
}
