import {configureStore} from "@reduxjs/toolkit"
import { alladminblogreducer, allblogreducer, blogdetailreducer, createreviewreducer, deleteblogreducer, newblogreducer, updateblogreducer } from "./reducer/blogreducer";
import { alladminuserreducer, deleteuserreducer, myblogreducer, updateprofilereducer, userreducer } from "./reducer/userreducer";
const store=configureStore({
    reducer:{
        userred:userreducer,
        updateprofilered:updateprofilereducer,
        allblogred:allblogreducer,
        blogdetailred:blogdetailreducer,
        createreviewred:createreviewreducer,
        newblogred:newblogreducer,
        myblogred:myblogreducer,
        deleteblogred:deleteblogreducer,
        updateblogred:updateblogreducer,
        alladminuserred:alladminuserreducer,
        alladminblogred:alladminblogreducer,
        deleteuserred:deleteuserreducer,

    }
});

export default store;