import {createSelector} from 'reselect'


const selectShop = state=> state.shop;


export const selectCollections= createSelector(
    [selectShop],
    shop=>shop.collections

)

export const selectError = createSelector(
    [selectShop],
    shop=>shop.error
)

export const selectPending = createSelector(
    [selectShop],
    shop=>shop.pending
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections=> (collections?Object.keys(collections).map(key=>collections[key]):[])
)

export const selectCollection = collectionUrlParam=>(
    createSelector(
        [selectCollections],
        collections=>(collections?collections[collectionUrlParam]:null)
    )
)