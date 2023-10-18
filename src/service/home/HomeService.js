import axios from "axios";

const URL = "http://localhost:8080/api/admin/home/";

export const getListByName = async (name, sortName, sortType) => {
    try {
        const result = await axios.get(URL + `list/?name=${name}&sortName=${sortName}&sortType=${sortType}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (id) => {
    try {
        const result = await axios.get(URL + `${id}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getProductByNameAndCapacityAndColor = async (name, capacity, color) => {
    try {
        const result = await axios.get(URL + `detail?name=${name}&capacity=${capacity}&color=${color}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAvatarByProductId = async (id) => {
    try {
        const result = await axios.get(URL + `avatar/${id}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getColorsByNameAndCapacity = async (name, capa) => {
    try {
        const result = await axios.get(URL + `colors?name=${name}&capacity=${capa}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCapacitiesByNameAndColor = async (name, color) => {
    try {
        const result = await axios.get(URL + `capacities?name=${name}&color=${color}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getImageLinksByProductId = async (id) => {
    try {
        const result = await axios.get(URL + `images/${id}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getBestsellers = async () => {
    try {
        const result = await axios.get(URL + 'bestsellers');
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getSeriesByProductType = async (type) => {
    try {
        const result = await axios.get(URL + `series/${type}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}