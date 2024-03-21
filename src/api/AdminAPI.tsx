// import axios from 'axios'
// const API = axios.create({ baseURL: "http://localhost:5173" })

// const admin = JSON.parse(localStorage.getItem('adminInfo'))
// const config = {
//     headers: {
//         "Content-Type": "application/json",
//     }
// }
// const configToken = {
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + admin?.token
//     }
// }
// const configFormData = {
//     headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: "Bearer " + admin?.token
//     }
// }


// export const adminSearchAPI = (searchkeyword) => API.post("/user-search", { searchkeyword }, configToken)
// export const adminGetUsersAPI = () => API.get('/users', configToken)
// export const adminUserBlockUnblockAPI = (id) => API.get('/manage-users?id=' + id, configToken)
// export const adminDeleteUserAPI = (id) => API.delete("/users?id=" + id, configToken)


// export const adminAddBookAPI = (formdata) => API.post("/add-books", formdata, configFormData)
// export const adminGetBooksAPI = () => API.get('/books', configToken)
// export const adminDeleteBookAPI = (id) => API.delete("/books?id=" + id, configToken)
// export const adminEditBookAPI = (id, formdata) => API.post('/edit-book?id=' + id, formdata, configFormData)

// export const adminAddGenreAPI = (genre) => API.post('/genres', { genre }, configToken);
// export const adminGetGenresAPI = () => API.get('/genres', configToken);
// export const adminDeleteGenresAPI = (id) => API.get("/delete-genre?id=" + id, configToken)

// export const adminGetOrdersAPI = () => API.get('/orders', configToken);
// export const adminChangeOrderStatusAPI = (orderId, status) => API.post('/order-status', { orderId, status }, configToken)

// export const adminGetRetunAPI = () => API.get('/returns', configToken);
// export const adminAcceptReturnAPI = (id, orderId, bookId, copyId) => API.put('/returns', { id, orderId, bookId, copyId }, configToken)

// export const adminGetAllSellRequest = () => API.get('/sell', configToken)
// export const adminChangeStatusAPI = (orderId, status) => API.post('/sell', { orderId, status }, configToken)

// export const adminGetDashboardDetailsAPI = () => API.get('/dashboard', configToken)
// export const getSalesReportAPI = () => API.get('/sales-report', configToken)
