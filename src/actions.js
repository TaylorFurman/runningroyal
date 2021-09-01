//put this here as an example, needs to be removed once running royal actions are added 
//export function toggleCheckedShop (data) {
//     return {
//         type: 'TOGGLE_CHECKED_SHOP',
//         data: data
//     }
// }

export function getGeoLocation(data){
    return{
        type: "GET_LOCATION",
        data: data
    }
}