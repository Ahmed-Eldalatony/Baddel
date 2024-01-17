// import translate from "translate";
// const translator = async (data) => {
//     console.log(data[2])
//   data.length = 32
//   const products = data.map(async (product) => {
//     const translatedName = await translate(product.name.en, "ar")
//     const translatedTitle = await translate(product.title.en, "ar")
//     const translatedDescription = await translate(product.description.en, "ar")
//     // const translatedOwner = await translate(product.owner.en, "en")
//     const translatedCategoryName = await translate(product.category.name.en, "ar")
//     const translatedSubcategory = await translate(product.category.subcategory_name.en, "ar")
//     // console.log("Map",product)
//     product.name.ar = translatedName
//     product.title.ar = translatedTitle
//     product.description.ar = translatedDescription
//     // product.owner.ar = translatedOwner
//     product.category.name.ar = translatedCategoryName
//     product.category.subcategory_name.ar = translatedSubcategory
//     return product
//   })
//   return Promise.all(products).then((results) => results);
// // data.length=8
// // const companies = data.map(async (company) => {
// //     const translatedName = await translate(company.name.ar, "ar")
// //     const translatedAbout = await translate(company.about.ar, "ar")
// //     // console.log("Map",company)
// //     company.name.ar = translatedName
// //     company.about.ar = translatedAbout
// //     return company
// //   })
//   // return Promise.all(companies).then((results) => results);

// }
// export default translator