import { NextRouter } from "next/router";

export const removeQueryParamsFromRouter = (router: NextRouter, removeList: string[] = []) => {

    console.log(removeList)
    if (removeList.length > 0) {
        removeList.forEach((param) => delete router.query[param]);
    } else {
        // Remove all
        Object.keys(router.query).forEach((param) => delete router.query[param]);
    }
    router.replace(
        {
            pathname: router.pathname,
            query: router.query
        },
        undefined,
        /**
         * Do not refresh the page
         */
        { shallow: true }
    );
};


export const removeQueryParamItems = (router: NextRouter, paramName: string, items: string[]) => {

    const param = router.query[paramName];

    // check if there are multiple params 
    const isArray = Array.isArray(param);

    if (isArray) {
        router.query[paramName] = param.filter(p => !items.includes(p));
    } else {
        delete router.query[paramName];
    }


    console.log(router.query)

    router.replace(
        {
            pathname: router.pathname,
            query: router.query
        },
        undefined,
        /**
         * Do not refresh the page
         */
        { shallow: true }
    );
};

export const addQueryParamToRouter = (router: NextRouter, newParam: string, values: string[]) => {

    router.query[newParam] = values;

    console.log(router.query)

    router.push(
        {
            pathname: router.pathname,
            query: router.query
        },
        undefined,
        /**
         * Do not refresh the page
         */
        { shallow: true });
};
