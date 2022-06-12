import { useRouter } from "next/router";
import UserProfile from "../../components/Users/UserProfile";

export default function profile() {
  const router = useRouter();
  const { params } = router.query
  return (
    <UserProfile/>
  );
}
