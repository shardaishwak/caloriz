const Fetch = async (route: string, params?: any) => {
  try {
    return await (await fetch(route, params)).json();
  } catch (error) {
    console.log(error.message);
  }
};

export default Fetch;
