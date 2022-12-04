import axios from "axios"
export const searchblogaction=(keyword="",currentpage=1,category)=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_BLOG_REQUEST"});
        let link=`/api/blog/search?keyword=${keyword}&page=${currentpage}`

        if(category){
            category &&
            category==="all"?(link=`/api/blog/search?keyword=${keyword}&page=${currentpage}`):(
                link=`/api/blog/search?keyword=${keyword}&page=${currentpage}&category=${category}`
            )
        }
        const {data}=await axios.get(link);

        dispatch({
            type:"ALL_BLOG_SUCCESS",
            payload:data,
        })

        
    } catch (error) {
        dispatch({
            type:"ALL_BLOG_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const clearerror=()=>async(dispatch)=>{
    dispatch({
        type:"CLEAR_ERROR"
    })
};


export const blogdetailaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"BLOG_DETAIL_REQUEST"});
        const {data}=await axios.get(`/api/blog/${id}`);

        dispatch({
            type:"BLOG_DETAIL_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"BLOG_DETAIL_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const createblogreviewaction=(reviewdata)=>async(dispatch)=>{
    try {
        dispatch({type:"CREATE_REVIEW_REQUEST"})
        const config={
            header:{
                "content-type":"application/json"
            }
        };
        const {data}=await axios.put(`/api/blog/review/new`,reviewdata,config);

        dispatch({
            type:"CREATE_REVIEW_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"CREATE_REVIEW_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const createnewblogaction=(blogdata)=>async(dispatch)=>{
    try {
        dispatch({type:"NEW_BLOG_REQUEST"});
        const config={
            headers:{
                "content-type":"multipart/form-data"
            }
        };
        const {data}=await axios.post(`/api/blog/create/new`,blogdata,config);

        dispatch({
            type:"NEW_BLOG_SUCCESS",
            payload:data,
        })

        
    } catch (error) {
        dispatch({
            type:"NEW_BLOG_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const deleteblogaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"DELETE_BLOG_REQUEST"})
        const {data}=await axios.delete(`/api/blog/delete/${id}`);

        dispatch({
            type:"DELETE_BLOG_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"DELETE_BLOG_SUCCESS",
            payload:error.response.data.message,
        })
        
    }
};

export const updateblogaction=(id,blogdata)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_BLOG_REQUEST"});
        const config={
            headers:{
                "content-type":"multipart/form-data"
            }
        };
        const {data}=await axios.put(`/api/blog/update/${id}`,blogdata,config);

        dispatch({
            type:"UPDATE_BLOG_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"UPDATE_BLOG_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const allblogadminaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"ADMIN_BLOG_REQUEST"});
        const {data}=await axios.get(`/api/blog/admin/all`);

        dispatch({
            type:"ADMIN_BLOG_SUCCESS",
            payload:data,
        });

    } catch (error) {
        dispatch({
            type:"ADMIN_BLOG_FAIL",
            payload:error.response.data.message,
        })
        
    }
}