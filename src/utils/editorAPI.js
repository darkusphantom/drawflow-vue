const API = "http://localhost:3000/nodes";

const getAllPrograms = async () => {
  const response = await fetch(API);
  const data = await response.json();
  console.log(data);
};

export { getAllPrograms };
