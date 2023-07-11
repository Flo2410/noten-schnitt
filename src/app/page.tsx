import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth_options } from "./api/auth/[...nextauth]/auth_options";

const Home = async () => {
  const session = await getServerSession(auth_options);

  if (!session) return redirect("/login");
  else return redirect("/grades");
};

export default Home;
