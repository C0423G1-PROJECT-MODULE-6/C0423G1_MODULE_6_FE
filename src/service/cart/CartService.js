import axios from "axios";

/**
 * method get page product
 * Create TinDT
 * Date 17-10-2023
 * param Long id
 * return HttpStatus
 */
export const getPageProductModalWareHouse = async (choose,page,value) => {
    const result = await axios.get(`http://localhost:8080/api/admin/cart/list/product?choose=${choose}&page=${page}&value=${value}`)
    console.log(result)
    return result;
}