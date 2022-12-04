
import React,{Fragment,useState} from 'react';
import "./Contact.css"
import emailjs from "@emailjs/browser"

const Contact = () => {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [message,setMessage]=useState("")

    const sendemail=(e)=>{
        e.preventDefault();

        emailjs.sendForm("service_3p0rs64","template_k1zqokj",e.target,"bC_0Ca0TiojAmBIL7").then(res=>{
            console.log(res);
        }).catch(err=>console.log(err));
    }
  return (
    <Fragment>
        <div className="contactcontainer">
            <div className="contactformdiv">
                <form
                className='contactform'
                onSubmit={sendemail}
                >
                    <div className="formheading">Contact Form</div>
                    <div>
                        <input type="text"
                        required
                        placeholder='plz enter your name'
                        name='user_name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="email"
                        required
                        placeholder='plz enter your email address'
                        name='user_email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <textarea
                        required
                        placeholder='plz enter your email here'
                        rows={10}
                        cols={20}
                        name='message'
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <input type="submit"
                        value="Submit Email"
                        />
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Contact