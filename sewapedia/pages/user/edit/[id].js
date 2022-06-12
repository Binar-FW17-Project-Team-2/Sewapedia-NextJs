import { useRouter } from "next/router";
import EditUser from "../../../components/Users/UserEdit";

export default function edit() {
  const router = useRouter();
  const {id} = router.query
  return (
    <EditUser/>
  );
}