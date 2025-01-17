function getFacetValueFilter(categoryCode, filters=[]) {

    let facetValueFilter =''
    if(categoryCode) {
        facetValueFilter = `categoryCode:${categoryCode},`
    }
    return facetValueFilter + filters.join(',')
}

export const buildProductSearchVars = ({
    categoryCode = null,
    pageSize = 5,
    filters = {},
    startIndex=0,
    sort = '',
    search = '',
}) => {

    let facetTemplate='';
    let filter = '';
    if(categoryCode) {
        facetTemplate = `categoryCode:${categoryCode}`
        filter = `categoryCode req ${categoryCode}`
    }
    const facetFilterList = Object.keys(filters).filter(k => filters[k].length).reduce((accum, k) => { 
        return [...accum, ...filters[k].map(facetValue => `Tenant~${k}:${facetValue}`)]
    },[]);

    const facetValueFilter = getFacetValueFilter(categoryCode, facetFilterList)
    return {
        query:search,
        startIndex,
        pageSize,
        sortBy:sort,
        filter:filter,
        facetTemplate, 
        facetValueFilter
    }
}

