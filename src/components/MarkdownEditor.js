import React from 'react'
import Vditor from 'vditor'
//import "vditor/src/assets/scss/index.scss"
import "vditor/src/assets/scss/index.scss"
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import axios from 'axios';


const e = React.createElement
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default class MarkdownEditor extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            vditor:Vditor,
            open:false,
            severity:"",
            msg:"",
            content:this.props.content,

        }
    }
    // intialValue(){
    //     this.state.vditor.setValue('Hello')
    // }
    componentDidMount () {
        this.props.triggerRef(this)
        let content=this.props.content
        console.log(content)

        const vditor = new Vditor('vditor', {
            height: 360,
            toolbarConfig: {
                pin: true,
            },
            cache: {
                enable: false,
            },
            after () {
                vditor.setValue(content)
            },
        })
        this.state.vditor = vditor
        // this.intialValue()


    }
    PostMD(id,title,description){
        let editorValue=this.state.vditor.getValue();
        console.log(title,description)
        const userJwt = JSON.parse(localStorage.getItem("jwt"));
        console.log(JSON.parse(localStorage.getItem("jwt")).jwt)
        axios.post('blog/edit'
            ,{


                // body:{
                    "id":id,
                    "title":title,
                    "description":description,
                    "content": editorValue
                // }


            },{
                headers:{
                    // 'content-type':'application/json',
                    // "Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjE1NzM3NjA0LCJleHAiOjE2MTYzNDI0MDR9.fb5mDUS76XKCG4PgNhySWo6XLMO0PDSbnty-5MBFcEr8iZC01y8DX9MHNu9MlSQAQUY4oxNSjbpiN1pADR8n4w"
                    "Authorization":(userJwt==null)?''
                        :userJwt.jwt
                }
            }
            )
            // .then(res =>res.json())
            .then((body) => {
            //     body=body.data
            //     console.log(body)
            //     this.setState({
            //         open:true,
            //         msg:body.msg,
            //         data:body.data
            //     })
            //     if (body.code===200){
            //         this.setState({
            //             severity:"success"
            //         })
            //     }
            //     else {
            //         this.setState({
            //             severity:"error",
            //         })
            //     }
            })
        console.log(editorValue)
        // setTimeout(()=>this.props.history.push('/'),1000);

    }
    // PostMarkdown(){
    //     const a=vditor.getValue()
    // }

    handleClose(event, reason){
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open:false})
    };
    render () {
        return(
            <div>
            <div id={'vditor'}>{null}</div>
            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={()=>this.handleClose()}>
                <Alert onClose={()=>this.handleClose()} severity={this.state.severity}>
                    {this.state.msg}
                    {this.state.data}
                </Alert>
            </Snackbar>
            </div>

        )

        // e(
        //     'div',
        //     {id: 'vditor'},
        //
        // )

    }
}