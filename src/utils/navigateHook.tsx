// 统一页面跳转方法
import { useNavigate } from 'react-router-dom';
import { objectToQuery } from '@/utils/base';

export const useToPage = () => {
  const navigate = useNavigate();
  const NToCollectionAdd = (params?)=>{navigate('/collection/assignment/add'+objectToQuery(params))};//创建任务
  const NToCollectionIndex = (params?)=> navigate('/index'+objectToQuery(params));//任务录入页面
  return { NToCollectionAdd,NToCollectionIndex}
}
