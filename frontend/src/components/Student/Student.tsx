type StudentDetail = {
  _id: string;
  studentName: string;
  address: string;
  dob: Date;
  email: string;
  contact: string;
  username: string;
  password: string;
  batchId: string;
  profilePhoto: string;
};

const Student = (props: StudentDetail) => {
  return (
    <tr>
      <td>Student Id</td>
      <td>Student Name</td>
      <td>Student Adress</td>
      <td>Date Of Birth</td>
      <td>Email</td>
      <td>Contact</td>
      <td>Username</td>
      <td>Batch</td>
    </tr>
  );
};

export default Student;
