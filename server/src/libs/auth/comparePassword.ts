import bcrypt from 'bcrypt';

const comparePassword = async (password: string, hash: string) : Promise<boolean> => {

  return await bcrypt.compare(password, hash)
  .then((res) => {
    return res;
  })
  .catch((err) => {
    return false;
  });

}

export default comparePassword;