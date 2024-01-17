"use server";
const URL = `${process.env.DOMAIN}/api`;

export async function fetchData(path, page) {
  try {
    const products = await fetch(page && `${URL}/${path}?page=${page}`)
      .then((res) => res.json())
      .then((data) => data)
      .then((data) => {
        return data.products;
      });
    return products;
  } catch (err) {
    console.log(err);
  }
} 
// ! try to make fetch by id well it be the same
export async function fetchDataById(path, query) {
  const product = await fetch(`${URL}/${path}${query && `?productId=${query}`}`)
    .then((res) => res.json())
    .then((data) => data);
  return product.data;
}
// export async function postData(path, rate, comment) {
//   const rating = await axios
//     .post(`${URL}/${path}`, {
//       rate,
//       comment,
//     })
//     .then((data) => data);
//   console.log(rating.data);
//   return rating.data;
// }
