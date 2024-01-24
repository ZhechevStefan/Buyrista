import { useMemo, useState } from "react";
import { useLoaderData, json } from "react-router-dom";
import Button from "../components/Button/Button.jsx";

import styles from "./Users.module.css";
import Pagination from "../components/Pagination/Pagination.jsx";

const UsersPage = props => {
  const { users } = useLoaderData();

  let pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, users]);

  const table = (
    <table className={styles["users-table"]}>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">EMAIL</th>
          <th scope="col">ADMIN</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {currentTableData.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin}</td>
            <td>
              <Button>?</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <h2>Users:</h2>
      {table}
      <Pagination
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
};

export default UsersPage;

export const loader = async () => {
  const response = await fetch("http://localhost:5000/admin/users");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500
      }
    );
  } else {
    const resData = await response.json();
    // console.log(resData);
    return resData;
  }
};
