const UserProfile = (props) => {
  return (
    <>
      <h1>{props.username}</h1>
    </>
  );
};
export default UserProfile;
export async function getServerSideProps(context) {
  const { params, req, res } = context;
  console.log('params', params);
  console.log('req', req);
  console.log('res', res);
  return {
    props: {
      username: 'Umer',
    },
  };
}
