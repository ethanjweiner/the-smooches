import { useActiveUser } from '../store/user';

function Upload() {
  const { user } = useActiveUser();

  if (!user) {
    return (
      <h2 className="mt-5 text-center">
        You must be logged in to upload images.
      </h2>
    );
  }

  return <div></div>;
}

export default Upload;
