function SingleChild(props) {
  return (
    <tr>
      <td className="name">
        <span> {`${props.child.first_name}  ${props.child.last_name}`}</span>
      </td>

      <td className="grade">
        <div> {props.child.grade_level}</div>
      </td>
    </tr>
  );
}

export default SingleChild;
