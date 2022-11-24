import { FindAccountId } from '@/components/auth/findAccount/FindAccountId';
import { AuthTemplate } from '@/components/auth/AuthTemplate';
import { useQuery } from 'react-query';
import { getSchoolList } from '@/apis/schools';
import { queryKeys } from '@/utils/queryKeys';

export function FindAccountIdPage() {
  const { data: schoolList } = useQuery(
    [queryKeys.학교리스트조회],
    getSchoolList,
  );
  return (
    <AuthTemplate>
      {schoolList && <FindAccountId schools={schoolList.schools} />}
    </AuthTemplate>
  );
}
