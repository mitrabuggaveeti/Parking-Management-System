import { makeRequest, POST, DELETE, GET } from "../utils/fetch"

export const postParkingSlot = (body) => {
    return makeRequest(POST, '/admin/parking', body);
}

export const deleteParkingSlot = (id) => {
    return makeRequest(DELETE, `/admin/parking/${id}`);
}

export const getParkingSlots = () => {
    return makeRequest(GET, `/admin/parkingslot`);
}