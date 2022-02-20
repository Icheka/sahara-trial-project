import { AdminDashboard } from "components/layout";
import { NextPage } from "next";

const AdminIndexPage: NextPage = () => {
  return(
    <AdminDashboard>
        <div>
            <div className={`uppercase text-md text-blue-100`}>
                ADMIN DASHBOARD PAGE
            </div>
        </div>
    </AdminDashboard>
  );
}

export default AdminIndexPage;