type StudentDetail = {
  _id: string;
  nic: string;
  studentName: string;
  address: string;
  email: string;
  contact: string;
  username: string;
  password: string;
  batchName: string;
  profilePhoto: string;
};

const Student = (props: StudentDetail) => {
  return (
    <tr className="h-12 cursor-pointer">
      <td>{props._id}</td>
      <td>{props.studentName}</td>
      <td>{props.address}</td>
      <td>{props.dob}</td>
      <td>{props.email}</td>
      <td>{props.contact}</td>
      <td>{props.username}</td>
      <td>{props.password}</td>
    </tr>
  );
};

export default Student;
