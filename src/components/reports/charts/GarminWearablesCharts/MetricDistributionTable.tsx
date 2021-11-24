import { Table } from "@material-ui/core";

function MetricDistributionTable({ data }) {
//   let data = props["tableData"];
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>index</th>
          <th>username</th>
          <th>metric</th>
        </tr>
      </thead>
      <tbody>
        {data.map((dat: any) => (
          <tr>
            <td>{dat.id}</td>
            <td>{dat.username}</td>
            <td>{dat.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default MetricDistributionTable;
